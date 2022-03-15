import {
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
import LoadingSpinner from "components/LoadingSpinner";
import ModalWrapper from "components/ModalWrapper";
import TopBar from "components/TopBar";
import { add } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { IIngredient } from "utils/interfaces";
import {
  addIngredient,
  deleteIngredient,
  getIngredients,
  updateIngredient,
} from "utils/services/ingredients";
import "./styles.scss";

import { v4 as uuidv4 } from "uuid";
import IngredientItem from "components/IngredientItem";

interface IIngredients {}

const Ingredients: React.FC<IIngredients> = (props) => {
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [ingredientName, setIngredientName] = useState<string>("");
  const [selectedIngredient, setSelectedIngredient] = useState<IIngredient>();

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
          title="Ingredients"
          buttonText={
            selectedIngredient ? "Update Ingredient" : "Add Ingredient"
          }
          onHandleClose={onCloseModal}
          onHandleAdd={
            selectedIngredient ? onUpdateIngredient : onAddIngredient
          }
          isDisabled={ingredientName === ""}
          deleteButton={
            selectedIngredient ? (
              <IonButton onClick={onDeleteIngredient} fill="outline">
                Delete Ingredient
              </IonButton>
            ) : undefined
          }
        >
          <IonItem>
            <IonLabel position="floating" color="primary">
              Name
            </IonLabel>
            <IonInput
              color="light"
              value={ingredientName}
              type="text"
              onIonChange={(e) => setIngredientName(e.detail.value as string)}
            />
          </IonItem>
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
