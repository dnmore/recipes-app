import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryRouter, RouterProvider } from "react-router";
import RecipesByCategory, {
  HydrateFallback,
  clientLoader,
} from "../recipesByCategory";
import type { RouteObject } from "react-router";

beforeEach(() => {
  global.fetch = jest.fn(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            new Response(
              JSON.stringify({
                meals: [
                  {
                    strMeal: "Beef and Mustard Pie",
                    strMealThumb:
                      "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
                    idMeal: "52874",
                  },
                ],
              }),
              {
                status: 200,
                headers: { "Content-Type": "application/json" },
              }
            )
          );
        }, 100);
      })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("Recipes by category page", () => {
  test("renders image and link elements", () => {
    const routes = [
      {
        path: "/categories/Beef",
        element: (
          <RecipesByCategory
            params={{ ["category"]: "Beef" }}
            loaderData={[
              {
                strMeal: "Beef and Mustard Pie",
                strMealThumb:
                  "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
                idMeal: "52874",
              },
              {
                strMeal: "Beef and Oyster pie",
                strMealThumb:
                  "https://www.themealdb.com/images/media/meals/wrssvt1511556563.jpg",
                idMeal: "52878",
              },
              {
                strMeal: "Beef Asado",
                strMealThumb:
                  "https://www.themealdb.com/images/media/meals/pkopc31683207947.jpg",
                idMeal: "53071",
              },
            ]}
            matches={[
              {
                params: {},
                id: "root",
                pathname: "/categories/Beef",
                data: undefined,
                handle: undefined,
              },
              {
                params: { category: "Beef" },
                id: "routes/recipesByCategory",
                pathname: "/categories/Beef",
                data: undefined,
                handle: undefined,
              },
            ]}
          />
        ),
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/categories/Beef"],
    });
    render(<RouterProvider router={router} />);
    expect(
      screen.getByRole("img", { name: /Photo of Beef and Mustard Pie/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /Photo of Beef and Oyster pie/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /Photo of Beef Asado/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Beef and Mustard Pie/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Beef and Oyster pie/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Beef Asado/i })
    ).toBeInTheDocument();
  });
});
