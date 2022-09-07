if [[ "$OSTYPE" == "msys"* ]]; then
  clang --shared sample.ll -o sample.dll -m64
else
  clang --shared sample.ll -o sample.so
fi
