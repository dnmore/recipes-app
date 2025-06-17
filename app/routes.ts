import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home/home.tsx"),
  route("categories", "routes/categories/categories.tsx"),
  route("categories/:category", "routes/recipesByCategory/recipesByCategory.tsx"),
  route("recipe/:id", "routes/recipe/recipe.tsx"),
  route("areas","routes/areas/areas.tsx" ),
  route("ingredients", "routes/ingredients/ingredients.tsx")
] satisfies RouteConfig;
