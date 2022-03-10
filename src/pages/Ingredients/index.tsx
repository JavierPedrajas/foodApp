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
import { IIngredient } from "utils/interfaces";
import { getIngredients } from "utils/services/ingredients";
import "./styles.scss";

interface IIngredients {}

const Ingredients: React.FC<IIngredients> = (props) => {
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);

  const fetchIngredients = async () => {
    const ingredientsList = await getIngredients();
    if (ingredientsList) {
      setIngredients(ingredientsList.data);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <IonPage>
      <TopBar title="Ingredientes" />
      <IonContent fullscreen className="ingredients">
        {ingredients.length > 0 ? (
          <>
            {" "}
            <IonList>
              {ingredients.map((ing) => (
                <IonItem>
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
            <div className="ingredients__noList__text">
              Todavía no has añadido ningún ingrediente.
            </div>
            <div className="ingredients__noList__text">
              ¡Pulsa aquí para añadir el primero!
            </div>

            <IonFab horizontal="center">
              <IonFabButton>
                <IonIcon icon={add} />
              </IonFabButton>
            </IonFab>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Ingredients;
