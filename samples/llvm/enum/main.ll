%Dessert = type i3
@Dessert.COOKIE = private unnamed_addr constant %Dessert 0
@Dessert.DONUT = private unnamed_addr constant %Dessert 1
@Dessert.CAKE = private unnamed_addr constant %Dessert 2
@Dessert.BROWNIE = private unnamed_addr constant %Dessert 3
@Dessert.ICE_CREAM = private unnamed_addr constant %Dessert 4


define %Dessert @main() {
  EntryBlock:
    %donut = load %Dessert, ptr @Dessert.DONUT
    ret %Dessert %donut
} 