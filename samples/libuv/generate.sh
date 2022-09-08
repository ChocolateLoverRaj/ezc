if [[ "$OSTYPE" == "msys"* ]]; then
  clang $1/main.c $LIBUV_LIB -o $1/main.exe -m64
else
  clang $1/main.c -luv -o $1/main.exe
fi
