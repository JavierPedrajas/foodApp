import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonItem, IonIcon, IonLabel } from "@ionic/react";
import React from "react";
import { logoutUser } from "utils/services";
import "./styles.scss";

interface IMenuItem {
  title: string;
  link: string;
  currentPath: string;
  icon: IconDefinition;
}

const MenuItem: React.FC<IMenuItem> = (props) => {
  const { title, link, icon, currentPath } = props;

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
        <FontAwesomeIcon icon={icon} className={`menuItem__icon ${menuColor}`} />
        <IonLabel color={menuColor} className="menuItem__label">
          {title}
        </IonLabel>
      </IonItem>
    );
  }

  return (
    <IonItem href={link} className="menuItem">
      <FontAwesomeIcon icon={icon} className={`menuItem__icon ${menuColor}`} />
      <IonLabel color={menuColor} className="menuItem__label">
        {title}
      </IonLabel>
    </IonItem>
  );
};

export default MenuItem;
