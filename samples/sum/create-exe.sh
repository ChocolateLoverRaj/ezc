if [[ "$OSTYPE" == "msys"* ]]; then
  SHARED_LIBRARY=.dll
else
  SHARED_LIBRARY=.so
fi

clang++ test.cpp sample$SHARED_LIBRARY -o test.exe -m64
