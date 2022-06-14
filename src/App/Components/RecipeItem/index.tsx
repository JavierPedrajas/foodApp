import {
  IonButton,
  IonButtons,
  IonChip,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { createOutline } from "ionicons/icons";
import React from "react";
import { IRecipe } from "lib/interfaces";
import { StyledListItem } from "app/components/SharedStyledComponents";
import styled from "styled-components";
import { useAppSelector } from "lib/hooks/store";
import { selectSchedules } from "lib/store/schedulesSlice";

interface IRecipeItem {
  recipe: IRecipe;
  onHandleEdit: (rec: IRecipe) => void;
}

const RecipeItem: React.FC<IRecipeItem> = (props) => {
  const { recipe, onHandleEdit } = props;
  const schedules = useAppSelector(selectSchedules);
  return (
    <StyledListItem>
      <RecipeTextWrapper>
        <IonLabel color="light">{recipe.name}</IonLabel>
        <SchedulesWrapper>
          {recipe.scheduleIDs.map((id) => (
            <ScheduleText key={id} color="light">
              {schedules[id].name}
            </ScheduleText>
          ))}
        </SchedulesWrapper>
      </RecipeTextWrapper>
      <IonButtons slot="end">
        <IonButton onClick={() => onHandleEdit(recipe)}>
          <IonIcon icon={createOutline} color="light" />
        </IonButton>
      </IonButtons>
    </StyledListItem>
  );
};

export default RecipeItem;

const RecipeTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SchedulesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  flex-wrap: wrap;
`;

const ScheduleText = styled(IonChip)`
  margin-right: 5px;
`;
