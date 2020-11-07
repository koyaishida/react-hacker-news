import React, { useState, useCallback } from "react";
import { TextInput, PrimaryButton } from "../components/UIkit";
import { signUp } from "../reducks/user/operation";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import styled from "styled-components";

const SignUpContainer = styled.div`
  padding: 0 100px;
  text-align: center;
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState("");

  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );

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

  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword]
  );

  return (
    <SignUpContainer>
      <h2 className="u-text__headline u-text-center">アカウント作成画面</h2>
      <TextInput
        label={"ユーザー名"}
        required={true}
        value={username}
        type={"text"}
        onChange={inputUsername}
      />
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
      <TextInput
        label={"パスワード（再確認）"}
        required={true}
        value={confirmPassword}
        type={"password"}
        onChange={inputConfirmPassword}
      />
      <PrimaryButton
        label={"アカウントを登録する"}
        onClick={() =>
          dispatch(signUp(username, email, password, confirmPassword))
        }
      />

      <p onClick={() => dispatch(push("/signin"))}>
        アカウントをお持ちの方はこちら
      </p>
    </SignUpContainer>
  );
};

export default SignUp;
