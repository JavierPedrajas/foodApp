import { IonPage, IonContent } from "@ionic/react";
import React from "react";
import TopBar from "../../components/TopBar";
import MainTabs from "../../routes/MainTabs";

interface IRecipes {}

const Recipes: React.FC<IRecipes> = (props) => {
  return (
    <IonPage>
      <TopBar title="Recetas" />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Recipes;
