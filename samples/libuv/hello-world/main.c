// From https://docs.libuv.org/en/v1.x/guide/basics.html#hello-world
#include <stdio.h>
#include <stdlib.h>
#include <uv.h>

int main()
{
  uv_loop_t *loop = malloc(sizeof(uv_loop_t));
  uv_loop_init(loop);

  puts("Hello world! Loop will exit right away.");
  uv_run(loop, UV_RUN_DEFAULT);

  uv_loop_close(loop);
  free(loop);
  return 0;
}
