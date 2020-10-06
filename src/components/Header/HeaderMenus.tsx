import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../../reducks/user/operation";
import styled from "styled-components";

type Props = {
  username: string;
  email: string;
};

const Wrapper = styled.div`
  display: flex;
  margin: 0 0 0 auto;
  color: #fff;
  width: 360px;
  justify-content: space-around;
`;

const HeaderMenus: React.FC<Props> = ({ username, email }) => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <p>{username}</p>
      <p>{email}</p>
      <button onClick={() => dispatch(signOut())}>ログアウト</button>
    </Wrapper>
  );
};

export default HeaderMenus;
