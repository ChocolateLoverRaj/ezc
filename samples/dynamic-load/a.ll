@msg = private unnamed_addr constant [19 x i8] c"This is library a!\00"

declare i32 @puts(ptr)

define void @fn() {
  EntryBlock:
    call i32 @puts(ptr @msg)
    ret void
}
