import { IonContent, IonPage } from "@ionic/react";
import MealItem from "../../components/MealItem";
import TopBar from "../../components/TopBar";
import { meals, today } from "../../../dummy";
import styled from "styled-components";

const TodayPage: React.FC = () => {
  return (
    <IonPage>
      <TopBar logo />
      <TodayMain fullscreen>
        {today.meals.map((item, index, array) => {
          let type: "future" | "prev" | "next" = "future";
          const now = new Date().getTime();
          const meal = meals[item.scheduleId];
          if (!meal) {
            return null;
          }
          const currentMealTime = new Date(
            new Date().setHours(meal.time.hours, meal?.time.minutes)
          ).getTime();

          if (now > currentMealTime) {
            type = "prev";
          } else {
            if (index !== 0) {
              const prevMealCalendar = array[index - 1];
              const prevMeal = meals[prevMealCalendar.scheduleId];
              if (!prevMeal) {
                return null;
              }
              const prevMealTime = new Date(
                new Date().setHours(prevMeal.time.hours, prevMeal.time.minutes)
              ).getTime();

              if (now > prevMealTime) {
                type = "next";
              }
            } else {
              type = "next";
            }
          }

          return <MealItem mealInfo={item} type={type} key={item.scheduleId} />;
        })}
      </TodayMain>
    </IonPage>
  );
};

export default TodayPage;

const TodayMain = styled(IonContent)`
::part(scroll) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
