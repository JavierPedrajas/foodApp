import { IonPage, IonContent } from "@ionic/react";
import React from "react";
import TopBar from "../../components/TopBar";

interface IListPage {}

const ListPage: React.FC<IListPage> = (props) => {
  return (
    <IonPage>
      <TopBar logo />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default ListPage;
