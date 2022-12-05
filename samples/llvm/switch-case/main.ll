@caseA = private unnamed_addr constant [7 x i8] c"Case A\00"
@caseB = private unnamed_addr constant [9 x i8] c"Logged B\00"
@caseC = private unnamed_addr constant [9 x i8] c"Writed C\00"
@default = private unnamed_addr constant [16 x i8] c"No case matched\00"

declare i32 @puts(ptr)

define i1 @main() {
  EntryBlock:
    %condPtr = alloca i32
    ; Change the 0 to a 1 or 2 or something else and see what happens
    store i32 0, ptr %condPtr
    %cond = load i32, ptr %condPtr

    switch i32 %cond, label %Default [
      i32 0, label %CaseA
      i32 1, label %CaseB
      i32 2, label %CaseC
    ]

  CaseA:
    call i32 @puts(ptr getelementptr inbounds ([7 x i8], ptr @caseA))
    br label %After

  CaseB:
    call i32 @puts(ptr getelementptr inbounds ([9 x i8], ptr @caseB))
    br label %After

  CaseC:
    call i32 @puts(ptr getelementptr inbounds ([9 x i8], ptr @caseC))
    br label %After

  Default:
    call i32 @puts(ptr getelementptr inbounds ([16 x i8], ptr @default))
    br label %After

  After:
    ret i1 0
}
