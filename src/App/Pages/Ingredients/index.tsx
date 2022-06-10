import {
  IonAlert,
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
} from "@ionic/react";
import LoadingSpinner from "app/components/LoadingSpinner";
import ModalWrapper from "app/components/ModalWrapper";
import TopBar from "app/components/TopBar";
import { add } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { IIngredient } from "lib/interfaces";
import {
  getIngredients,
  addIngredient,
  deleteIngredient,
  updateIngredient,
  selectIsLoadingIngredients,
  selectIngredients,
} from "lib/store/ingredientsSlice";

import { v4 as uuidv4 } from "uuid";
import IngredientItem from "app/components/IngredientItem";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import {
  NoItemsList,
  NoItemsText,
} from "app/components/SharedStyledComponents";

const Ingredients: React.FC = () => {
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

  const intl = useIntl();

  return (
    <IonPage>
      <IonModal isOpen={isModalOpen}>
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
          onHandleClose={onCloseModal}
          onHandleAdd={
            selectedIngredient ? onUpdateIngredient : onAddIngredient
          }
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
            <IonLabel position="floating" color="primary">
              <FormattedMessage defaultMessage="Name" id="HAlOn1" />
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
            subHeader={intl.formatMessage({
              defaultMessage:
                "Are you sure you want to delete this ingredient?",
              id: "N+8klo",
            })}
            buttons={[
              {
                text: intl.formatMessage({
                  defaultMessage: "No, Cancel",
                  id: "tjhcV3",
                }),
                role: "cancel",
                handler: () => setIsDeleteAlertOpen(false),
              },
              {
                text: intl.formatMessage({
                  defaultMessage: "Yes, Delete",
                  id: "QEmYhz",
                }),
                handler: onDeleteIngredient,
              },
            ]}
          />
        </ModalWrapper>
      </IonModal>
      <LoadingSpinner open={isLoading} />
      <TopBar
        title={intl.formatMessage({
          defaultMessage: "Ingredients",
          id: "q+X++I",
        })}
      />
      <IonContent fullscreen>
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
            >
              <IonFabButton>
                <IonIcon icon={add} />
              </IonFabButton>
            </IonFab>
          </>
        ) : (
          <NoItemsList>
            {!isLoading && (
              <>
                <NoItemsText>
                  <FormattedMessage
                    defaultMessage="There are no ingredients yet"
                    id="M/LPix"
                  />
                </NoItemsText>
                <NoItemsText>
                  <FormattedMessage
                    defaultMessage="Press here to add the first one!"
                    id="OfCP48"
                  />
                </NoItemsText>

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
          </NoItemsList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Ingredients;
