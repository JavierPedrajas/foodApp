import React, { useEffect, useState } from "react";
import { meals, recipes } from "../../dummy";
import { IMeal, IMealCalendar, IRecipe } from "../../utils/interfaces";
import "./styles.scss";

interface IMealItem {
  mealInfo: IMealCalendar;
  type: "prev" | "next" | "future";
}

const MealItem: React.FC<IMealItem> = (props) => {
  const { mealInfo, type } = props;

  const [recipe, setRecipe] = useState<IRecipe>();
  const [meal, setMeal] = useState<IMeal>();

  useEffect(() => {
    if (!mealInfo) {
      return;
    }

    const newMeal = meals.find((meal) => meal.id === mealInfo.mealId);
    setMeal(newMeal);

    const newRecipe = recipes.find((recipe) => recipe.id === mealInfo.recipeId);
    setRecipe(newRecipe);
  }, [mealInfo]);

  if (!meal) {
    return null;
  }

  return (
    <div className={`mealItem ${type}`}>
      <div className="mealItem__meal">{meal.name}</div>
      <div className="mealItem__recipe">
        {recipe ? recipe.name : "Recipe not found"}
      </div>
    </div>
  );
};

export default MealItem;
