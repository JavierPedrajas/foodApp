import { useAppDispatch } from "lib/hooks/store";
import { firestore } from "lib/services";
import { getIngredients } from "lib/store/ingredientsSlice";
import { getRecipes } from "lib/store/recipesSlice";
import { getSchedules } from "lib/store/schedulesSlice";
import React, { useEffect } from "react";

const InitStore: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    initStore();
  }, []);

  const initStore = () => {
    dispatch(getIngredients());
    dispatch(getSchedules());
    dispatch(getRecipes());
  };

  return null;
};

export default InitStore;
