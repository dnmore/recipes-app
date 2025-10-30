import type { Route } from "./+types/recipe";
import { GiCarrot, GiChefToque } from "react-icons/gi";
import Loader from "~/components/loader/loader";

export function meta({ data }: Route.MetaArgs) {
  const meal = (data as { strMeal?: string } | undefined)?.strMeal ?? "Recipe";
  
  return [
    { title: `MyDish | ${meal}` },
    {
      name: "description",
      content: `Learn how to make ${meal} with step-by-step instructions and a complete ingredient list. Cook delicious homemade meals with ease!`,
    },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch meal.");
  }
  const data = await res.json();
  return data.meals[0] || null;
}

export function HydrateFallback() {
  return <Loader />;
}

const getIngredients = (meal: Record<string, string>) => {
  return Array.from({ length: 20 }, (_, i) => {
    const ingredient = meal[`strIngredient${i + 1}`];
    const measure = meal[`strMeasure${i + 1}`];
    return ingredient && ingredient.trim() ? `${measure} ${ingredient}` : null;
  }).filter(Boolean) as string[];
};

export default function Recipe({ loaderData }: Route.ComponentProps) {
  const meal = (loaderData ?? {}) as Record<string, string>;
  const ingredients = getIngredients(meal);

  return (
    <div className="mt-12">
      <div className="mt-4   grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div
          className="h-96 bg-cover bg-center relative p-6 lg:p-12 grid place-items-center"
          style={{ backgroundImage: `url(${meal.strMealThumb})` }}
          role="img"
          aria-label={`Image of ${meal.strMeal}`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          <div className="py-2 px-6 flex flex-col justify-center items-center text-center relative z-10">
            <h1 className="text-3xl font-bold font-serif tracking-tight text-white">
              {meal.strMeal}
            </h1>
            <div className="flex flex-wrap justify-center gap-1 mt-4 px-6 relative z-10">
              <span className="py-1 px-3 mr-2 text-xs uppercase rounded-sm bg-gray-200">
                {meal.strCategory}
              </span>
              <span className="py-1 px-3 text-xs  uppercase rounded-sm bg-gray-200">
                {meal.strArea}
              </span>
            </div>
          </div>
        </div>

        <section aria-labelledby="ingredients-heading" className="p-5">
          <div className="flex gap-2 items-center  mb-8">
            <GiCarrot className="text-4xl" />
            <div>
              <h2
                className="font-bold font-serif tracking-tight text-xl"
                id="ingredients-heading"
              >
                Ingredients
              </h2>
              <div className="h-1 w-20 bg-orange-500"></div>
            </div>
          </div>

          <div className="mt-4">
            <ul className="list-none grid grid-cols-1 gap-2 md:grid-cols-2 pl-4 text-sm">
              {ingredients.map((item, idx) => (
                <li key={idx}>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <section aria-labelledby="instructions-heading" className=" py-4">
        <div className="flex gap-2 items-center my-8 px-5">
          <GiChefToque className="text-4xl" />
          <div>
            <h3
              className="font-bold font-serif tracking-tight text-xl "
              id="instructions-heading"
            >
              How To Prepare {meal.strMeal}
            </h3>
            <div className="h-1 w-20 bg-orange-500"></div>
          </div>
        </div>
        <div className="px-8 lg:px-16">
          <p className="text-sm leading-8">{meal.strInstructions}</p>
          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline my-4 block"
            >
              Watch Video Tutorial
            </a>
          )}
        </div>

        <p className="text-4xl font-bold font-serif italic px-8 lg:px-16">
          Enjoy!
        </p>
      </section>
    </div>
  );
}
