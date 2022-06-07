import { IonContent, IonPage } from "@ionic/react";
import MealItem from "../../Components/MealItem";
import TopBar from "../../Components/TopBar";
import { meals, today } from "../../../dummy";
import "./styles.scss";

const TodayPage: React.FC = () => {
  return (
    <IonPage>
      <TopBar logo />
      <IonContent fullscreen className="today">
        {today.meals.map((item, index, array) => {
          let type: "future" | "prev" | "next" = "future";
          const now = new Date().getTime();
          const meal = meals.find((meal) => meal.id === item.scheduleId);
          if (!meal) {
            return;
          }
          const currentMealTime = new Date(
            new Date().setHours(meal.time.hour, meal?.time.minutes)
          ).getTime();

          if (now > currentMealTime) {
            type = "prev";
          } else {
            if (index !== 0) {
              const prevMealCalendar = array[index - 1];
              const prevMeal = meals.find(
                (meal) => meal.id === prevMealCalendar.scheduleId
              );
              if (!prevMeal) {
                return;
              }
              const prevMealTime = new Date(
                new Date().setHours(prevMeal.time.hour, prevMeal.time.minutes)
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
      </IonContent>
    </IonPage>
  );
};

export default TodayPage;
