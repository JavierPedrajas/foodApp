import { IonLabel } from "@ionic/react";
import React from "react";

const CustomInputLabel: React.FC = (props) => {
  return (
    <IonLabel position="stacked" color="primary">
      {props.children}
    </IonLabel>
  );
};

export default CustomInputLabel;
