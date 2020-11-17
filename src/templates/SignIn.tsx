import React, { useState, useCallback } from "react";
import { TextInput, PrimaryButton } from "../components/UIkit";
import { signIn } from "../reducks/user/operation";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import styled from "styled-components";

const SignInContainer = styled.div`
  padding: 0 100px;
  text-align: center;
  margin: 0 auto;
`;

const SignIn = () => {
  const dispatch = useDispatch();

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
    <SignInContainer>
      <h2 className="u-text__headline u-text-center">ログイン画面</h2>

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
      <div className="center">
        <PrimaryButton
          label={"ログインする"}
          onClick={() => dispatch(signIn(email, password))}
        />
        <p onClick={() => dispatch(push("/signup"))}>
          アカウントをお持ちでない方はこちら
        </p>
      </div>
    </SignInContainer>
  );
};

export default SignIn;
