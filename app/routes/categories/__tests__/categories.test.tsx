import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryRouter, RouterProvider } from "react-router";
import Categories, { HydrateFallback, loader } from "../categories";
import type { RouteObject } from "react-router";

beforeEach(() => {
  global.fetch = jest.fn(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            new Response(
              JSON.stringify({
                categories: [
                  {
                    idCategory: "1",
                    strCategory: "Beef",
                    strCategoryThumb: "https://www.themealdb.com/images/category/beef.png",
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

describe("Categories page", () => {
  test("renders heading and links", () => {
    const routes = [
      {
        path: "/categories",
        element: (
          <Categories
            loaderData={[
              {
                idCategory: "1",
                strCategory: "Beef",
                strCategoryThumb:
                  "https://www.themealdb.com/images/category/beef.png",
              },
              {
                idCategory: "2",
                strCategory: "Chicken",
                strCategoryThumb:
                  "https://www.themealdb.com/images/category/chicken.png",
              },
              {
                idCategory: "3",
                strCategory: "Dessert",
                strCategoryThumb:
                  "https://www.themealdb.com/images/category/dessert.png",
              },
            ]}
          />
        ),
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/categories"],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByText(/Categories/i)).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Beef/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Chicken/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Dessert/i })).toBeInTheDocument();
  });

  test("renders category links with correct routes", async () => {
    const routes = [
      {
        path: "/categories",
        element: (
          <Categories
            loaderData={[
              {
                idCategory: "1",
                strCategory: "Beef",
                strCategoryThumb:
                  "https://www.themealdb.com/images/category/beef.png",
              },
              {
                idCategory: "2",
                strCategory: "Chicken",
                strCategoryThumb:
                  "https://www.themealdb.com/images/category/chicken.png",
              },
              {
                idCategory: "3",
                strCategory: "Dessert",
                strCategoryThumb:
                  "https://www.themealdb.com/images/category/dessert.png",
              },
            ]}
          />
        ),
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/categories"],
    });
    render(<RouterProvider router={router} />);

    const link = screen.getByRole("link", { name: /Beef/i });
    expect(link).toHaveAttribute("href", "/categories/Beef");
  });

  test("displays loader while fetching categories (HydrateFallback)", async () => {
    const routes: RouteObject[] = [
      {
        path: "/categories",
        element: <Categories loaderData={[]} />,
        loader,
        HydrateFallback,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/categories"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByRole("status"));

    expect(await screen.findByText(/Categories/i)).toBeInTheDocument();
  });
});
