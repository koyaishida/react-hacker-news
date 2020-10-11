import React from "react";
import {
  getByAltText,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import PostList from "../src/templates/PostList";

describe("App", () => {
  test("renders App component", () => {
    render(<PostList />);
    // const menu = getByText(/bookmark/) as HTMLButtonElement
  });
});
