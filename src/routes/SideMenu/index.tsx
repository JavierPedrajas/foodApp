import {
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useLocation } from "react-router";
import MenuItem from "../../app/components/MenuItem";
import { getMenuItemList } from "./menuItems";
import { useIntl } from "react-intl";

const SideMenu: React.FC = () => {
  const location = useLocation();

  const [sideMenu, setSideMenu] = useState<HTMLIonMenuElement>();

  useEffect(() => {
    const menu = document.getElementById("side-menu") as HTMLIonMenuElement;
    setSideMenu(menu);
  }, []);

  const intl = useIntl();

  return (
    <IonMenu contentId="main" className={"sideMenu"} id="side-menu">
      <IonContent className={"sideMenu__content"}>
        <IonList className={"sideMenu__list"}>
          {getMenuItemList(intl).map((item) => {
            return (
              <MenuItem
                title={item.title}
                link={item.link}
                currentPath={location.pathname}
                icon={item.icon}
                key={item.link}
                closeCallback={
                  sideMenu ? () => sideMenu.close(true) : undefined
                }
              />
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
