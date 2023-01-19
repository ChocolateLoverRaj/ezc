@0 = private unnamed_addr constant [13 x i8] c"Hello World!\00"
;
declare i32 @puts(ptr)

define i1 @main() {
  0:
    call i32 @puts(ptr @0)
    < i1 0
}
