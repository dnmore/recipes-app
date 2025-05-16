import { useNavigate } from "react-router";

export default function SearchArea() {
  const areaOptions = [
    {
      strArea: "American",
    },
    {
      strArea: "British",
    },
    {
      strArea: "Canadian",
    },
    {
      strArea: "Chinese",
    },
    {
      strArea: "Croatian",
    },
    {
      strArea: "Dutch",
    },
    {
      strArea: "Egyptian",
    },
    {
      strArea: "Filipino",
    },
    {
      strArea: "French",
    },
    {
      strArea: "Greek",
    },
    {
      strArea: "Indian",
    },
    {
      strArea: "Irish",
    },
    {
      strArea: "Italian",
    },
    {
      strArea: "Jamaican",
    },
    {
      strArea: "Japanese",
    },
    {
      strArea: "Kenyan",
    },
    {
      strArea: "Malaysian",
    },
    {
      strArea: "Mexican",
    },
    {
      strArea: "Moroccan",
    },
    {
      strArea: "Polish",
    },
    {
      strArea: "Portuguese",
    },
    {
      strArea: "Russian",
    },
    {
      strArea: "Spanish",
    },
    {
      strArea: "Thai",
    },
    {
      strArea: "Tunisian",
    },
    {
      strArea: "Turkish",
    },
    {
      strArea: "Unknown",
    },
    {
      strArea: "Vietnamese",
    },
  ];

  const navigate = useNavigate();
  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(`/areas?area=${e.target.value}`);
  };

  return (
    <div className="mx-auto max-w-2xl py-10 lg:max-w-7xl grid place-items-center">
      <label htmlFor="area-select" className="sr-only">
        Select an area
      </label>
      <select
        id="area-select"
        defaultValue=""
        onChange={handleAreaChange}
        className="mt-1 w-full max-w-80 h-10 pl-4 rounded-sm bg-gray-100 text-black border border-gray-400  py-1 text-base focus:outline-none focus:ring-2 focus:ring-orange-500
 cursor-pointer"
      >
        <option value="" disabled>
          -- Select a Cuisine Area --
        </option>
        {areaOptions.map((option, i) => {
          return (
            <option key={i} value={option.strArea}>
              {option.strArea}
            </option>
          );
        })}
      </select>
    </div>
  );
}
