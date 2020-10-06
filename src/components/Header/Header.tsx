import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { signOut } from "../../reducks/user/operation";
import {
  getIsSignedIn,
  getUsername,
  getEmail,
} from "../../reducks/user/selector";
import HeaderMenus from "./HeaderMenus";

const Wrapper = styled.div`
  display: flex;
  flex-direction: flex-end;
  background-color: blue;
  height: 56px;
`;

const Login = styled.button`
  margin: 0 0 0 auto;
  color: #fff;
  background-color: blue;
`;

const Header = () => {
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);
  const username = getUsername(selector);
  const email = getEmail(selector);

  const dispatch = useDispatch();
  return (
    <Wrapper>
      {isSignedIn ? (
        <HeaderMenus username={username} email={email} />
      ) : (
        <Login onClick={() => dispatch(push("./signin"))}>ログインする</Login>
      )}
    </Wrapper>
  );
};

export default Header;
