clang a.ll --shared -o a.so
clang b.ll --shared -o b.so
clang c.ll --shared -o c.so
clang main.ll -o main.bin -ldl
./main.bin ./$1.so
