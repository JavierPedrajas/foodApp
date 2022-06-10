import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import TopBar from "app/components/TopBar";
import React, { useContext, useState } from "react";
import { Context, LangType } from "lib/context/LangContext";
import { getUserDoc, updateUser } from "lib/services";
import LoadingSpinner from "app/components/LoadingSpinner";
import { FormattedMessage, useIntl } from "react-intl";
import { SelectOptions } from "lib/functions";

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

  const intl = useIntl();

  return (
    <IonPage>
      <LoadingSpinner open={isLoading} />
      <TopBar
        title={intl.formatMessage({
          defaultMessage: "Configuration",
          id: "7OW8BT",
        })}
      />
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel color="light">
              <FormattedMessage defaultMessage="Language" id="y1Z3or" />
            </IonLabel>
            <IonSelect
              value={langContext.locale}
              onIonChange={(e) => updateLanguage(e.detail.value)}
              interfaceOptions={SelectOptions}
              okText={intl.formatMessage({
                defaultMessage: "Select",
                id: "kQAf2d",
              })}
              cancelText={intl.formatMessage({
                defaultMessage: "Cancel",
                id: "47FYwb",
              })}
            >
              <IonSelectOption value={"es-ES"}>
                <FormattedMessage defaultMessage="Spanish" id="8WtyrD" />
              </IonSelectOption>
              <IonSelectOption value={"en-US"}>
                <FormattedMessage defaultMessage="English" id="WkrNSk" />
              </IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Config;
