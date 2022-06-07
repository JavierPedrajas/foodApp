import React, { useEffect, useState } from "react";
import { meals, recipes } from "dummy";
import { ISchedule, IMealCalendar, IRecipe } from "lib/interfaces";
import "./styles.scss";

interface IMealItem {
  mealInfo: IMealCalendar;
  type: "prev" | "next" | "future";
}

const MealItem: React.FC<IMealItem> = (props) => {
  const { mealInfo, type } = props;

  const [recipe, setRecipe] = useState<IRecipe>();
  const [meal, setMeal] = useState<ISchedule>();

  useEffect(() => {
    if (!mealInfo) {
      return;
    }

    const newMeal = meals[mealInfo.scheduleId];
    setMeal(newMeal);

    const newRecipe = recipes[mealInfo.scheduleId];
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