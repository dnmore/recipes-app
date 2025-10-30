import type { Route } from "./+types/categories";


import { NavLink } from "react-router";
import Loader from "../../components/loader/loader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MyDish | Recipes By Category" },
    {
      name: "description",
      content:
        "Browse a variety of delicious recipes organized by category. Find your next favorite meal from appetizers to desserts on MyDish.",
    },
  ];
}

export const loader = async () => {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const data = await res.json();
  return data.categories;
};

export function HydrateFallback() {
  return <Loader />;
}

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
};

type CategoriesProps = {
  loaderData: Category[];
};

export default function Categories({ loaderData }: CategoriesProps) {
  const categories = loaderData as Array<{
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
  }>;

  return (
    <div className="mt-12">
      <div className="h-96 lg:h-64 grid place-items-center text-center relative p-6 lg:py-12 lg:px-24 bg-categories bg-cover bg-no-repeat bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="text-white relative z-10">
          <h1 className="text-3xl font-serif font-bold uppercase">
            Categories
          </h1>
          <p className="mt-4 text-base px-4">
            Explore the delicious world of food, one category at a time! Whether
            you're craving something sweet, savory, or a bit of both, we've got
            you covered.
            <br /> Click through and find your next favorite dish—it’s like
            opening a cookbook you never knew you had.
          </p>
        </div>
      </div>

      <div className="mt-8 p-8 grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2 lg:grid-cols-5 w-full">
        {categories.map((category) => (
          <div
            key={category.idCategory}
            className="group relative mx-auto flex flex-col justify-center items-center"
          >
            <div className="rounded-full overflow-hidden w-40 h-40 border border-gray-600 shadow-xl">
              <img
                src={category.strCategoryThumb}
                alt={`Category: ${category.strCategory}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 ">
              <NavLink
                to={`/categories/${category.strCategory}`}
                className="text-lg lg:text-sm flex flex-col items-center uppercase font-semibold hover:underline hover:underline-offset-8 hover:decoration-4 hover:decoration-orange-500 hover:text-orange-500"
              >
                {category.strCategory}
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
