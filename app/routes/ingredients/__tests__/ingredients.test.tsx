import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryRouter, RouterProvider } from "react-router";
import Ingredients from "../ingredients";

describe("Ingredients page", () => {
  test("renders heading", () => {
    const routes = [
      {
        path: "/ingredients",
        element: (
          <Ingredients
            params={{ ["ingredient"]: "rice" }}
            loaderData={[
               {
      "strMeal": "Beef Banh Mi Bowls with Sriracha Mayo, Carrot & Pickled Cucumber",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/z0ageb1583189517.jpg",
      "idMeal": "52997"
    },
    {
      "strMeal": "Chicken Congee",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1529446352.jpg",
      "idMeal": "52956"
    },
    {
      "strMeal": "Egyptian Fatteh",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/rlwcc51598734603.jpg",
      "idMeal": "53031"
    },
            ]}
            matches={[
              {
                params: {},
                id: "root",
                pathname: "/ingredients",
                data: undefined,
                handle: undefined,
              },
              {
                params: {},
                id: "routes/ingredients",
                pathname: "/ingredients",
                data: undefined,
                handle: undefined,
              },
            ]}
          />
        ),
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/ingredients"],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByText(/Search By Main Ingredient/i)).toBeInTheDocument();
  });
});
