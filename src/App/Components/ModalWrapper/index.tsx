import { FormattedMessage } from "react-intl";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { StyledToolbar } from "app/components/SharedStyledComponents";

interface IModalWrapper {
  title: string;
  buttonText: string;
  onHandleClose: () => void;
  onHandleAdd: () => void;
  isDisabled: boolean;
  deleteButton?: ReactElement;
}

const ModalWrapper: React.FC<IModalWrapper> = (props) => {
  const {
    title,
    buttonText,
    onHandleClose,
    onHandleAdd,
    isDisabled,
    deleteButton,
  } = props;

  return (
    <IonContent>
      <IonHeader className="ion-no-border">
        <StyledToolbar>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onHandleClose}>
              <FormattedMessage defaultMessage="Close" id="rbrahO" />
            </IonButton>
          </IonButtons>
        </StyledToolbar>
      </IonHeader>
      {props.children}

      <ButtonContainer>
        <Button
          disabled={isDisabled}
          fill="solid"
          color="primary"
          onClick={onHandleAdd}
        >
          {buttonText}
        </Button>
        {deleteButton}
      </ButtonContainer>
    </IonContent>
  );
};

export default ModalWrapper;

const ButtonContainer = styled(IonFooter)`
  width: 100%;
  display: flex;
  flex-direction: column;

  position: absolute;
  bottom: 0;
  padding: 1em 1.25em;
`;

const Button = styled(IonButton)`
  width: 100%;
`;
