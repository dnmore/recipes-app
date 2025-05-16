import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("categories", "routes/categories.tsx"),
  route("categories/:category", "routes/recipesByCategory.tsx"),
  route("recipe/:id", "routes/recipe.tsx"),
  route("areas","routes/areas.tsx" ),
  route("ingredients", "routes/ingredients.tsx")
] satisfies RouteConfig;
