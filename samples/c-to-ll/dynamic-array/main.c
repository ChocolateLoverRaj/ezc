#include <stdlib.h>

typedef struct
{
  size_t size;
  int *array;
} Array;

void initArray(Array *a)
{
  a->array = malloc(sizeof(int) * 0);
  a->size = 0;
}

void pushArray(Array *a, int element)
{
  a->size++;
  a->array = realloc(a->array, a->size * sizeof(int));
  a->array[a->size] = element;
}

void freeArray(Array *a)
{
  free(a->array);
  a->array = NULL;
}
