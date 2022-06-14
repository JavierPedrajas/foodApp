import {
  IonModal,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import CustomInputLabel from "app/components/CustomInputLabel";
import ModalWrapper from "app/components/ModalWrapper";
import {
  StyledInputItem,
  StyledListItem,
  StyledSelectInput,
} from "app/components/SharedStyledComponents";
import DeleteRecipeAlert from "app/pages/Recipes/deleteRecipeAlert";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { IIngredient, IRecipe, ISchedule } from "lib/interfaces";
import { selectIngredients } from "lib/store/ingredientsSlice";
import { addRecipe, updateRecipe } from "lib/store/recipesSlice";
import { selectSchedules } from "lib/store/schedulesSlice";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { v4 as uuidv4 } from "uuid";

interface IRecipesModal {
  isOpen: boolean;
  selectedRecipe?: IRecipe;
  closeCallback: () => void;
}

const RecipesModal: React.FC<IRecipesModal> = ({
  isOpen,
  selectedRecipe,
  closeCallback,
}) => {
  const [recipeName, setRecipeName] = useState<string>("");
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const intl = useIntl();
  const dispatch = useAppDispatch();

  const schedules = useAppSelector(selectSchedules);
  const ingredients = useAppSelector(selectIngredients);

  useEffect(() => {
    if (selectedRecipe) {
      setRecipeName(selectedRecipe.name);
      setSelectedSchedules(selectedRecipe.scheduleIDs);
      setSelectedIngredients(selectedRecipe.ingredientIDs);
    } else {
      setRecipeName("");
      setSelectedSchedules([]);
      setSelectedIngredients([]);
    }
  }, [selectedRecipe, isOpen]);

  const onAddRecipe = async () => {
    if (recipeName !== "" && selectedSchedules.length > 0) {
      const newRecipe: IRecipe = {
        name: recipeName,
        id: uuidv4(),
        ingredientIDs: selectedIngredients,
        scheduleIDs: selectedSchedules,
      };
      await dispatch(addRecipe(newRecipe));
    }
    closeCallback();
  };

  const onUpdateRecipe = async () => {
    if (selectedRecipe && recipeName !== "" && selectedSchedules.length > 0) {
      const newRecipe: IRecipe = {
        name: recipeName,
        id: selectedRecipe.id,
        ingredientIDs: selectedIngredients,
        scheduleIDs: selectedSchedules,
      };
      await dispatch(updateRecipe(newRecipe));
    }
    closeCallback();
  };

  const onClickDelete = () => {
    setIsDeleteAlertOpen(true);
  };

  return (
    <IonModal isOpen={isOpen}>
      <ModalWrapper
        title={intl.formatMessage({
          defaultMessage: "Recipe",
          id: "FZKOUm",
        })}
        buttonText={
          selectedRecipe
            ? intl.formatMessage({
                defaultMessage: "Update Recipe",
                id: "TQRh0t",
              })
            : intl.formatMessage({
                defaultMessage: "Add Recipe",
                id: "a1ONvn",
              })
        }
        onHandleClose={closeCallback}
        onHandleAdd={selectedRecipe ? onUpdateRecipe : onAddRecipe}
        isDisabled={recipeName === "" || selectedSchedules.length === 0}
        deleteButton={
          selectedRecipe ? (
            <IonButton onClick={onClickDelete} fill="outline">
              <FormattedMessage defaultMessage="Delete Recipe" id="G/qMzE" />
            </IonButton>
          ) : undefined
        }
      >
        <StyledInputItem>
          <CustomInputLabel>
            <FormattedMessage defaultMessage="Name" id="HAlOn1" />
          </CustomInputLabel>
          <IonInput
            color="light"
            value={recipeName}
            type="text"
            onIonChange={(e) => setRecipeName(e.detail.value as string)}
          />
        </StyledInputItem>
        <StyledListItem>
          <CustomInputLabel>
            <FormattedMessage defaultMessage="Schedules" id="F42bEw" />
          </CustomInputLabel>
          <StyledSelectInput
            multiple
            okText={intl.formatMessage({ defaultMessage: "OK", id: "kAEQyV" })}
            cancelText={intl.formatMessage({
              defaultMessage: "Cancel",
              id: "47FYwb",
            })}
            interfaceOptions={{ cssClass: "my-custom-select" }}
            value={selectedSchedules}
            onIonChange={(e) =>
              setSelectedSchedules(e.detail.value as string[])
            }
          >
            {Object.values(schedules).map((schedule) => {
              return (
                <IonSelectOption value={schedule.id} key={schedule.id}>
                  {schedule.name}
                </IonSelectOption>
              );
            })}
          </StyledSelectInput>
        </StyledListItem>
        <StyledListItem>
          <CustomInputLabel>
            <FormattedMessage defaultMessage="Ingredients" id="q+X++I" />
          </CustomInputLabel>
          <StyledSelectInput
            multiple
            okText={intl.formatMessage({ defaultMessage: "OK", id: "kAEQyV" })}
            cancelText={intl.formatMessage({
              defaultMessage: "Cancel",
              id: "47FYwb",
            })}
            interfaceOptions={{ cssClass: "my-custom-select" }}
            value={selectedIngredients}
            onIonChange={(e) =>
              setSelectedIngredients(e.detail.value as string[])
            }
          >
            {Object.values(ingredients).map((ingredient) => {
              return (
                <IonSelectOption value={ingredient.id} key={ingredient.id}>
                  {ingredient.name}
                </IonSelectOption>
              );
            })}
          </StyledSelectInput>
        </StyledListItem>

        <DeleteRecipeAlert
          isOpen={isDeleteAlertOpen}
          closeAlertCallback={() => setIsDeleteAlertOpen(false)}
          closeModalCallback={closeCallback}
          selectedRecipe={selectedRecipe}
        />
      </ModalWrapper>
    </IonModal>
  );
};

export default RecipesModal;
