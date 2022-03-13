import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonItem, IonIcon, IonLabel, NavContext } from "@ionic/react";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { logoutUser } from "utils/services";
import "./styles.scss";

interface IMenuItem {
  title: string;
  link: string;
  currentPath: string;
  icon: IconDefinition;
  closeCallback?: () => void;
}

const MenuItem: React.FC<IMenuItem> = (props) => {
  const { title, link, icon, currentPath, closeCallback } = props;

  const { navigate } = useContext(NavContext);

  let menuColor = "light";

  if (currentPath.includes("tabs") && link.includes("tabs")) {
    menuColor = "primary";
  }

  if (currentPath === link) {
    menuColor = "primary";
  }

  if (link === "/logout") {
    return (
      <IonItem onClick={logoutUser} className="menuItem">
        <FontAwesomeIcon
          icon={icon}
          className={`menuItem__icon ${menuColor}`}
        />
        <IonLabel color={menuColor} className="menuItem__label">
          <FormattedMessage id={title} />
        </IonLabel>
      </IonItem>
    );
  }

  return (
    <IonItem
      onClick={() => {
        navigate(link);
        if (closeCallback) {
          closeCallback();
        }
      }}
      className="menuItem"
    >
      <FontAwesomeIcon icon={icon} className={`menuItem__icon ${menuColor}`} />
      <IonLabel color={menuColor} className="menuItem__label">
        <FormattedMessage id={title} />
      </IonLabel>
    </IonItem>
  );
};

export default MenuItem;
