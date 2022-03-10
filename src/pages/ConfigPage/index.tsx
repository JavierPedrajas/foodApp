import { IonContent, IonPage } from "@ionic/react";
import TopBar from "components/TopBar";
import React from "react";
import "./styles.scss"

interface IConfig {}

const Config: React.FC<IConfig> = (props) => {
  return (
    <IonPage>
      <TopBar title="Configuración" />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Config;
