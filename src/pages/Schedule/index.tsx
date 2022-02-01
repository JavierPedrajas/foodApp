import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import TopBar from "../../components/TopBar";

const SchedulePage: React.FC = () => {
  return (
    <IonPage>
      <TopBar logo />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default SchedulePage;
