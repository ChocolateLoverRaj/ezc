@message = private unnamed_addr constant [46 x i8] c"Press esc (and then enter) to exit while loop\00"

declare i32 @puts(ptr)
declare i8 @getchar()

define i8 @main() {
  EntryBlock:
    br label %While

  While:
    call i32 @puts(ptr getelementptr inbounds ([0 x i8], ptr @message))

    %char = call i8 @getchar()
    
    ; 27 is the char for the esc key
    %cond = icmp eq i8 %char, 27
    br i1 %cond, label %After, label %While

  After:
    ret i8 0
}
