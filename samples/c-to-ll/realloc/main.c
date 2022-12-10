#include <stdlib.h>

int* f () {
  int* ptr = malloc(sizeof(int));
  if (ptr == NULL) return NULL;
  ptr = realloc(ptr, sizeof(int) * 2);
  return ptr;
}