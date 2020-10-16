import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import PostList from "../templates/PostList";
import createStore from "../reducks/store/store";
import * as History from "history";

describe("PostList rendering", () => {
  let store;
  beforeEach(() => {
    const history = History.createBrowserHistory();
    store = createStore(history);
  });

  it("render postList", () => {
    render(
      <Provider store={store}>
        <PostList />
      </Provider>
    );
    expect(screen.getByText("TOP")).toBeInTheDocument();
    expect(screen.getByText("NEW")).toBeInTheDocument();
    expect(screen.getByText("BEST")).toBeInTheDocument();
    expect(screen.getByText("JOB")).toBeInTheDocument();
    expect(screen.getByText("BOOKMARK")).toBeInTheDocument();
  });

  //   it("Should not render more ,when currentPage 10 ", () => {
  //     render(<PageNation currentPage={10} />);
  //     expect(screen.queryByText("more")).toBeNull();
  //     expect(screen.queryByText("prev")).toBeInTheDocument();
  //   });
});
