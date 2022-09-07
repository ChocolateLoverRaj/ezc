. create-ll.sh
llc sample.ll -march=x86
gcc sample.s --shared -o sample.dll
g++ test.cpp sample.dll -o test.exe
./test.exe
