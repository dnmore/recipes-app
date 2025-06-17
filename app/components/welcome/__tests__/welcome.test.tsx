import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryRouter, RouterProvider } from "react-router";
import { Welcome } from "../welcome";


describe("Welcome component", () => {
  test("renders heading", () => {
    const routes = [
      {
        path: "/",
        element: <Welcome />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);
    expect(
      screen.getByRole("heading", {name:"Discover delicious recipes in few clicks."})
    ).toBeInTheDocument();
  });

  test("renders Get Started Link", () => {
    const routes = [
      {
        path: "/",
        element: <Welcome />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);
    expect(
      screen.getByRole("link", { name: "Browse recipe categories" })
    ).toBeInTheDocument();
  });
});
