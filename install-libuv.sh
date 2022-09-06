TMP_DIR=`mktemp -d`
git clone https://github.com/libuv/libuv "$TMP_DIR"
cd "$TMP_DIR"
sh autogen.sh
./configure
make
