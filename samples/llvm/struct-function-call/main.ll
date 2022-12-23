@msg = private unnamed_addr constant [12 x i8] c"3 + 4 = %i\0A\00"

declare i32 @printf(ptr, ...)

; Takes 2 inputs
define private i32 @add (i32 %a, i32 %b) {
  %result = add i32 %a, %b
  ret i32 %result
}

; Struct that combines both inputs
%bothInputs = type { i32, i32 }

define i1 @main () {
  EntryBlock:
    ; Call the function with both inputs combined into one
    %result = call i32 @add(%bothInputs { i32 3, i32 4 })
    call i32 @printf(ptr @msg, i32 %result)
    ret i1 0
}