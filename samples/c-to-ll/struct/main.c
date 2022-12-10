typedef struct
{
  int a;
  char b;
  long c;
  float d;
} S;

void f(S* s) {
  s->a = 3;
  s->b = 5;
  s->c = 123456789;
  s->d = 1.4;
}
