import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryRouter, RouterProvider } from "react-router";
import SearchArea from "../search-area";

describe("Search area component", () => {
  test("renders select elements", () => {
    const routes = [
      {
        path: "/areas",
        element: <SearchArea />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/areas"],
    });
    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole("combobox", { name: "Select an area" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "-- Select a Cuisine Area --" })
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Italian" })).toBeInTheDocument();
  });
});
