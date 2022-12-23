// from https://www.geeksforgeeks.org/function-pointer-in-c/
#include <stdio.h>

int callCallback (void (*fun_ptr)(int))
{
	fun_ptr(10); // * removed

	return 0;
}
