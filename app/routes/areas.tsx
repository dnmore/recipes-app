import type { Route } from "./+types/areas";
import { useSearchParams } from "react-router";
import SearchArea from "~/components/search-area/search-area";
import Loader from "~/components/loader/loader";
import RecipesGrid from "~/components/recipes-grid/recipes-grid";


export function meta({ location }: Route.MetaArgs) {
  const area = new URLSearchParams(location.search).get("area") ?? "Global";
  return [
    { title: `MyDish | ${area} Recipes` },
    {
      name: "description",
      content: `Discover authentic ${area} recipes and dishes from around the world. Browse flavorful regional cuisines and cook something new today.`,
    },
  ];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const area = url.searchParams.get("area");

  if (!area) return [];

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
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
export default function Areas({ loaderData }: Route.ComponentProps) {
  const meals = loaderData as Array<{
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  }>;
  const [searchParams] = useSearchParams();
  const area = searchParams.get("area");

  return (
    <div className="mt-12">
      <div className="h-96 lg:h-64 grid place-items-center text-center relative p-6 lg:py-12 lg:px-24 bg-areas bg-cover bg-no-repeat bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="text-white relative z-10">
          <h1 className="text-3xl font-serif font-bold uppercase">
            Search By Area
          </h1>
          <p className="mt-4 text-base px-4">
            Take a little trip around the globe without leaving your kitchen.
            Pick a region and dive into the rich flavors and traditions of its
            cuisine.
            <br /> From Italy to Japan, discover the tastes that make every
            culture unique.
          </p>
          <SearchArea />
        </div>
      </div>
      {area && (
        <h2
          className="text-6xl font-serif font-bold uppercase mt-6 text-center"
          aria-live="polite"
        >
          {area}
        </h2>
      )}

      {area && meals.length === 0 && (
        <p className="text-center my-4" role="status" aria-live="polite">
          No Recipes found
        </p>
      )}
      <RecipesGrid meals={meals} />
    </div>
  );
}
