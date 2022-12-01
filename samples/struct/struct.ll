@.str = private unnamed_addr constant [4 x i8] c"%i\0A\00", align 1

%struct.S = type { i32, i32 }

declare i32 @printf(ptr, ...)

define i1 @main() {
EntryBlock:
  ; Create a new struct and assign 1234 to element 0
  %step0 = insertvalue %struct.S undef, i32 25, 0
  ; Take that struct and assign 25 to element 1
  %myS = insertvalue %struct.S %step0, i32 1234, 1
                
  ; Get a value from the struct
  %printThis = extractvalue %struct.S %myS, 0 ; <--- Change this number to 1 to change which element is extracted
  
  ; Log the number
  %0 = call i32 @printf(ptr @.str, i32 %printThis)
  ret i1 0
}
