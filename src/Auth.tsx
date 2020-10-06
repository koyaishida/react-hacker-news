import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIsSignedIn } from "./reducks/user/selector";
import { listenAuthState } from "./reducks/user/operation";
import { push } from "connected-react-router";
import { PrimaryButton } from "./components/UIkit";

type Props = {
  children: React.ReactNode;
};
type Auth = (children: Props) => any;

const Auth: Auth = ({ children }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  const goBackSignIn = useCallback(() => {
    dispatch(push("/signIn"));
  }, []);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, []);
  if (!isSignedIn) {
    return (
      <PrimaryButton label={"ログイン画面に戻る"} onClick={goBackSignIn} />
    );
  } else {
    return children;
  }
};

export default Auth;
