declare ptr @malloc(i64)
declare ptr @realloc(ptr, i64)
declare i64 @getline(ptr, i64, ptr)
declare i32 @printf(ptr, ...)
declare ptr @fdopen(i32, ptr)
declare i32 @puts(ptr)
declare i32 @isspace(i32)
declare ptr @memcpy(ptr, ptr, i64)
declare void @free(ptr)

@arrayLengthStr = private unnamed_addr constant [19 x i8] c"Array Length: %lu\0A\00"
@r = private unnamed_addr constant [2 x i8] c"r\00"
@help = private unnamed_addr constant [86 x i8] c"Enter the items to put in the array, one in each line. Then enter blank line to exit.\00"
@contentsStr = private unnamed_addr constant [13 x i8] c"Contents: [\0A\00"
@itemStr = private unnamed_addr constant [9 x i8] c"  '%s',\0A\00"
@closingBracketStr = private unnamed_addr constant [3 x i8] c"]\0A\00"

%struct.DynamicArray = type {
  ; Number of elements
  i64,
  ; Actual elements
  ptr
}

; Creates an empty dynamic array
define i1 @createDynamicArray(ptr nofree %dynamicArray, i64 %elementSize, i64 %numberOfElements) {
  EntryBlock:
    ; dynamicArray->length = 0
    %numberOfElementsPtr = getelementptr inbounds %struct.DynamicArray, ptr %dynamicArray, i64 0, i32 0
    store i64 %numberOfElements, ptr %numberOfElementsPtr

    ; aynamicArray->array = malloc(sizeof(int) * 0)
    %mallocAmount = mul i64 %elementSize, %numberOfElements
    %elementsPtr = call ptr @malloc(i64 %mallocAmount)
    %error = icmp eq ptr %elementsPtr, null
    br i1 %error, label %MallocError, label %MallocSuccess

  MallocSuccess:
    %elementsPtrInStructPtr = getelementptr inbounds %struct.DynamicArray, ptr %dynamicArray, i64 0, i32 1
    store ptr %elementsPtr, ptr %elementsPtrInStructPtr

    ret i1 0

  MallocError:
    ret i1 1
}

define i1 @resizeDynamicArray(ptr nofree %dynamicArray, i64 %elementSize, i64 %numberOfElements){
  EntryBlock:
    %numberOfElementsPtr = getelementptr inbounds %struct.DynamicArray, ptr %dynamicArray, i64 0, i32 0
    store i64 %numberOfElements, ptr %numberOfElementsPtr

    %elementsBytes = mul i64 %elementSize, %numberOfElements
    %elementsPtrInStructPtr = getelementptr inbounds %struct.DynamicArray, ptr %dynamicArray, i64 0, i32 1
    %oldElementsPtr = load ptr, ptr %elementsPtrInStructPtr
    %newElementsPtr = call ptr @realloc(ptr %oldElementsPtr, i64 %elementsBytes)
    %error = icmp eq ptr %newElementsPtr, null
    br i1 %error, label %ReallocError, label %ReallocSuccess

  ReallocError:
    ret i1 1

  ReallocSuccess:
    store ptr %newElementsPtr, ptr %elementsPtrInStructPtr
    ret i1 0
}

define void @freeDynamicArray(ptr nofree %dynamicArray) {
  EntryBlock:
    %elementsPtrInStructPtr = getelementptr inbounds %struct.DynamicArray, ptr %dynamicArray, i64 0, i32 1
    %elementsPtr = load ptr, ptr %elementsPtrInStructPtr
    call void @free(ptr %elementsPtr)
    ret void
}

define private void @printArray(ptr nofree %dynamicArray) {
  EntryBlock:
    %lengthPtr = getelementptr inbounds %struct.DynamicArray, ptr %dynamicArray, i64 0, i32 0
    %elementsPtrPtr = getelementptr inbounds %struct.DynamicArray, ptr %dynamicArray, i64 0, i32 1
    %elementsPtr = load ptr, ptr %elementsPtrPtr
    %length = load i64, ptr %lengthPtr
    call i32 @printf(ptr @arrayLengthStr, i64 %length)
    call i32 @printf(ptr @contentsStr)
    br label %PrintElement
    
  PrintElement:
    %index = phi i64 [0, %EntryBlock], [%newIndex, %PrintElement]
    %elementPtr = getelementptr [0 x ptr], ptr %elementsPtr, i64 0, i64 %index
    %element = load ptr, ptr %elementPtr
    call i32 @printf(ptr @itemStr, ptr %element)

    %newIndex = add i64 %index, 1
    %repeat = icmp ult i64 %newIndex, %length
    br i1 %repeat, label %PrintElement, label %After

  After:
    call i32 @printf(ptr @closingBracketStr)
    ret void
}

define ptr @trimString(ptr nofree %string) {
  EntryBlock:
    br label %TrimLeftLoop
  
  TrimLeftLoop:
    %startIndex = phi i64 [0, %EntryBlock], [%newStartIndex, %TrimLeftLoop.NotNull]
    %charPtr = getelementptr inbounds [0 x i8], ptr %string, i64 0, i64 %startIndex
    %char = load i8, ptr %charPtr
    %isNull = icmp eq i8 %char, 0
    br i1 %isNull, label %StringIsJustWhitespace, label %TrimLeftLoop.NotNull

  StringIsJustWhitespace:
    ; Return an empty string
    %newEmptyString = call ptr @malloc(i64 1)
    ; Literaly the same as %newEmptyString but here so it's easier to understand
    %newCharPtr = getelementptr inbounds [1 x i8], ptr %newEmptyString, i64 0, i64 0
    store i8 0, ptr %newCharPtr
    ret ptr %newEmptyString
  
  TrimLeftLoop.NotNull:
    %charNumber = zext i8 %char to i32
    %isSpaceNumber = call i32 @isspace(i32 %charNumber)
    %isSpace = icmp ne i32 %isSpaceNumber, 0
    %newStartIndex = add i64 %startIndex, 1
    br i1 %isSpace, label %TrimLeftLoop, label %KeepPartLoop.Start

  KeepPartLoop.Start:
    %endIndexPtr = alloca i64
    store i64 %startIndex, ptr %endIndexPtr
    br label %KeepPartLoop

  KeepPartLoop:
    %checkIndex = phi i64 [%newStartIndex, %KeepPartLoop.Start], [%newCheckIndex, %KeepPartLoop.NextChar]
    %checkCharPtr = getelementptr inbounds [0 x i8], ptr %string, i64 0, i64 %checkIndex
    %checkChar = load i8, ptr %checkCharPtr
    %checkCharNumber = zext i8 %checkChar to i32
    %checkIsSpaceChar = call i32 @isspace(i32 %checkCharNumber)
    %checkIsSpace = icmp ne i32 %checkIsSpaceChar, 0
    br i1 %checkIsSpace, label %KeepPartLoop.NextChar, label %KeepPartLoop.CheckIfNull

  KeepPartLoop.CheckIfNull:
    %checkCharIsNull = icmp eq i8 %checkChar, 0
    br i1 %checkCharIsNull, label %CreateNewString, label %KeepPartLoop.UpdateEndIndex
    
  KeepPartLoop.UpdateEndIndex:
    store i64 %checkIndex, ptr %endIndexPtr
    br label %KeepPartLoop.NextChar

  KeepPartLoop.NextChar:
    %newCheckIndex = add i64 %checkIndex, 1
    br label %KeepPartLoop

  CreateNewString:
    %endIndex = load i64, ptr %endIndexPtr
    %difference = sub i64 %endIndex, %startIndex
    %length = add i64 %difference, 1
    %newString = call ptr @malloc(i64 %length)
    call ptr @memcpy(ptr %newString, ptr %charPtr, i64 %length)
    ret ptr %newString
}

define private void @freeArrayStrings(ptr nofree %dynamicArray) {
  EntryBlock:
    %lengthPtr = getelementptr inbounds %struct.DynamicArray, ptr %dynamicArray, i64 0, i32 0
    %elementsPtrPtr = getelementptr inbounds %struct.DynamicArray, ptr %dynamicArray, i64 0, i32 1
    %elementsPtr = load ptr, ptr %elementsPtrPtr
    %length = load i64, ptr %lengthPtr
    br label %Loop

  Loop:
    %index = phi i64 [0, %EntryBlock], [%newIndex, %Loop]
    %newIndex = add i64 %index, 1
    %elementPtr = getelementptr inbounds [0 x ptr], ptr %elementsPtr, i64 0, i64 %index
    %string = load ptr, ptr %elementPtr
    call void @free(ptr %string)
    %repeat = icmp ult i64 %index, %length
    br i1 %repeat, label %Loop, label %After

  After:
    ret void
}

define i1 @main() {
  EntryBlock:
    %dynamicArray = alloca %struct.DynamicArray
    %createError = call i1 @createDynamicArray(ptr %dynamicArray, i64 8, i64 0)
    br i1 %createError, label %CreateError, label %CreateSuccess

  CreateError:
    ret i1 1

  CreateSuccess:
    %lengthPtr = getelementptr inbounds %struct.DynamicArray, ptr %dynamicArray, i64 0, i32 0
    %elementsPtrPtr = getelementptr inbounds %struct.DynamicArray, ptr %dynamicArray, i64 0, i32 1
    %d = load i64, ptr %lengthPtr

    call i32 @puts(ptr @help)
    %stdin = call ptr @fdopen(i32 0, ptr getelementptr inbounds ([2 x i8], ptr @r))
    br label %GetString

  GetString:
    %sizePtr = alloca i64
    store i64 0, ptr %sizePtr
    %size = load i64, ptr %sizePtr
    %stringPtrPtr = alloca ptr
    %characters = call i64 @getline(ptr %stringPtrPtr, ptr %sizePtr, ptr %stdin)
    %stop = icmp eq i64 %characters, 1
    br i1 %stop, label %After, label %AddString

  AddString:
    %length = load i64, ptr %lengthPtr
    %newLength = add i64 %length, 1
    %resizeError = call i1 @resizeDynamicArray(ptr %dynamicArray, i64 8, i64 %newLength)
    br i1 %resizeError, label %ResizeError, label %ResizeSuccess

  ResizeError:
    ret i1 1

  ResizeSuccess:
    %elementsPtr = load ptr, ptr %elementsPtrPtr
    %elementPtr = getelementptr inbounds [0 x ptr], ptr %elementsPtr, i64 0, i64 %length
    %stringPtr = load ptr, ptr %stringPtrPtr
    %trimmedStringPtr = call ptr @trimString(ptr %stringPtr)
    call void @free(ptr %stringPtr)
    store ptr %trimmedStringPtr, ptr %elementPtr
    br label %GetString

  After:
    call void @printArray(ptr %dynamicArray)
    call void @freeArrayStrings(ptr %dynamicArray)
    call void @freeDynamicArray(ptr %dynamicArray)
    ret i1 0
}
