import { IonPage, IonContent } from "@ionic/react";
import React from "react";
import TopBar from "../../components/TopBar";

const Schedule: React.FC = (props) => {
  return (
    <IonPage>
      <TopBar title={"routes.SideMenu.Schedule"} />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Schedule;
