import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

export function testRender(jsx, { store, ...otherOpts }) {
    return render(<Provider store={store}>{jsx}</Provider>, otherOpts);
}
