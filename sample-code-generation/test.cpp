#include <iostream>

extern "C" {
    int sum(int, int);
}

int main() {
    std::cout << "sum of 3 and 4: " << sum(3, 4) << std::endl;
}
