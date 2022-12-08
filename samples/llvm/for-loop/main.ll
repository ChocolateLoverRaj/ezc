@startStr = private unnamed_addr constant [6 x i8] c"Start\00"
@countStr = private unnamed_addr constant [11 x i8] c"Count: %i\0A\00"
@doneStr = private unnamed_addr constant [5 x i8] c"Done\00"

declare i32 @printf(ptr, ...)
declare i32 @puts(ptr)

define i1 @main() {
  EntryBlock:
    call i32 @puts(ptr getelementptr ([0 x i8], ptr @startStr))
    br label %For.Initialize

  For.Initialize:
    %iPtr = alloca i32
    ; Like doing int i = 0
    store i32 0, ptr %iPtr 
    br label %For.UpdateVars

  For.UpdateVars:
    %i = load i32, ptr %iPtr
    br label %For.CheckIfDoAgain

  For.Body:
    call i32 @printf(ptr getelementptr([0 x i8], ptr @countStr), i32 %i)
    br label %For.AfterEachOperation

  For.CheckIfDoAgain:
    ; Like doing i < 10
    %cond = icmp ult i32 %i, 10
    br i1 %cond, label %For.Body, label %After

  For.AfterEachOperation:
    ; Like doing i++
    %newI = add i32 %i, 1
    store i32 %newI, ptr %iPtr
    br label %For.UpdateVars

  After:
    call i32 @puts(ptr getelementptr ([0 x i8], ptr @doneStr))
    ret i1 0
}
