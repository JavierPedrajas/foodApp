import {
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { createOutline } from "ionicons/icons";
import React from "react";
import { ISchedule } from "lib/interfaces";
import "./styles.scss";

interface IScheduleItem {
  schedule: ISchedule;
  onHandleEdit: (sch: ISchedule) => void;
}

const ScheduleItem: React.FC<IScheduleItem> = (props) => {
  const { schedule, onHandleEdit } = props;
  return (
    <IonItem className="ingredient-item">
      <IonLabel color="light">{schedule.name}</IonLabel>
      <IonText color="light">
        {schedule.time.hours.toString().padStart(2, "0")}:
        {schedule.time.minutes.toString().padStart(2, "0")}
      </IonText>
      <IonButtons slot="end">
        <IonButton onClick={() => onHandleEdit(schedule)}>
          <IonIcon icon={createOutline} color="light" />
        </IonButton>
      </IonButtons>
    </IonItem>
  );
};

export default ScheduleItem;
