import { IonIcon, IonImg } from "@ionic/react";
import React, { ChangeEvent, ChangeEventHandler } from "react";
import "./styles.scss";

type InputType = "text" | "email" | "password";

interface IInputProps {
  inputType: InputType;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: string;
  pattern?: string;
  required?: boolean;
  login?: boolean;
  marginBottom?: number;
  border?: boolean;
  defaultValue?: string;
}

const Input: React.FC<IInputProps> = (props) => {
  const {
    inputType,
    placeholder,
    handleChange,
    icon,
    pattern,
    required,
    login,
    marginBottom,
    border,
    defaultValue,
  } = props;
  return (
    <div
      className={"input"}
      style={{ marginBottom: `${marginBottom ?? 0}rem` }}
    >
      <input
        type={inputType}
        placeholder={placeholder}
        onChange={(event) => handleChange(event)}
        className={`input__item ${login ? " login" : ""} ${
          border ? "border" : ""
        }`}
        autoComplete={"off"}
        pattern={
          pattern && inputType === "password" ? "^[p{L}p{N}]{6,}$" : undefined
        }
        defaultValue={defaultValue}
      />
      {required && <span className={"input__asterisk"}>*</span>}
      {icon && (
        <div className={"input__icon"}>
          <IonImg src={icon} color="#F1F1F1" />
        </div>
      )}
    </div>
  );
};

export default Input;
