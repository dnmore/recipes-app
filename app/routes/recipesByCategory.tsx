import { useParams } from "react-router";
import type { Route } from "./+types/recipesByCategory";
import Loader from "~/components/loader/loader";
import RecipesGrid from "~/components/recipes-grid/recipes-grid";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.category}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch meals.");
  }
  const data = await res.json();
  return data.meals || [];
}

export function HydrateFallback() {
  return <Loader />;
}

export default function RecipesByCategory({
  loaderData,
}: Route.ComponentProps) {
  const meals = loaderData as Array<{
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  }>;
  const category = useParams().category;

  return (
    <div className="mt-12">
      <div className="h-64 grid place-items-center text-center relative p-12 bg-categories bg-cover bg-no-repeat bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <header role="banner" className="text-white relative z-10">
          <h2 className="text-6xl font-serif font-bold uppercase">
            {category}
          </h2>
        </header>
      </div>
      <RecipesGrid meals={meals} />
    </div>
  );
}
