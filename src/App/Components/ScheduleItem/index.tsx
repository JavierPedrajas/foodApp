import {
  IonButton,
  IonButtons,
  IonIcon,
  IonLabel,
  IonText,
} from "@ionic/react";
import { createOutline } from "ionicons/icons";
import React from "react";
import { ISchedule } from "lib/interfaces";
import { StyledListItem } from "app/components/SharedStyledComponents";

interface IScheduleItem {
  schedule: ISchedule;
  onHandleEdit: (sch: ISchedule) => void;
}

const ScheduleItem: React.FC<IScheduleItem> = (props) => {
  const { schedule, onHandleEdit } = props;
  return (
    <StyledListItem>
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
    </StyledListItem>
  );
};

export default ScheduleItem;
