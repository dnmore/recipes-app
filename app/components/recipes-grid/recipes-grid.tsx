import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { RiArrowDownSLine } from "react-icons/ri";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type RecipesGridProps = {
  meals: Meal[];
  pageSize?: number;
};
export default function RecipesGrid({ meals, pageSize = 9 }: RecipesGridProps) {
  const [page, setPage] = useState(1);
  const [currentMeals, setCurrentMeals] = useState<Meal[]>([]);

  useEffect(() => {
    setCurrentMeals(meals.slice(0, page * pageSize));
  }, [page, meals, pageSize]);

  const loadMore = () => setPage((prev) => prev + 1);

  return (
    <div className="flex flex-col items-center">
      <div className="mt-8 p-8 grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2 lg:grid-cols-3 w-full">
        {currentMeals.map((meal) => (
          <div
            key={meal.idMeal}
            className="group relative overflow-hidden bg-white flex flex-col mx-auto w-full rounded-sm"
          >
            <div className="h-80 overflow-hidden ">
              <img
                src={meal.strMealThumb}
                alt={`Photo of ${meal.strMeal}`}
                className="h-full w-full object-cover group-hover:scale-105 transition-all duration-1000 ease-in-out"
              />
            </div>
            <div className="flex flex-col p-4">
              <NavLink
                to={`/recipe/${meal.idMeal}`}
                className="flex items-center text-lg uppercase font-semibold hover:text-orange-500"
              >
                {meal.strMeal}
              </NavLink>
            </div>
          </div>
        ))}
      </div>
      {currentMeals.length < meals.length && (
        <div className="text-center my-8 ">
          <button
            onClick={loadMore}
            className="px-6 py-2 flex items-center gap-2 bg-white border border-black font-bold text-lg hover:bg-black hover:text-white rounded-sm transition duration-300 ease-in-out"
          >
            More
            <RiArrowDownSLine className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
}
