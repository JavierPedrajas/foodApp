import { IonPage, IonContent } from "@ionic/react";
import React from "react";
import TopBar from "../../components/TopBar";

const ListPage: React.FC = (props) => {
  return (
    <IonPage>
      <TopBar logo />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default ListPage;
