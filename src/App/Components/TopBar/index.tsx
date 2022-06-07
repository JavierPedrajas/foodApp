import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
} from "@ionic/react";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot } from "@fortawesome/free-solid-svg-icons";

import "./styles.scss";
import { FormattedMessage } from "react-intl";

interface ITopBar {
  title?: string;
  logo?: boolean;
}

const TopBar: React.FC<ITopBar> = (props) => {
  const { title, logo } = props;
  return (
    <IonHeader className="ion-no-border">
      <IonToolbar className="toolbar">
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        {logo ? (
          <div className="toolbar__logo">
            <FontAwesomeIcon icon={faCarrot} size="lg" />
            RandoMenu
          </div>
        ) : (
          <IonTitle>
            <FormattedMessage id={title} />
          </IonTitle>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default TopBar;
