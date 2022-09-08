// From https://docs.libuv.org/en/v1.x/guide/basics.html#hello-world
#include <stdio.h>
#include <stdlib.h>
#include <uv.h>

uv_loop_t *loop;
uv_fs_t openReq;
static char dataBuf[64];
static uv_buf_t buf;

void writeCallback(uv_fs_t *req) {
  puts("Writed to stdout");
}

void readCallback(uv_fs_t *req) {
  uv_fs_req_cleanup(req);
  if (req->result < 0) {
    fprintf(stderr, "error reading file: %s\n", uv_strerror(req->result));
    return;
  }
  printf("Readed file: %zu\n", req->result);
  uv_fs_t writeReq;
  uv_fs_write(loop, &writeReq, 0,(const uv_buf_t*) &buf, 1, -1, writeCallback);
}

void openCallback(uv_fs_t *req)
{
  if (req->result < 0) {
    fprintf(stderr, "error opening file: %s\n", uv_strerror(req->result));
    return;
  }
  puts("Opened file");

  uv_fs_t readReq;
  buf = uv_buf_init(dataBuf, sizeof(dataBuf));

  uv_fs_read(loop, &readReq, req->result, &buf, 1, -1, readCallback);
}

int main()
{
  loop = malloc(sizeof(uv_loop_t));
  uv_loop_init(loop);

  uv_fs_open(loop, &openReq, "fs/file.txt", O_RDONLY, 0, openCallback);
  uv_run(loop, UV_RUN_DEFAULT);

  uv_loop_close(loop);
  free(loop);
  return 0;
}
