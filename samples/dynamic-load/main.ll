declare ptr @dlopen(ptr %filename, i32 %flags)
declare ptr @dlsym(ptr, ptr)
declare i32 @dlclose(ptr)
declare ptr @dlerror()

declare i32 @printf(ptr, ...)
declare i32 @puts(ptr)

@RTLD_LAZY = private unnamed_addr constant i32 1
@loadingMsg = private unnamed_addr constant [21 x i8] c"Loading library: %s\0A\00"
@errorLoadingLibraryMsg = private unnamed_addr constant [27 x i8] c"Error loading library: %s\0A\00"
@errorGettingFnMsg = private unnamed_addr constant [28 x i8] c"Error getting function: %s\0A\00"
@errorClosingLibraryMsg = private unnamed_addr constant [22 x i8] c"Error closing library\00"
@closedLibraryMsg = private unnamed_addr constant [28 x i8] c"Successfully closed library\00"
@fnName = private unnamed_addr constant [3 x i8] c"fn\00"

define i1 @main (i32 %argc, ptr %argv) {
  EntryBlock:
    %libraryNamePtr = getelementptr ptr, ptr %argv, i64 1
    %libraryName = load ptr, ptr %libraryNamePtr
    call i32 @printf(ptr @loadingMsg, ptr %libraryName)
    %lazy = load i32, ptr @RTLD_LAZY
    %loadedLibrary = call ptr @dlopen(ptr %libraryName, i32 %lazy)
    %loadLibrarySuccess = icmp ne ptr %loadedLibrary, null
    br i1 %loadLibrarySuccess, label %LoadLibrarySuccess, label %LoadLibraryError

  LoadLibraryError:
    %loadLibraryErrorStr = call ptr @dlerror()
    call i32 @printf(ptr @errorLoadingLibraryMsg, ptr %loadLibraryErrorStr)
    ret i1 1

  LoadLibrarySuccess:
    %fn = call ptr @dlsym(ptr %loadedLibrary, ptr @fnName)
    %getFnError = call ptr @dlerror()
    %getFnSuccess = icmp eq ptr %getFnError, null
    br i1 %getFnSuccess, label %GetFnSuccess, label %GetFnError

  GetFnError:
    call i32 @printf(ptr @errorGettingFnMsg, ptr %getFnError)
    br label %CloseLibrary

  GetFnSuccess:
    call void %fn()
    br label %CloseLibrary

  CloseLibrary:
    %closeLibraryResult = call i32 @dlclose(ptr %loadedLibrary)
    %closeLibrarySuccess = icmp eq i32 %closeLibraryResult, 0
    br i1 %closeLibrarySuccess, label %CloseLibrarySuccess, label %CloseLibraryError
  
  CloseLibraryError:
    call i32 @puts(ptr @errorClosingLibraryMsg)
    ret i1 1

  CloseLibrarySuccess:
    call i32 @puts(ptr @closedLibraryMsg)
    %exitCode = icmp ne i1 %getFnSuccess, 1
    ret i1 %exitCode
}
