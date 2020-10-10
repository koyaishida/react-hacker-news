import React from "react";
import { render } from "@testing-library/react";
import PostList from "../src/templates/PostList";

test("renders learn react link", () => {
  const { getByText } = render(<PostList />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
