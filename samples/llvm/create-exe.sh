if [[ "$OSTYPE" == "msys"* ]]; then
  clang $1/main.ll -o $1/main.exe -m64
else
  clang $1/main.ll -o $1/main.exe -m64 -lpthread
fi
