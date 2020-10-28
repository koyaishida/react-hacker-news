export const ActionTypes = {
  SHOW_LOADING: "SHOW_LOADING",
  HIDE_LOADING: "HIDE_LOADING",
} as const;

export const SHOW_LOADING = "SHOW_LOADING";
export const showLoadingAction = (text = "loading...") => {
  console.log("show");
  return {
    type: "SHOW_LOADING",
    payload: {
      isLoading: true,
      text: text,
    },
  };
};
type ShowLoading = ReturnType<typeof showLoadingAction>;
export const HIDE_LOADING = "HIDE_LOADING";
export const hideLoadingAction = () => {
  console.log("hide");
  return {
    type: "HIDE_LOADING",
    payload: {
      isLoading: false,
      text: "",
    },
  };
};
type HideLoadingAction = ReturnType<typeof hideLoadingAction>;

export type Actions = ShowLoading | HideLoadingAction;
