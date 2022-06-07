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
import LoadingSpinner from "App/Components/LoadingSpinner";
import ModalWrapper from "App/Components/ModalWrapper";
import TopBar from "App/Components/TopBar";
import { add } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { IIngredient } from "Utils/Interfaces";
import {
  addIngredient,
  deleteIngredient,
  getIngredients,
  updateIngredient,
} from "Utils/Services/ingredients";
import "./styles.scss";

import { v4 as uuidv4 } from "uuid";
import IngredientItem from "App/Components/IngredientItem";
import { useFormatMessage } from "Langs/utils";

interface IIngredients {}

const Ingredients: React.FC<IIngredients> = (props) => {
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [ingredientName, setIngredientName] = useState<string>("");
  const [selectedIngredient, setSelectedIngredient] = useState<IIngredient>();

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const fetchIngredients = async () => {
    const ingredientsList = await getIngredients();
    if (ingredientsList) {
      setIngredients(ingredientsList.data);
    }
    setIsLoading(false);
  };

  const onAddIngredient = async () => {
    setIsLoading(true);

    if (ingredientName !== "") {
      const newIngredient: IIngredient = {
        name: ingredientName,
        id: uuidv4(),
      };
      await addIngredient(newIngredient);
      await fetchIngredients();
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
    setIsLoading(true);
    if (selectedIngredient && ingredientName !== "") {
      const newIngredient: IIngredient = {
        name: ingredientName,
        id: selectedIngredient.id,
      };
      await updateIngredient(newIngredient);
      await fetchIngredients();
    }
    onCloseModal();
  };

  const onClickDelete = () => {
    setIsDeleteAlertOpen(true);
  };

  const onDeleteIngredient = async () => {
    setIsLoading(true);
    if (selectedIngredient) {
      await deleteIngredient(selectedIngredient);
      await fetchIngredients();
    }
    onCloseModal();
  };

  useEffect(() => {
    fetchIngredients();
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
        {ingredients.length > 0 ? (
          <>
            <IonList>
              {ingredients.map((ing) => (
                <IngredientItem
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
