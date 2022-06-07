import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import TopBar from "App/Components/TopBar";
import React, { useContext, useState } from "react";
import "./styles.scss";
import { Context, LangType } from "Utils/Context/LangContext";
import { getUserDoc, updateUser } from "Utils/Services";
import LoadingSpinner from "App/Components/LoadingSpinner";
import { FormattedMessage } from "react-intl";
import { useFormatMessage } from "Langs/utils";
import { SelectOptions } from "Utils/functions";

const Config: React.FC = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const langContext = useContext(Context);

  const updateLanguage = async (lang: LangType) => {
    setIsLoading(true);
    const currentUser = await getUserDoc();
    if (currentUser) {
      currentUser.config.language = lang;
      await updateUser(currentUser);
    }
    langContext.selectLanguage(lang);
    setIsLoading(false);
  };

  return (
    <IonPage>
      <LoadingSpinner open={isLoading} />
      <TopBar title={"routes.SideMenu.Configuration"} />
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel color="light">
              <FormattedMessage id={"pages.ConfigPage.Language"} />
            </IonLabel>
            <IonSelect
              value={langContext.locale}
              onIonChange={(e) => updateLanguage(e.detail.value)}
              interfaceOptions={SelectOptions}
              okText={useFormatMessage("modal.buttons.OK")}
              cancelText={useFormatMessage("modal.buttons.Cancel")}
            >
              <IonSelectOption value={"es-ES"}>
                <FormattedMessage id={"pages.ConfigPage.Spanish"} />
              </IonSelectOption>
              <IonSelectOption value={"en-US"}>
                <FormattedMessage id={"pages.ConfigPage.English"} />
              </IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Config;
