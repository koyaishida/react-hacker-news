import { createSelector } from "reselect";
import { DefaultRootState } from "react-redux";
const loadingSelector = (state: DefaultRootState) => state.loading;

export const getLoadingState = createSelector(
  [loadingSelector],
  (state) => state.isLoading
);

export const getLoadingText = createSelector(
  [loadingSelector],
  (state) => state.text
);
