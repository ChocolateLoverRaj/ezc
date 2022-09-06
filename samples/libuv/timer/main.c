#include <stdio.h>
#include <stdlib.h>
#include <uv.h>

void timerCallback(uv_timer_t *handle) {
  puts("Timer callback!");
}

int main() {
  uv_loop_t *loop = malloc(sizeof(uv_loop_t));
  uv_loop_init(loop);

  uv_timer_t timer;
  uv_timer_init(loop, &timer);
  uv_timer_start(&timer, timerCallback, 1000, 0);

  puts("Calling uv_run. Callback will be called after 1s");
  uv_run(loop, UV_RUN_DEFAULT);

  uv_loop_close(loop);
  free(loop);
  return 0;
}
