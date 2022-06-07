import {
  IonAlert,
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
} from "@ionic/react";
import LoadingSpinner from "app/components/LoadingSpinner";
import ModalWrapper from "app/components/ModalWrapper";
import TopBar from "app/components/TopBar";
import { add } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { IIngredient } from "lib/interfaces";
import {
  getIngredients,
  addIngredient,
  deleteIngredient,
  updateIngredient,
  selectIsLoadingIngredients,
} from "lib/store/ingredientsSlice";
import "./styles.scss";

import { v4 as uuidv4 } from "uuid";
import IngredientItem from "app/components/IngredientItem";
import { useFormatMessage } from "langs/utils";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { selectIngredients } from "lib/store/ingredientsSlice";

interface IIngredients {}

const Ingredients: React.FC<IIngredients> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [ingredientName, setIngredientName] = useState<string>("");
  const [selectedIngredient, setSelectedIngredient] = useState<IIngredient>();

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(selectIngredients);
  const isLoading = useAppSelector(selectIsLoadingIngredients);

  const fetchIngredients = async () => {
    await dispatch(getIngredients());
  };

  const onAddIngredient = async () => {
    if (ingredientName !== "") {
      const newIngredient: IIngredient = {
        name: ingredientName,
        id: uuidv4(),
      };
      await dispatch(addIngredient(newIngredient));
    }
    onCloseModal();
  };

  const onEditIngredient = (ing: IIngredient) => {
    setSelectedIngredient(ing);
    setIngredientName(ing.name);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setIngredientName("");
    setSelectedIngredient(undefined);
  };

  const onUpdateIngredient = async () => {
    if (selectedIngredient && ingredientName !== "") {
      const newIngredient: IIngredient = {
        name: ingredientName,
        id: selectedIngredient.id,
      };
      await dispatch(updateIngredient(newIngredient));
    }
    onCloseModal();
  };

  const onClickDelete = () => {
    setIsDeleteAlertOpen(true);
  };

  const onDeleteIngredient = async () => {
    if (selectedIngredient) {
      await dispatch(deleteIngredient(selectedIngredient));
    }
    onCloseModal();
  };

  useEffect(() => {
    if (Object.keys(ingredients).length === 0) {
      fetchIngredients();
    }
  }, []);

  return (
    <IonPage>
      <IonModal isOpen={isModalOpen}>
        <ModalWrapper
          title={useFormatMessage("routes.SideMenu.Ingredients")}
          buttonText={useFormatMessage(
            selectedIngredient
              ? "pages.Ingredients.Modal.Update"
              : "pages.Ingredients.Modal.Add"
          )}
          onHandleClose={onCloseModal}
          onHandleAdd={
            selectedIngredient ? onUpdateIngredient : onAddIngredient
          }
          isDisabled={ingredientName === ""}
          deleteButton={
            selectedIngredient ? (
              <IonButton onClick={onClickDelete} fill="outline">
                <FormattedMessage id={"pages.Ingredients.Modal.Delete"} />
              </IonButton>
            ) : undefined
          }
        >
          <IonItem>
            <IonLabel position="floating" color="primary">
              <FormattedMessage id={"pages.Ingredients.Modal.Name"} />
            </IonLabel>
            <IonInput
              color="light"
              value={ingredientName}
              type="text"
              onIonChange={(e) => setIngredientName(e.detail.value as string)}
            />
          </IonItem>
          <IonAlert
            isOpen={isDeleteAlertOpen}
            onDidDismiss={() => setIsDeleteAlertOpen(false)}
            cssClass={"my-custom-select"}
            subHeader={useFormatMessage(
              "pages.Ingredients.Modal.DeleteConfirm"
            )}
            buttons={[
              {
                text: useFormatMessage("modal.buttons.Cancel"),
                role: "cancel",
                handler: () => setIsDeleteAlertOpen(false),
              },
              {
                text: useFormatMessage("modal.buttons.Confirm"),
                handler: onDeleteIngredient,
              },
            ]}
          />
        </ModalWrapper>
      </IonModal>
      <LoadingSpinner open={isLoading} />
      <TopBar title="routes.SideMenu.Ingredients" />
      <IonContent fullscreen className="ingredients">
        {Object.keys(ingredients).length > 0 ? (
          <>
            <IonList>
              {Object.values(ingredients).map((ing) => (
                <IngredientItem
                  key={ing.id}
                  ingredient={ing}
                  onHandleEdit={onEditIngredient}
                />
              ))}
            </IonList>
            <IonFab
              vertical="bottom"
              horizontal="end"
              slot="fixed"
              onClick={() => setIsModalOpen(true)}
              // className={"custom-fab"}
            >
              <IonFabButton>
                <IonIcon icon={add} />
              </IonFabButton>
            </IonFab>
          </>
        ) : (
          <div className="ingredients__noList">
            {!isLoading && (
              <>
                <div className="ingredients__noList__text">
                  <FormattedMessage id={"pages.Ingredients.NoIngredients"} />
                </div>
                <div className="ingredients__noList__text">
                  <FormattedMessage id={"pages.Ingredients.PressHereToAdd"} />
                </div>

                <IonFab
                  horizontal="center"
                  onClick={() => setIsModalOpen(true)}
                >
                  <IonFabButton>
                    <IonIcon icon={add} />
                  </IonFabButton>
                </IonFab>
              </>
            )}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Ingredients;
