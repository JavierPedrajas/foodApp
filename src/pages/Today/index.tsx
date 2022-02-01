import { IonContent, IonPage } from "@ionic/react";
import TopBar from "../../components/TopBar";

const TodayPage: React.FC = () => {
  return (
    <IonPage>
      <TopBar logo />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default TodayPage;
