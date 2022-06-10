import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonItem, IonLabel, NavContext } from "@ionic/react";
import React, { useContext } from "react";
import { logoutUser } from "lib/services";
import styled from "styled-components";

interface IMenuItem {
  title: string;
  link: string;
  currentPath: string;
  icon: IconDefinition;
  closeCallback?: () => void;
}

type ColorTypes = "primary" | "light";

const MenuItem: React.FC<IMenuItem> = (props) => {
  const { title, link, icon, currentPath, closeCallback } = props;

  const { navigate } = useContext(NavContext);

  let menuColor: ColorTypes = "light";

  if (currentPath.includes("tabs") && link.includes("tabs")) {
    menuColor = "primary";
  }

  if (currentPath === link) {
    menuColor = "primary";
  }

  if (link === "/logout") {
    return (
      <MenuItemWrapper onClick={logoutUser}>
        <MenuItemIcon icon={icon} color={menuColor} />
        <MenuItemLabel color={menuColor}>{title}</MenuItemLabel>
      </MenuItemWrapper>
    );
  }

  return (
    <MenuItemWrapper
      onClick={() => {
        navigate(link);
        if (closeCallback) {
          closeCallback();
        }
      }}
    >
      <MenuItemIcon icon={icon} color={menuColor} />
      <MenuItemLabel color={menuColor}>{title}</MenuItemLabel>
    </MenuItemWrapper>
  );
};

export default MenuItem;

const MenuItemWrapper = styled(IonItem)`
  font-size: 2.5rem;
`;

const MenuItemLabel = styled(IonLabel)`
  margin-left: 1rem;
`;

const MenuItemIcon = styled(FontAwesomeIcon)<{ color: ColorTypes }>`
  color: ${({ color }) => {
    switch (color) {
      case "light":
        return "var(--light)";
      case "primary":
        return "var(--ion-color-primary)";
    }
  }}};
`;
