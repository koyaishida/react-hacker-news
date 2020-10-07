import React, { useState, useCallback } from "react";
import { TextInput, PrimaryButton } from "../components/UIkit";
import { signIn } from "../reducks/user/operation";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";

const SignIn = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">ログイン画面</h2>
      <div className="module-spacer--medium" />

      <TextInput
        label={"メールアドレス"}
        required={true}
        value={email}
        type={"email"}
        onChange={inputEmail}
      />
      <TextInput
        label={"パスワード"}
        required={true}
        value={password}
        type={"password"}
        onChange={inputPassword}
      />

      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={"SignIn"}
          onClick={() => dispatch(signIn(email, password))}
        />
        <div className="module-spacer--medium" />
        <p onClick={() => dispatch(push("/signUp"))}>
          アカウントをお持ちでない方はこちら
        </p>
        <div className="module-spacer--medium" />
        <p onClick={() => dispatch(push("/signIn/reset"))}>
          パスワードを忘れた方はこちら
        </p>
      </div>
    </div>
  );
};

export default SignIn;
