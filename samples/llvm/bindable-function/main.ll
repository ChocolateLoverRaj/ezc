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

define private void @createBindedFunction (ptr %bindedFunctionPtr, ptr %function, ptr %input) {
  EntryBlock:
    %functionPtr = getelementptr inbounds %BindedFunction, ptr %bindedFunctionPtr, i64 0, i32 0
    store ptr %function, ptr %functionPtr

    %inputPtr = getelementptr inbounds %BindedFunction, ptr %bindedFunctionPtr, i64 0, i32 1
    store ptr %input, ptr %inputPtr

    ret void
}

define private void @createBindableFunctionWithBindedFunction (ptr %bindableFunctionPtr, %BindedFunction %bindedFunction) {
  EntryBlock:
    %bindedFunctionPtr = getelementptr inbounds %BindableFunction, ptr %bindableFunctionPtr, i64 0, i32 0
    store %BindedFunction %bindedFunction, ptr %bindedFunctionPtr

    %nextInputIndexPtr = getelementptr inbounds %BindableFunction, ptr %bindableFunctionPtr, i64 0, i32 1
    store i64 0, ptr %nextInputIndexPtr

    ret void
}

define private void @createBindableFunction (ptr %bindableFunctionPtr, ptr %function, ptr %input) {
  EntryBlock:
    %bindedFunctionPtr = alloca %BindedFunction
    call void @createBindedFunction(ptr %bindedFunctionPtr, ptr %function, ptr %input)
    %bindedFunction = load %BindedFunction, ptr %bindedFunctionPtr

    call void @createBindableFunctionWithBindedFunction(ptr %bindableFunctionPtr, %BindedFunction %bindedFunction)

    ret void
}

define private void @bindInputs (ptr %bindableFunctionPtr, i64 %newInputsLength, ptr %newInputsSrcPtr) {
  EntryBlock:
    %inputPtrPtr = getelementptr inbounds %BindableFunction, ptr %bindableFunctionPtr, i64 0, i32 0, i32 1
    %inputPtr = load ptr, ptr %inputPtrPtr

    %nextInputIndexPtr = getelementptr inbounds %BindableFunction, ptr %bindableFunctionPtr, i64 0, i32 1
    %nextInputIndex = load i64, ptr %nextInputIndexPtr

    %newInputsDestPtr = getelementptr inbounds [0 x i8], ptr %inputPtr, i64 0, i64 %nextInputIndex
    call void @llvm.memcpy.i64(ptr %newInputsDestPtr, ptr %newInputsSrcPtr, i64 %newInputsLength)
    %newNextInputIndex = add i64 %nextInputIndex, %newInputsLength
    store i64 %newNextInputIndex, ptr %nextInputIndexPtr

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
    %bindableFunctionPtr = alloca %BindableFunction
    %input = alloca %AddInput
    call ptr @createBindableFunction(ptr %bindableFunctionPtr, ptr @add, ptr %input)
    
    ; Bind a
    %firstInputPtr = alloca i32
    store i32 77, ptr %firstInputPtr
    call void @bindInputs (ptr %bindableFunctionPtr, i64 4, ptr %firstInputPtr)
    
    ; Bind b
    %secondInputPtr = alloca i32
    store i32 33, ptr %secondInputPtr
    call void @bindInputs (ptr %bindableFunctionPtr, i64 4, ptr %secondInputPtr)

    ; Print the numbers we're adding
    %firstInput = load i32, ptr %firstInputPtr
    %secondInput = load i32, ptr %secondInputPtr
    call i32 @printf(ptr @addingNumbers, i32 %firstInput, i32 %secondInput)

    ; Call the function
    %bindedFunctionPtr = getelementptr inbounds %BindableFunction, ptr %bindableFunctionPtr, i64 0, i32 0
    call void @doMath (ptr %bindedFunctionPtr)

    ret i1 0
}