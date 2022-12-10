declare ptr @malloc(i64)
declare ptr @realloc(ptr, i64)

define ptr @f() {
  EntryBlock:
    %ptr = call ptr @malloc(i64 0)
    ret ptr %ptr
}

define i1 @main () {
  EntryBlock:
    %ptr = call ptr @f()
    call ptr @realloc(ptr %ptr, i64 10)
    ret i1 0
}