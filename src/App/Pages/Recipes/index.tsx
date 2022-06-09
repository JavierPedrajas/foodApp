import { IonPage, IonContent } from "@ionic/react";
import React from "react";
import { useIntl } from "react-intl";
import TopBar from "../../components/TopBar";

const Recipes: React.FC = () => {
  const intl = useIntl();
  return (
    <IonPage>
      <TopBar
        title={intl.formatMessage({ defaultMessage: "Recipes", id: "RJ0Itf" })}
      />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Recipes;
