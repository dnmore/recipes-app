import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryRouter, RouterProvider } from "react-router";
import Home from "../home";

describe("Home page", () => {
  test("renders heading", () => {
    const routes = [
      {
        path: "/",
        element: <Home />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);
    expect(
      screen.getByRole("heading", {
        name: "Discover delicious recipes in few clicks.",
      })
    ).toBeInTheDocument();
  });
});
