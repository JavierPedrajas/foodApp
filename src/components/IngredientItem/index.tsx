import {
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { createOutline } from "ionicons/icons";
import React from "react";
import { IIngredient } from "utils/interfaces";

interface IIngredientItem {
  ingredient: IIngredient;
  onHandleEdit: (ing: IIngredient) => void;
}

const IngredientItem: React.FC<IIngredientItem> = (props) => {
  const { ingredient, onHandleEdit } = props;
  return (
    <IonItem>
      <IonLabel color="light">{ingredient.name}</IonLabel>
      <IonButtons slot="end">
        <IonButton onClick={() => onHandleEdit(ingredient)}>
          <IonIcon icon={createOutline} color="light" />
        </IonButton>
      </IonButtons>
    </IonItem>
  );
};

export default IngredientItem;
