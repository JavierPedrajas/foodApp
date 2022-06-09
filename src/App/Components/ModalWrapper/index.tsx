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
import "./styles.scss";

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
    <IonContent className="modal-wrapper">
      <IonHeader className="ion-no-border">
        <IonToolbar className="toolbar">
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onHandleClose}>
              <FormattedMessage defaultMessage="Close" id="rbrahO" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {props.children}

      {/* <div className="modal-wrapper__button-container"> */}
      <IonFooter className="modal-wrapper__button-container">
        <IonButton
          disabled={isDisabled}
          fill="solid"
          color="primary"
          onClick={onHandleAdd}
          className="modal-wrapper__button-container__button"
        >
          {buttonText}
        </IonButton>
        {deleteButton}
      </IonFooter>
      {/* </div> */}
    </IonContent>
  );
};

export default ModalWrapper;
