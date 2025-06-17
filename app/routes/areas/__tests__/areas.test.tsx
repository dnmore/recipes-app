import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryRouter, RouterProvider } from "react-router";
import Areas from "../areas";

describe("Areas page", () => {
  test("renders heading", () => {
    const routes = [
      {
        path: "/areas",
        element: (
          <Areas
            params={{ ["area"]: "Italian" }}
            loaderData={[
              {
                strMeal: "Budino Di Ricotta",
                strMealThumb:
                  "https://www.themealdb.com/images/media/meals/1549542877.jpg",
                idMeal: "52961",
              },
              {
                strMeal: "Lasagne",
                strMealThumb:
                  "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg",
                idMeal: "52844",
              },
              {
                strMeal: "Osso Buco alla Milanese",
                strMealThumb:
                  "https://www.themealdb.com/images/media/meals/wwuqvt1487345467.jpg",
                idMeal: "52810",
              },
            ]}
            matches={[
              {
                params: {},
                id: "root",
                pathname: "/areas",
                data: undefined,
                handle: undefined,
              },
              {
                params: {},
                id: "routes/areas",
                pathname: "/areas",
                data: undefined,
                handle: undefined,
              },
            ]}
          />
        ),
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/areas"],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByText(/Search By Area/i)).toBeInTheDocument();
  });
});
