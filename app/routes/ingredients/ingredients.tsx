import type { Route } from "../+types/ingredients";
import { useSearchParams } from "react-router";
import SearchIngredient from "~/components/search-ingredient/search-ingredient";
import Loader from "~/components/loader/loader";
import RecipesGrid from "~/components/recipes-grid/recipes-grid";


export function meta({ location }: Route.MetaArgs) {
  const ingredient = new URLSearchParams(location.search).get("ingredient") ?? "Ingredient";
  return [
    { title: `MyDish | Recipes with ${ingredient}` },
    {
      name: "description",
      content: `Find delicious recipes that use ${ingredient} as a main ingredient. Cook creative and tasty meals with ingredients you already have.`,
    },
  ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const ingredient = url.searchParams.get("ingredient");

  if (!ingredient) return [];

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
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
export default function Ingredients({ loaderData }: Route.ComponentProps) {
  const meals = loaderData as Array<{
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  }>;
  const [searchParams] = useSearchParams();
  const ingredient = searchParams.get("ingredient");

  return (
    <main className="mt-12">
      <div className="h-96 lg:h-64 grid place-items-center text-center relative p-6 lg:py-12 lg:px-24 bg-ingredients bg-cover bg-no-repeat bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="text-white relative z-10">
          <h1 className="text-3xl font-serif font-bold uppercase">
            Search By Main Ingredient
          </h1>
          <p className="mt-4 text-base px-4">
            Got something in the fridge and wondering what to make? <br /> Type
            in your main ingredient and let the recipes come to you. It's the
            perfect way to turn “what do I do with this?” into “wow, that was
            amazing!”
          </p>
          <SearchIngredient />
        </div>
      </div>

      {ingredient && (
        <h2 className="text-3xl font-serif font-bold uppercase mt-6 text-center">
          {ingredient}
        </h2>
      )}
      {ingredient && meals.length === 0 && (
        <p className="text-center my-4" role="status" aria-live="polite">No recipes found.</p>
      )}
      <RecipesGrid meals={meals} />
    </main>
  );
}
