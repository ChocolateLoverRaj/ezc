@str = private unnamed_addr constant [32 x i8] c"Variable from block before: %i\0A\00"

declare i32 @printf(ptr, ...)

define i1 @main() {
  EntryBlock:
    %ptrEntry = alloca i32
    store i32 3, ptr %ptrEntry
    %varEntry = load i32, ptr %ptrEntry

    ; Change this to %BlockA or another block to see what happened
    br label %BlockThatDoesThings

  BlockA:
    %ptrA = alloca i32
    store i32 102, ptr %ptrA
    %varA = load i32, ptr %ptrA

    br label %BlockThatDoesThings

  BlockB:
    %ptrB = alloca i32
    store i32 999, ptr %ptrB
    %varB = load i32, ptr %ptrB
    
    br label %BlockThatDoesThings

  BlockC:
    %ptrC = alloca i32
    store i32 9000, ptr %ptrC
    %varC = load i32, ptr %ptrC

    br label %BlockThatDoesThings

  BlockThatDoesThings:
    %blockVar = phi i32 [%varEntry, %EntryBlock], [%varA, %BlockA], [%varB, %BlockB], [%varC, %BlockC]
    call i32 @printf(ptr getelementptr inbounds ([0 x i8], ptr @str), i32 %blockVar)
    
    ret i1 0
}
