import { IonContent, IonPage } from "@ionic/react";
import TopBar from "app/components/TopBar";
import React from "react";
import "./styles.scss";

interface IProfile {}

const Profile: React.FC<IProfile> = (props) => {
  return (
    <IonPage>
      <TopBar title={"routes.SideMenu.Profile"} />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Profile;