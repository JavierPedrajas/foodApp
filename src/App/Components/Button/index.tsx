import React from "react";
import styled from "styled-components";

interface IButtonProps {
  handleClick: () => void;
  type: "main" | "outlined" | "userProfile";
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = (props) => {
  const { handleClick, type, disabled = false } = props;

  switch (type) {
    case "main":
      return (
        <MainButton onClick={handleClick} disabled={disabled}>
          {props.children}
        </MainButton>
      );
    case "outlined":
      return (
        <OutlinedButton onClick={handleClick} disabled={disabled}>
          {props.children}
        </OutlinedButton>
      );
    case "userProfile":
      return (
        <UserProfileButton onClick={handleClick} disabled={disabled}>
          {props.children}
        </UserProfileButton>
      );
  }
};

export default Button;

const BaseButton = styled.button`
  font-size: 1.6rem;
  font-weight: 600;
  width: 100%;
  margin-bottom: 1.3rem;
  padding: 1rem 0;
  border-radius: 15px;
  // text-transform: uppercase;
  color: white;
`;

const MainButton = styled(BaseButton)`
  background-color: var(--main);
  &:disabled {
    background-color: var(--main);
    opacity: 90%;
    color: #04070780;
  }
`;

const OutlinedButton = styled(BaseButton)`
  background-color: transparent;
  border: 1px solid var(--light);
`;

const UserProfileButton = styled(BaseButton)`
  background-color: var(--purple-light);
  color: var(--light);
  font-size: 1rem;
  font-weight: 400;
`;
