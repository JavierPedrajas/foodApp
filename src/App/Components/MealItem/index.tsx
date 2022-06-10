import React, { useEffect, useState } from "react";
import { meals, recipes } from "dummy";
import { ISchedule, IMealCalendar, IRecipe } from "lib/interfaces";
import styled from "styled-components";

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

  const content = (
    <>
      <MealName>{meal.name}</MealName>
      <RecipeName>{recipe?.name ?? "Recipe not found"}</RecipeName>
    </>
  );

  switch (type) {
    case "future":
      return <MealItemBase>{content}</MealItemBase>;
    case "prev":
      return <MealItemPrev>{content}</MealItemPrev>;
    case "next":
      return <MealItemNext>{content}</MealItemNext>;
  }
};

export default MealItem;

const MealItemBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--light);
  background-color: var(--purple-light);
  width: 80%;
  border-radius: 40px;
  padding: 1rem 0;
  box-shadow: 0 3px 6px #00000020;
`;

const MealItemPrev = styled(MealItemBase)`
  opacity: 40%;
`;

const MealItemNext = styled(MealItemBase)`
  background-color: var(--main);
`;

const MealName = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  padding-bottom: 1rem;
`;

const RecipeName = styled.div`
  font-size: 2rem;
`;
