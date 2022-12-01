; Have to put string up here because we can't put it inside the main function / it doesn't make sense
@.str = private unnamed_addr constant [4 x i8] c"%i\0A\00", align 1

%struct.S = type { i32, i32 }

declare i32 @printf(ptr, ...)

define i1 @main() {
EntryBlock:
  ; Load data as a local memory
  %ptr = alloca %struct.S
  ; This is our struct, with the numbers 25 and 1234
  store %struct.S { i32 25, i32 1234 }, ptr %ptr
  ; Get a variable from the pointer
  %data = load %struct.S, ptr %ptr
  
  ; Get an element of the struct, which will be i32 cuz both elements are i32
  %printThis = extractvalue %struct.S %data, 0 ; <--- Change this number to 1 to change which element is extracted
  
  ; Log the number
  call i32 @printf(ptr @.str, i32 %printThis)

  ret i1 0
}
