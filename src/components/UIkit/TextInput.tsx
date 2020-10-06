import React from "react";

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
      <p>{label}</p>
      <input
        type={type}
        required={required}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextInput;
