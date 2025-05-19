import { NavLink } from "react-router";
import { GiMeal } from "react-icons/gi";
export function NavDesktop() {
  return (
    <div className="hidden fixed bg-white z-50 lg:px-16 w-full lg:flex-col lg:flex lg:items-center lg:justify-between gap-5 px-2 py-4 opacity-90">
      <NavLink
        to="/"
        aria-label="Homepage"
        className="flex gap-2 text-4xl font-bold tracking-tighter "
      >
        <h3 className="sr-only">Homepage</h3>
        <span>mydish</span>
        <GiMeal />
      </NavLink>

      <div className="flex items-center gap-10 text-base uppercase font-bold">
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `hover:text-orange-800 ${isActive ? "text-orange-800" : ""}`
          }
          aria-current="page"
        >
          Categories
        </NavLink>
        <NavLink
          to="/ingredients"
          className={({ isActive }) =>
            `hover:text-orange-800 ${isActive ? "text-orange-800" : ""}`
          }
          aria-current="page"
        >
          Ingredient
        </NavLink>
        <NavLink
          to="/areas"
          className={({ isActive }) =>
            `hover:text-orange-800 ${isActive ? "text-orange-800" : ""}`
          }
          aria-current="page"
        >
          Area
        </NavLink>
      </div>
    </div>
  );
}
