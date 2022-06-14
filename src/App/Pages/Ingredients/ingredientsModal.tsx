import { IonModal, IonButton, IonItem, IonLabel, IonInput } from "@ionic/react";
import CustomInputLabel from "app/components/CustomInputLabel";
import ModalWrapper from "app/components/ModalWrapper";
import DeleteIngredientAlert from "app/pages/Ingredients/deleteIngredientAlert";
import { useAppDispatch } from "lib/hooks/store";
import { IIngredient } from "lib/interfaces";
import { addIngredient, updateIngredient } from "lib/store/ingredientsSlice";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { v4 as uuidv4 } from "uuid";

interface IIngredientsModal {
  isOpen: boolean;
  selectedIngredient?: IIngredient;
  closeCallback: () => void;
}

const IngredientsModal: React.FC<IIngredientsModal> = ({
  isOpen,
  selectedIngredient,
  closeCallback,
}) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const [ingredientName, setIngredientName] = useState("");

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    if (selectedIngredient) {
      setIngredientName(selectedIngredient.name);
    } else {
      setIngredientName("");
    }
  }, [selectedIngredient, isOpen]);

  const onAddIngredient = async () => {
    if (ingredientName !== "") {
      const newIngredient: IIngredient = {
        name: ingredientName,
        id: uuidv4(),
      };
      await dispatch(addIngredient(newIngredient));
    }
    closeCallback();
  };

  const onUpdateIngredient = async () => {
    if (selectedIngredient && ingredientName !== "") {
      const newIngredient: IIngredient = {
        name: ingredientName,
        id: selectedIngredient.id,
      };
      await dispatch(updateIngredient(newIngredient));
    }
    closeCallback();
  };

  const onClickDelete = () => {
    setIsAlertOpen(true);
  };

  return (
    <IonModal isOpen={isOpen}>
      <ModalWrapper
        title={intl.formatMessage({
          defaultMessage: "Ingredients",
          id: "q+X++I",
        })}
        buttonText={
          selectedIngredient
            ? intl.formatMessage({
                defaultMessage: "Update Ingredient",
                id: "I5WHzz",
              })
            : intl.formatMessage({
                defaultMessage: "Add Ingredient",
                id: "HZqgiQ",
              })
        }
        onHandleClose={closeCallback}
        onHandleAdd={selectedIngredient ? onUpdateIngredient : onAddIngredient}
        isDisabled={ingredientName === ""}
        deleteButton={
          selectedIngredient ? (
            <IonButton onClick={onClickDelete} fill="outline">
              <FormattedMessage
                defaultMessage="Delete Ingredient"
                id="zcuhAh"
              />
            </IonButton>
          ) : undefined
        }
      >
        <IonItem>
          <CustomInputLabel>
            <FormattedMessage defaultMessage="Name" id="HAlOn1" />
          </CustomInputLabel>
          <IonInput
            color="light"
            value={ingredientName}
            type="text"
            onIonChange={(e) => setIngredientName(e.detail.value as string)}
          />
        </IonItem>
        <DeleteIngredientAlert
          isOpen={isAlertOpen}
          closeAlertCallback={() => setIsAlertOpen(false)}
          closeModalCallback={closeCallback}
          selectedIngredient={selectedIngredient}
        />
      </ModalWrapper>
    </IonModal>
  );
};

export default IngredientsModal;
