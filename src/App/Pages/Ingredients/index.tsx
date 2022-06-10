import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonPage,
} from "@ionic/react";
import LoadingSpinner from "app/components/LoadingSpinner";
import TopBar from "app/components/TopBar";
import { add } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { IIngredient } from "lib/interfaces";
import {
  getIngredients,
  selectIsLoadingIngredients,
  selectIngredients,
} from "lib/store/ingredientsSlice";

import IngredientItem from "app/components/IngredientItem";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import {
  NoItemsList,
  NoItemsText,
} from "app/components/SharedStyledComponents";
import IngredientsModal from "app/pages/Ingredients/ingredientsModal";

const Ingredients: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<IIngredient>();

  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(selectIngredients);
  const isLoading = useAppSelector(selectIsLoadingIngredients);

  const fetchIngredients = async () => {
    await dispatch(getIngredients());
  };

  const onEditIngredient = (ing: IIngredient) => {
    setSelectedIngredient(ing);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIngredient(undefined);
  };

  useEffect(() => {
    if (Object.keys(ingredients).length === 0) {
      fetchIngredients();
    }
  }, []);

  const intl = useIntl();

  return (
    <IonPage>
      <IngredientsModal
        isOpen={isModalOpen}
        closeCallback={onCloseModal}
        selectedIngredient={selectedIngredient}
      />

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
