import { IonContent, IonPage } from "@ionic/react";
import TopBar from "app/components/TopBar";
import React from "react";
import { useIntl } from "react-intl";
import "./styles.scss";

const Profile: React.FC = () => {
  const intl = useIntl();
  return (
    <IonPage>
      <TopBar
        title={intl.formatMessage({ defaultMessage: "Profile", id: "itPgxd" })}
      />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Profile;
