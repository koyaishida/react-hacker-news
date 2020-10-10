import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: #04a4eb;
  padding: 24px 64px;
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  border-radius: 8%;
  border: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  outline: none;
  &:hover {
    cursor: pointer;
  }
`;

type Props = {
  label: string;
  onClick: () => void;
};

const PrimaryButton: React.FC<Props> = ({ label, onClick }) => {
  return <Button onClick={onClick}>{label}</Button>;
};

export default PrimaryButton;
