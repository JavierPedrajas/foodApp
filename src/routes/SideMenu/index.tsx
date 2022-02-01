import {
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import React from "react";
import "./styles.scss";
import { useLocation } from "react-router";
import MenuItem from "../../components/MenuItem";
import { MenuItemList } from "./menuItems";

const SideMenu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" className={"sideMenu"}>
      <IonContent className={"sideMenu__content"}>
        <IonList className={"sideMenu__list"}>
          {MenuItemList.map((item) => {
            return (
              <MenuItem
                title={item.title}
                link={item.link}
                currentPath={location.pathname}
                icon={item.icon}
              />
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
