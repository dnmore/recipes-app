import { GiMeal } from "react-icons/gi";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center  bg-gray-900 bg-opacity-10">
      <div className="animate-pulse flex flex-col items-center justify-center">
        <GiMeal className="text-6xl" />
        <p className="font-serif text-3xl">Loading..</p>
      </div>
    </div>
  );
}
