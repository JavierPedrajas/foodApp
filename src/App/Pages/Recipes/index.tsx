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
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { IRecipe } from "lib/interfaces";
import { useAppSelector } from "lib/hooks/store";
import {
  NoItemsList,
  NoItemsText,
} from "app/components/SharedStyledComponents";
import { selectIsLoadingRecipes, selectRecipes } from "lib/store/recipesSlice";
import RecipesModal from "app/pages/Recipes/recipesModal";
import RecipeItem from "app/components/RecipeItem";

const Recipes: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedRecipe, setSelectedRecipe] = useState<IRecipe>();

  const recipes = useAppSelector(selectRecipes);
  const isLoading = useAppSelector(selectIsLoadingRecipes);

  const onEditRecipe = (rcp: IRecipe) => {
    setSelectedRecipe(rcp);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(undefined);
  };

  const intl = useIntl();

  return (
    <IonPage>
      <RecipesModal
        isOpen={isModalOpen}
        selectedRecipe={selectedRecipe}
        closeCallback={onCloseModal}
      />
      <LoadingSpinner open={isLoading} />
      <TopBar
        title={intl.formatMessage({
          defaultMessage: "Recipes",
          id: "RJ0Itf",
        })}
      />
      <IonContent fullscreen>
        {Object.keys(recipes).length > 0 ? (
          <>
            <IonList>
              {Object.values(recipes).map((rec) => (
                <RecipeItem
                  key={rec.id}
                  recipe={rec}
                  onHandleEdit={onEditRecipe}
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
                    defaultMessage="There are no recipes added"
                    id="7EI4Eh"
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

export default Recipes;
