import React from "react";
import styled from "styled-components";

const InputField = styled.input`
  display: block;
  width: 360px;
  height: 48px;
  border-bottom: 1px solid "#303e59";
  border-right: none;
  border-left: none;
  border-top: none;
  background-color: #ebf5ff;
  margin: 64px auto;
  */ &:focus {
    color: #003a6c;
    background-color: #ebf5ff;
  }
`;
type Props = {
  label: string;
  required: boolean;
  value: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput: React.FC<Props> = ({
  label,
  required,
  value,
  type,
  onChange,
}) => {
  return (
    <div>
      <InputField
        placeholder={label}
        type={type}
        required={required}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextInput;
