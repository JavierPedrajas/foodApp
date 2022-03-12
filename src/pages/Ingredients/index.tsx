import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import LoadingSpinner from "components/LoadingSpinner";
import TopBar from "components/TopBar";
import { add } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { IIngredient } from "utils/interfaces";
import { getIngredients } from "utils/services/ingredients";
import "./styles.scss";

interface IIngredients {}

const Ingredients: React.FC<IIngredients> = (props) => {
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchIngredients = async () => {
    const ingredientsList = await getIngredients();
    if (ingredientsList) {
      setIngredients(ingredientsList.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <IonPage>
      <LoadingSpinner open={isLoading} />
      <TopBar title="routes.SideMenu.Ingredients" />
      <IonContent fullscreen className="ingredients">
        {ingredients.length > 0 ? (
          <>
            <IonList>
              {ingredients.map((ing) => (
                <IonItem key={ing.id}>
                  <IonLabel>{ing.name}</IonLabel>
                </IonItem>
              ))}
            </IonList>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
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

                <IonFab horizontal="center">
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
