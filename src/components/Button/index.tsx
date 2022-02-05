import React from "react";
import "./styles.scss";

interface IButtonProps {
  handleClick: () => void;
  type: "main" | "outlined" | "userProfile";
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = (props) => {
  const { handleClick, type, disabled } = props;

  return (
    <button
      className={`buttonCustom ${type}`}
      onClick={handleClick}
      disabled={disabled ?? false}
    >
      {props.children}
    </button>
  );
};

export default Button;
