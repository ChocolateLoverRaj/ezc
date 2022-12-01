@0 = private unnamed_addr constant [13 x i8] c"Hello World!\00", align 1

%struct.S = type { i32, i64 }

declare i32 @puts(i8*)

define i1 @main(...) {
EntryBlock:
  %ptr = alloca i32                               ; yields ptr
  store i32 3, ptr %ptr                           ; yields void
  %0 = call i32 @puts(i8* getelementptr inbounds ([13 x i8], [13 x i8]* @0, i32 0, i32 0))
  ret i1 0
}
