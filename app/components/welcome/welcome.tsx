import { NavLink } from "react-router";
export function Welcome() {
  return (
    <div className="flex items-center justify-center p-8 z-10">
      <div className="flex-1 flex flex-col items-center gap-5 min-h-[450px] p-6 bg-hero bg-cover bg-no-repeat bg-center rounded-sm shadow-lg">
        <header className="flex flex-col items-center gap-2 p-6 text-center ">
          <h1 className="font-serif text-2xl md:text-4xl font-bold tracking-tight">
            Discover delicious recipes in few clicks.
          </h1>
        </header>
        <NavLink
          to="/categories"
          aria-label="Browse recipe categories"
          className="px-8 py-2 border rounded-sm border-black bg-transparent text-lg font-bold uppercase hover:bg-black hover:text-white"
        >
          Get Started
        </NavLink>
      </div>
    </div>
  );
}
