import { IonItem, IonToolbar } from "@ionic/react";
import styled from "styled-components";

export const NoItemsList = styled.div`
  position: relative;
  font-size: 2rem;
  color: var(--light);
  width: 90%;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const NoItemsText = styled.div`
  padding-bottom: 1rem;
`;

export const LoginSignupContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-size: cover;
  background-position-x: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledListItem = styled(IonItem)`
  font-size: 1.8em;

  &::part(native) {
    border-bottom: 1px solid #ffffff50 !important;
  }
`;

export const StyledToolbar = styled(IonToolbar)`
  --background: var(--purple-dark);
  --color: var(--light);
  --border-color: transparent;
`;
