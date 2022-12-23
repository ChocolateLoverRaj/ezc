@msg = private unnamed_addr constant [4 x i8] c"%i\0A\00"

declare i32 @printf(ptr, ...)

%C = type {
  i32,
  i32,
  i32,
  [5 x i32]
}

%B = type {
  i32,
  i32,
  %C
}

%A = type {
  i32,
  %B
}

define i1 @main () {
  EntryBlock:
    %aPtr = alloca %A
    store %A {
      i32 undef,
      %B {
        i32 undef,
        i32 undef,
        %C {
          i32 undef,
          i32 undef,
          i32 undef,
          [5 x i32] [ i32 0, i32 10, i32 20, i32 30, i32 40 ]
        }
      }
    }, ptr %aPtr

    %numberPtr = 
      getelementptr inbounds
      %A,
      ptr %aPtr,
      ; Idk why this 0 is here but it's needed. This can be iAnything
      i64 0,
      ; This must be i32, because it's accessing a struct element
      i32 1,
      ; This must be i32, because it's accessing a struct element
      i32 2,
      ; This must be i32, because it's accessing a struct element
      i32 3,
      ; This can be iAnything
      i64 2

    %number = load i32, ptr %numberPtr
    call i32 @printf(ptr @msg, i32 %number)

    ret i1 0
}