@0 = private unnamed_addr constant [13 x i8] c"Hello World!\00"

declare i32 @puts(ptr)

define i1 @main() {
0:
  %1 = call i32 @puts(ptr getelementptr inbounds ([13 x i8], ptr @0, i32 0, i32 0))
  ret i1 0
}
