@msg = private unnamed_addr constant [13 x i8] c"Element: %i\0A\00"

declare i32 @printf(ptr, ...)

@array = private unnamed_addr constant [3 x i32] [i32 111, i32 222, i32 333]

define void @getElementInLocalMemory () {
  EntryBlock:
    %array = load [3 x i32], ptr @array
    %element = extractvalue [3 x i32] %array, 2
    call i32 @printf(ptr @msg, i32 %element)
    ret void
}

define void @getElementWithPtr () {
  EntryBlock:
    %elementPtr = getelementptr [3 x i32], ptr @array, i64 0, i64 2
    %element = load i32, ptr %elementPtr
    call i32 @printf(ptr @msg, i32 %element)
    ret void
}

define i1 @main () {
  EntryBlock:
    call void @getElementInLocalMemory()
    call void @getElementWithPtr()
    ret i1 0
}
