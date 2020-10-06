import React from "react";

type Props = {
  label: string;
  onClick: () => void;
};

const PrimaryButton: React.FC<Props> = ({ label, onClick }) => {
  return (
    <div>
      <button onClick={onClick}>{label}</button>
    </div>
  );
};

export default PrimaryButton;
