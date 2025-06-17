import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryRouter, RouterProvider } from "react-router";
import { Navbar } from "../navbar";
import { NavDesktop } from "../nav-desktop";
import { NavMobile } from "../nav-mobile";

describe("Navigation components", () => {
  test("renders Navbar component", () => {
    const routes = [
      {
        path: "/",
        element: <Navbar />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);
    expect(
      screen.getByRole("navigation", { name: "Main navigation" })
    ).toBeInTheDocument();
  });
  test("renders NavDesktop component links", () => {
    const routes = [
      {
        path: "/",
        element: <NavDesktop />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByRole("link", { name: "Homepage" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Categories" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Ingredient" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Area" })).toBeInTheDocument();
  });
  test("renders NavMobile component heading and hamburger button", () => {
    const routes = [
      {
        path: "/",
        element: <NavMobile />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByRole("link", { name: "Homepage" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Homepage" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "" })).toBeInTheDocument();
    
  });
});
