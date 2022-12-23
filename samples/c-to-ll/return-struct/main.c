struct Point {
    double x;
    double y;
    double z;
};

struct Point add_points(struct Point a, struct Point b) {
  struct Point p;
  p.x = a.x + b.x;
  p.y = a.y + b.y;
  p.z = a.z + b.z;
  return p;
}
