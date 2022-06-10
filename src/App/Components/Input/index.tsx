import { IonImg } from "@ionic/react";
import React, { ChangeEvent } from "react";
import styled from "styled-components";

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
    login = false,
    marginBottom = 0,
    border = false,
    defaultValue,
  } = props;
  return (
    <InputContainer marginBottom={marginBottom}>
      <InputItem
        type={inputType}
        placeholder={placeholder}
        onChange={(event) => handleChange(event)}
        login={login}
        border={border}
        autoComplete={"off"}
        pattern={
          pattern && inputType === "password" ? "^[p{L}p{N}]{6,}$" : undefined
        }
        defaultValue={defaultValue}
      />
      {required && <InputAsterisk>*</InputAsterisk>}
      {icon && (
        <InputIconContainer>
          <IonImg src={icon} color="#F1F1F1" />
        </InputIconContainer>
      )}
    </InputContainer>
  );
};

export default Input;

const InputContainer = styled.div<{ marginBottom: number }>`
  position: relative;
  width: 100%;
  margin-bottom: ${({ marginBottom }) => marginBottom}rem;
`;

const InputItem = styled.input<{ login: boolean; border: boolean }>`
  color: var(--light);
  font-size: 1.2rem;
  background-color: var(--purple-light) !important;
  width: 100% !important;
  height: 3.5rem !important;
  border: none !important;
  border-radius: 15px;
  padding-left: 2em;
  &::placeholder {
    color: var(--light);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 10px var(--main);
  }

  ${({ login }) =>
    login &&
    `text-align: center;
  padding-left: 0;
  background-image: none;`})}

  ${({ border }) => border && `border: 1px solid #040707 !important;`})}
 
`;

const InputAsterisk = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #ea2324;
`;

const InputIconContainer = styled.div`
  width: 2.2rem;
  height: auto;
  z-index: 999;
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
`;
