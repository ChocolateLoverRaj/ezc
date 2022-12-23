@msg = private unnamed_addr constant [22 x i8] c"Name: %s. Number: %i\0A\00"
@debug = private unnamed_addr constant [4 x i8] c"%i\0A\00"

declare void @llvm.memcpy.i64(ptr, ptr, i64, i1)
declare i32 @printf(ptr, ...)
declare i64 @time(ptr)
declare void @srand(i64)
declare i64 @rand()

%BindedFunction = type {
  ; Function
  ptr,
  ; Single Input, which is a ptr
  ptr
}

%BindableFunction = type {
  %BindedFunction,
  ; Next input section index in the ptr data
  i64
}

define private void @createBindableFunction (ptr %bindableFunctionPtr, ptr %function) {
  EntryBlock:
    %functionPtr = getelementptr inbounds %BindableFunction, ptr %bindableFunctionPtr, i64 0, i32 0, i32 0
    store ptr %function, ptr %functionPtr

    ; Input ptr can be set to null, but rn it is uninitialized

    %nextInputIndexPtr = getelementptr inbounds %BindableFunction, ptr %bindableFunctionPtr, i64 0, i32 1
    store i64 0, ptr %nextInputIndexPtr

    ret void
}

define private i64 @getNewInputPtrSize (ptr %bindableFunctionPtr, i64 %additionalSize) {
  EntryBlock:
    %nextInputIndexPtr = getelementptr inbounds %BindableFunction, ptr %bindableFunctionPtr, i64 0, i32 1
    %nextInputIndex = load i64, ptr %nextInputIndexPtr
    %newInputPtrSize = add i64 %nextInputIndex, %additionalSize
    ret i64 %newInputPtrSize
}

define private void @bindInputs (ptr %newBindableFunctionPtr, ptr %oldBindableFunctionPtr, ptr %aditionalInputsPtr, i64 %additionalInputsLength, ptr %newInputPtr) {
  EntryBlock:
    %oldFunctionPtr = getelementptr inbounds %BindableFunction, ptr %oldBindableFunctionPtr, i64 0, i32 0, i32 0
    %function = load ptr, ptr %oldFunctionPtr

    %oldInputPtrPtr = getelementptr inbounds %BindableFunction, ptr %oldBindableFunctionPtr, i64 0, i32 0, i32 1
    %oldInputPtr = load ptr, ptr %oldInputPtrPtr

    %oldNextInputIndexPtr = getelementptr inbounds %BindableFunction, ptr %oldBindableFunctionPtr, i64 0, i32 1
    %oldNextInputIndex = load i64, ptr %oldNextInputIndexPtr

    %oldInputPtrIsNotNull = icmp ne i64 %oldNextInputIndex, 0
    br i1 %oldInputPtrIsNotNull, label %OldInputPtrIsNotNull, label %Continue

  OldInputPtrIsNotNull:
    ; Copy current input
    call void @llvm.memcpy.i64(ptr %newInputPtr, ptr %oldInputPtr, i64 %oldNextInputIndex)
    br label %Continue

  Continue:
    ; Copy the additional inputs
    %additionalInputsDestPtr = getelementptr inbounds [0 x i8], ptr %newInputPtr, i64 0, i64 %oldNextInputIndex
    call void @llvm.memcpy.i64(ptr %additionalInputsDestPtr, ptr %aditionalInputsPtr, i64 %additionalInputsLength)

    %newNextInputIndex = add i64 %oldNextInputIndex, %additionalInputsLength

    
    %newFunctionPtr = getelementptr inbounds %BindableFunction, ptr %newBindableFunctionPtr, i64 0, i32 0, i32 0
    store ptr %function, ptr %newFunctionPtr

    %newInputPtrPtr = getelementptr inbounds %BindableFunction, ptr %newBindableFunctionPtr, i64 0, i32 0, i32 1
    store ptr %newInputPtr, ptr %newInputPtrPtr

    %newNextInputIndexPtr = getelementptr inbounds %BindableFunction, ptr %newBindableFunctionPtr, i64 0, i32 1
    store i64 %newNextInputIndex, ptr %newNextInputIndexPtr

    ret void
}

define private void @forEach (ptr %array, i64 %arrayLength, i64 %elementSize, ptr %callback) {
  EntryBlock:
    br label %Check
  
  Check:
    %i = phi i64 [0, %EntryBlock], [%newI, %Loop]
    %shouldDoLoop = icmp ult i64 %i, %arrayLength
    br i1 %shouldDoLoop, label %Loop, label %AfterLoop
  
  Loop:
    %arrayIndex = mul i64 %i, %elementSize    

    %elementPtr = getelementptr [0 x i8], ptr %array, i64 0, i64 %arrayIndex

    %newBindableFunctionPtr = alloca %BindableFunction
    %additionalInputsPtr = alloca ptr
    store ptr %elementPtr, ptr %additionalInputsPtr
    %newInputPtrSize = call i64 @getNewInputPtrSize(ptr %callback, i64 8)
    %newInputPtr = alloca i8, i64 %newInputPtrSize
    call void @bindInputs (ptr %newBindableFunctionPtr, ptr %callback, ptr %additionalInputsPtr, i64 8, ptr %newInputPtr)
    
    %functionPtr = getelementptr inbounds %BindableFunction, ptr %newBindableFunctionPtr, i64 0, i32 0, i32 0
    %function = load ptr, ptr %functionPtr
    call void %function(ptr %newInputPtr)

    %newI = add i64 %i, 1
    br label %Check
  
  AfterLoop:
    ret void
}

%InnerFunctionInput = type { 
  ; Name
  ptr,
  ; Ptr to i32
  ptr 
}
define void @innerFunction (ptr %inputPtr) {
  EntryBlock:
    %input = load %InnerFunctionInput, ptr %inputPtr
    %name = extractvalue %InnerFunctionInput %input, 0
    %numberPtr = extractvalue %InnerFunctionInput %input, 1
    %number = load i32, ptr %numberPtr
    call i32 @printf(ptr @msg, ptr %name, i32 %number)
    ret void
}

@jimmy = private unnamed_addr constant [6 x i8] c"Jimmy\00"
@kate = private unnamed_addr constant [5 x i8] c"Kate\00"
@jojo = private unnamed_addr constant [5 x i8] c"Jojo\00"
@names = private unnamed_addr constant [3 x ptr] [ptr @jimmy, ptr @kate, ptr @jojo]
define private ptr @getRandomName () {
  %now = call i64 @time(ptr null)
  call void @srand(i64 %now)
  %randomInt = call i64 @rand()
  %randomIndex = urem i64 %randomInt, 3
  %randomElementPtr = getelementptr inbounds [0 x ptr], ptr @names, i64 0, i64 %randomIndex
  %randomName = load ptr, ptr %randomElementPtr
  ret ptr %randomName
}

define i1 @main () {
  EntryBlock:
    %array = alloca [5 x i32]
    store [5 x i32] [i32 3, i32 42, i32 69, i32 12345, i32 10101], ptr %array

    %unBindedCallback = alloca %BindableFunction
    call void @createBindableFunction(ptr %unBindedCallback, ptr @innerFunction)

    %bindedCallback = alloca %BindableFunction
    %additionalInputsPtr = alloca ptr
    %name = call ptr @getRandomName()
    store ptr %name, ptr %additionalInputsPtr
    %newInputPtrSize = call i64 @getNewInputPtrSize(ptr %unBindedCallback, i64 8)
    %newInputPtr = alloca i8, i64 %newInputPtrSize
    call void @bindInputs(ptr %bindedCallback, ptr %unBindedCallback, ptr %additionalInputsPtr, i64 8, ptr %newInputPtr)

    call void @forEach (ptr %array, i64 5, i64 4, ptr %bindedCallback)

    ret i1 0
}
