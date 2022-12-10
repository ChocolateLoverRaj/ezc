#include <stdio.h>
#include <stdlib.h>

int *f()
{
  int a = 0;
  int b = 1;

  int *ptr = malloc(sizeof(int));
  if (ptr == NULL)
    exit(1);
  
  printf("%i\n", a);
  printf("%i\n", b);

  return ptr;
}
