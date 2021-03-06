import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { signOut } from "../../reducks/user/operation";
import { getIsSignedIn, getUsername } from "../../reducks/user/selector";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: flex-end;
  background-color: #303e59;
  align-items: center;
  height: 64px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 8px 64px;
`;

const Logo = styled.h4`
  color: #ffffff;
  &:hover {
    cursor: pointer;
  }
`;

const Login = styled.button`
  margin: 0 0 0 auto;
  color: #ffffff;
  background-color: #303e59;
  border: solid 1px #ffffff;
  border-radius: 16%;
  height: 56px;
  line-height: 56px;
  outline: none;
  &:hover {
    cursor: pointer;
  }
`;

const Header = () => {
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);
  const username = getUsername(selector);
  const dispatch = useDispatch();
  const path = selector.router.location.pathname;
  const goToHome = useCallback(() => dispatch(push("/")), [dispatch]);

  return (
    <HeaderContainer>
      <Logo onClick={goToHome}>HOME</Logo>
      {!(path === "/signup" || path === "/signin") &&
        (isSignedIn ? (
          <>
            <p>{username}</p>
            <Login onClick={() => dispatch(signOut())}>ログアウト</Login>
          </>
        ) : (
          <Login onClick={() => dispatch(push("/signin"))}>ログインする</Login>
        ))}
    </HeaderContainer>
  );
};

export default Header;
