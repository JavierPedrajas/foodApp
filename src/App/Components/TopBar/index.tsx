import { IonHeader, IonButtons, IonMenuButton, IonTitle } from "@ionic/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot } from "@fortawesome/free-solid-svg-icons";
import { StyledToolbar } from "app/components/SharedStyledComponents";
import styled from "styled-components";

interface ITopBar {
  title?: string;
  logo?: boolean;
}

const TopBar: React.FC<ITopBar> = (props) => {
  const { title, logo } = props;
  return (
    <IonHeader className="ion-no-border">
      <StyledToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        {logo ? (
          <ToolbarLogo>
            <FontAwesomeIcon icon={faCarrot} size="lg" />
            RandoMenu
          </ToolbarLogo>
        ) : (
          <IonTitle>{title}</IonTitle>
        )}
      </StyledToolbar>
    </IonHeader>
  );
};

export default TopBar;

const ToolbarLogo = styled.div`
  padding-left: 1rem;
  font-size: 2.2rem;
  font-weight: 500;
  color: var(--ion-color-primary);
`;
