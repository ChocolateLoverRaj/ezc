@then = private unnamed_addr constant [5 x i8] c"then\00"
@else = private unnamed_addr constant [5 x i8] c"else\00"

declare i32 @puts(ptr)

define i1 @main() {
  EntryBlock:
    %condPtr = alloca i1
    ; Chang the 1 to a 0 and see what happens
    store i1 1, ptr %condPtr
    %cond = load i1, ptr %condPtr

    br i1 %cond, label %IfEqual, label %IfUnequal
  IfEqual:
    call i32 @puts(ptr getelementptr inbounds ([5 x i8], ptr @then))
    br label %After
  IfUnequal:
    call i32 @puts(ptr getelementptr inbounds ([5 x i8], ptr @else))
    br label %After
  After:
    ret i1 0
}
