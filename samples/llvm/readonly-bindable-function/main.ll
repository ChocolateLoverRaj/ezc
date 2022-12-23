@addingNumbers = private unnamed_addr constant [11 x i8] c"%i + %i = \00"
@result = private unnamed_addr constant [4 x i8] c"%i\0A\00"

declare void @llvm.memcpy.i64(ptr, ptr, i64, i1)
declare i32 @printf(ptr, ...)

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

%AddInput = type { i32, i32 }
define private i32 @add (ptr %inputPtr) {
  EntryBlock:
    %input = load %AddInput, ptr %inputPtr
    %a = extractvalue %AddInput %input, 0
    %b = extractvalue %AddInput %input, 1
    %result = add i32 %a, %b
    ret i32 %result
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

; This could be addition, multiplication, anything, we're just calling the binded function
define private void @doMath (ptr %bindedFunctionPtr) {
  EntryBlock:
    %functionPtr = getelementptr inbounds %BindedFunction, ptr %bindedFunctionPtr, i64 0, i32 0
    %function = load ptr, ptr %functionPtr

    %inputPtr = getelementptr inbounds %BindedFunction, ptr %bindedFunctionPtr, i64 0, i32 1
    %input = load ptr, ptr %inputPtr
    %result = call i32 %function(ptr %input)

    call i32 @printf(ptr @result, i32 %result)

    ret void
}

define i1 @main () {
  EntryBlock:
    %bindableFunctionPtr0 = alloca %BindableFunction
    call ptr @createBindableFunction(ptr %bindableFunctionPtr0, ptr @add)

    ; Bind a
    %bindableFunctionPtr1 = alloca %BindableFunction
    %firstInputPtr = alloca i32
    store i32 777, ptr %firstInputPtr
    %newInputPtrSize0 = call i64 @getNewInputPtrSize(ptr %bindableFunctionPtr0, i64 4)
    %inputsPtr0 = alloca i8, i64 %newInputPtrSize0
    call void @bindInputs (ptr %bindableFunctionPtr1, ptr %bindableFunctionPtr0, ptr %firstInputPtr, i64 4, ptr %inputsPtr0)

    ; Bind b
    %bindableFunctionPtr2 = alloca %BindableFunction
    %secondInputPtr = alloca i32
    store i32 333, ptr %secondInputPtr
    %newInputPtrSize1 = call i64 @getNewInputPtrSize(ptr %bindableFunctionPtr1, i64 4)
    %inputsPtr1 = alloca i8, i64 %newInputPtrSize1
    call void @bindInputs (ptr %bindableFunctionPtr2, ptr %bindableFunctionPtr1, ptr %secondInputPtr, i64 4, ptr %inputsPtr1)
    
    ; Print the numbers we're adding
    %firstInput = load i32, ptr %firstInputPtr
    %secondInput = load i32, ptr %secondInputPtr
    call i32 @printf(ptr @addingNumbers, i32 %firstInput, i32 %secondInput)

    ; Call the function
    %bindedFunctionPtr = getelementptr inbounds %BindableFunction, ptr %bindableFunctionPtr2, i64 0, i32 0
    call void @doMath (ptr %bindedFunctionPtr)

    ret i1 0
}
