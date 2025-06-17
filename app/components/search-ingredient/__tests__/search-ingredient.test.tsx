import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryRouter, RouterProvider } from "react-router";
import SearchIngredient from "../search-ingredient";

describe("Search Ingredient component", () => {
  test("renders form elements", () => {
    const routes = [
      {
        path: "/ingredients",
        element: <SearchIngredient />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/ingredients"],
    });
    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole("textbox", { name: "Search for recipes by ingredient" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Search for recipes" })
    ).toBeInTheDocument();
  });
});
