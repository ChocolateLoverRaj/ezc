@counting = private unnamed_addr constant [27 x i8] c"Counting for 1 millisecond\00"
@number = private unnamed_addr constant [12 x i8] c"Number: %i\0A\00"

%struct.timespec = type { i64, i64 }

declare i32 @puts(ptr)
declare i32 @printf(ptr, ...)
declare i32 @sleep(i32)
declare i32 @pthread_create(ptr, ptr, ptr, ptr)
declare i32 @pthread_cancel(ptr)
declare i32 @nanosleep(ptr, ptr)

define void @count () {
  EntryBlock:
    br label %Loop
  
  Loop:
    %n = phi i32 [0, %EntryBlock], [%newN, %Loop]
    call i32 @printf(ptr @number, i32 %n)
    %newN = add i32 %n, 1
    br label %Loop
}

define i1 @main () {
  EntryBlock:
    call i32 @puts(ptr @counting)

    %threadId = alloca i64
    call i32 @pthread_create(ptr %threadId, ptr null, ptr @count, ptr null)

    %remPtr = alloca %struct.timespec
    %reqPtr = alloca %struct.timespec
    store <2 x i64> <i64 0, i64 1000000>, ptr %reqPtr
    store <2 x i64> <i64 0, i64 1000000>, ptr %remPtr
    call i32 @nanosleep(ptr %reqPtr, ptr %remPtr)

    call i32 @pthread_cancel(ptr %threadId)

    ret i1 0
}