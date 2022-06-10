import { IonMenu, IonContent, IonList } from "@ionic/react";
import React, { useRef } from "react";
import { useLocation } from "react-router";
import MenuItem from "../../app/components/MenuItem";
import { getMenuItemList } from "./menuItems";
import { useIntl } from "react-intl";
import styled from "styled-components";

const SideMenu: React.FC = () => {
  const location = useLocation();
  const intl = useIntl();

  const sideMenu = useRef(null);

  const closeMenu = () => {
    if (sideMenu?.current) {
      (sideMenu.current as HTMLIonMenuElement).close(true);
    }
  };

  return (
    <IonMenu contentId="main" ref={sideMenu}>
      <MenuContent>
        <MenuList>
          {getMenuItemList(intl).map((item) => {
            return (
              <MenuItem
                title={item.title}
                link={item.link}
                currentPath={location.pathname}
                icon={item.icon}
                key={item.link}
                closeCallback={closeMenu}
              />
            );
          })}
        </MenuList>
      </MenuContent>
    </IonMenu>
  );
};

export default SideMenu;

const MenuContent = styled(IonContent)`
  background-color: var(--purple-light);
`;

const MenuList = styled(IonList)`
  color: var(--light);
  padding: 1rem 1rem 1rem 0;
`;
