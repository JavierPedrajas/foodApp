import { IonButton, IonButtons, IonIcon, IonLabel } from "@ionic/react";
import { createOutline } from "ionicons/icons";
import React from "react";
import { IIngredient } from "lib/interfaces";
import { StyledListItem } from "app/components/SharedStyledComponents";

interface IIngredientItem {
  ingredient: IIngredient;
  onHandleEdit: (ing: IIngredient) => void;
}

const IngredientItem: React.FC<IIngredientItem> = (props) => {
  const { ingredient, onHandleEdit } = props;
  return (
    <StyledListItem>
      <IonLabel color="light">{ingredient.name}</IonLabel>
      <IonButtons slot="end">
        <IonButton onClick={() => onHandleEdit(ingredient)}>
          <IonIcon icon={createOutline} color="light" />
        </IonButton>
      </IonButtons>
    </StyledListItem>
  );
};

export default IngredientItem;
