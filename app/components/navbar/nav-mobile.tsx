import { NavLink } from "react-router";
import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { GiMeal } from "react-icons/gi";

export function NavMobile() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="lg:hidden p-4 fixed  z-50 w-full bg-white text-base">
      <div className="flex justify-center gap-1 items-center pb-3">
        <Hamburger
          toggled={isOpen}
          size={20}
          toggle={setOpen}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        />
        <NavLink
          to="/"
          aria-label="Homepage"
          className="flex gap-2 text-4xl font-bold tracking-tighter"
        >
          <h3 className="sr-only">Homepage</h3>
          <span>mydish</span>
          <GiMeal />
        </NavLink>
      </div>
      {isOpen && (
        <div className="p-5 pt-0 z-50 bg-white uppercase font-bold">
          <div className="flex flex-col justify-center items-center gap-4 ">
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `hover:text-orange-500 ${isActive ? "text-orange-500" : ""}`
              }
              aria-current="page"
            >
              Categories
            </NavLink>
            <NavLink
              to="/ingredients"
              className={({ isActive }) =>
                `hover:text-orange-500 ${isActive ? "text-orange-500" : ""}`
              }
              aria-current="page"
            >
              Ingredient
            </NavLink>
            <NavLink
              to="/areas"
              className={({ isActive }) =>
                `hover:text-orange-500 ${isActive ? "text-orange-500" : ""}`
              }
              aria-current="page"
            >
              Area
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
