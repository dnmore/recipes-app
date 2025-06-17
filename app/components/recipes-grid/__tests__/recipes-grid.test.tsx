import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryRouter, RouterProvider } from "react-router";
import RecipesGrid from "../recipes-grid";

describe("Recipes Grid component", () => {
  test("renders recipes grid elements", () => {
    const routes = [
      {
        path: "/categories/Seafood",
        element: (
          <RecipesGrid
            meals={[
              {
                strMeal: "Baked salmon with fennel & tomatoes",
                strMealThumb:
                  "https://www.themealdb.com/images/media/meals/1548772327.jpg",
                idMeal: "52959",
              },
              {
                strMeal: "Cajun spiced fish tacos",
                strMealThumb:
                  "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg",
                idMeal: "52819",
              },
              {
                strMeal: "Escovitch Fish",
                strMealThumb:
                  "https://www.themealdb.com/images/media/meals/1520084413.jpg",
                idMeal: "52944",
              },
            ]}
          />
        ),
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/categories/Seafood"],
    });
    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole("link", { name: "Baked salmon with fennel & tomatoes" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Cajun spiced fish tacos" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Escovitch Fish" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: /Photo of Baked salmon with fennel & tomatoes/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /Photo of Cajun spiced fish tacos/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /Photo of Escovitch Fish/i })
    ).toBeInTheDocument();
  });

  test("handles empty recipe array", () => {
    const routes = [
      {
        path: "/categories/Seafood",
        element: <RecipesGrid meals={[]} />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/categories/Seafood"],
    });
    render(<RouterProvider router={router} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /More/i })
    ).not.toBeInTheDocument();
  });

  test("renders recipe links with correct routes", () => {
    const routes = [
      {
        path: "/categories/Seafood",
        element: (
          <RecipesGrid
            meals={[
              {
                strMeal: "Baked salmon with fennel & tomatoes",
                strMealThumb:
                  "https://www.themealdb.com/images/media/meals/1548772327.jpg",
                idMeal: "52959",
              },
              {
                strMeal: "Cajun spiced fish tacos",
                strMealThumb:
                  "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg",
                idMeal: "52819",
              },
              {
                strMeal: "Escovitch Fish",
                strMealThumb:
                  "https://www.themealdb.com/images/media/meals/1520084413.jpg",
                idMeal: "52944",
              },
            ]}
          />
        ),
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/categories/Seafood"],
    });
    render(<RouterProvider router={router} />);
    expect(
      screen.getByRole("link", { name: "Baked salmon with fennel & tomatoes" })
    ).toHaveAttribute("href", "/recipe/52959");
    expect(
      screen.getByRole("link", { name: "Cajun spiced fish tacos" })
    ).toHaveAttribute("href", "/recipe/52819");

    expect(
      screen.getByRole("link", { name: "Escovitch Fish" })
    ).toHaveAttribute("href", "/recipe/52944");
  });
});
