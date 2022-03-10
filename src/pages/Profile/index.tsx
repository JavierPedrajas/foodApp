import { IonContent, IonPage } from "@ionic/react";
import TopBar from "components/TopBar";
import React from "react";
import "./styles.scss"

interface IProfile {}

const Profile: React.FC<IProfile> = (props) => {
  return (
    <IonPage>
      <TopBar title="Perfil" />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Profile;
