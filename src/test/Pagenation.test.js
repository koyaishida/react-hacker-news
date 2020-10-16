import React from "react";
import {
  getByAltText,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import { PageNation } from "../components/posts";

describe("PageNation rendering", () => {
  it("Should not render prev ,when currentPage 1 ", () => {
    render(<PageNation currentPage={1} />);
    expect(screen.queryByText("prev")).toBeNull();
    expect(screen.queryByText("more")).toBeInTheDocument();
  });

  it("Should not render more ,when currentPage 10 ", () => {
    render(<PageNation currentPage={10} />);
    expect(screen.queryByText("more")).toBeNull();
    expect(screen.queryByText("prev")).toBeInTheDocument();
  });
});
