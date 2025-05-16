import { useNavigate } from "react-router";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

export default function SearchIngredient() {
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState("");

  const handleIngredientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredient.trim()) {
      navigate(`/ingredients?ingredient=${ingredient.trim()}`);
    }
  };

  return (
    <div className="mx-auto max-w-2xl py-10 lg:max-w-7xl grid place-items-center">
      <div className="flex flex-col gap-4">
        <form onSubmit={handleIngredientSubmit} className="flex gap-2 lg:w-80">
          <label htmlFor="ingredient-search" className="sr-only">
            Search for recipes by ingredient
          </label>

          <input
            id="ingredient-search"
            type="text"
            name="ingredient"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="e.g. rice"
            className="block w-full pl-4 flex-1 rounded-sm bg-gray-100 border border-gray-400 py-1.5 text-gray-500 placeholder:text-gray-400 outline-none focus:ring-0 text-sm leading-6 p-2"
          />
          <button
            type="submit"
            aria-label="Search for recipes"
            className="bg-orange-500 px-4 py-2 rounded"
          >
            <IoSearchSharp className="text-white" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
