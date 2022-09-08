#include <stdio.h>
#include <stdlib.h>
#include <uv.h>

void timerCallback(uv_timer_t *handle)
{
  puts("Timer callback!");
}

int main(int argc, char **argv)
{
  int timeout;
  if (argc == 2)
  {
    timeout = atoi(argv[1]);
  }
  else
  {
    timeout = 1000;
  }

  uv_loop_t *loop = malloc(sizeof(uv_loop_t));
  uv_loop_init(loop);

  uv_timer_t timer;
  uv_timer_init(loop, &timer);
  uv_timer_start(&timer, timerCallback, timeout, 0);

  printf("Calling uv_run. Callback will be called after %dms\n", timeout);
  uv_run(loop, UV_RUN_DEFAULT);

  uv_loop_close(loop);
  free(loop);
  return 0;
}
