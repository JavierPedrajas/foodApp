import { IonAlert } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { ISchedule } from "lib/interfaces";
import {
  removeScheduleFromRecipes,
  selectRecipes,
} from "lib/store/recipesSlice";
import { deleteSchedule } from "lib/store/schedulesSlice";
import React from "react";
import { useIntl } from "react-intl";

interface IDeleteScheduleAlert {
  isOpen: boolean;
  closeAlertCallback: () => void;
  closeModalCallback: () => void;
  selectedSchedule?: ISchedule;
}

const DeleteScheduleAlert: React.FC<IDeleteScheduleAlert> = ({
  isOpen,
  closeAlertCallback,
  closeModalCallback,
  selectedSchedule,
}) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const recipes = useAppSelector(selectRecipes);

  const onDeleteSchedule = async () => {
    if (selectedSchedule) {
      await dispatch(
        removeScheduleFromRecipes({
          scheduleId: selectedSchedule.id,
          recipes: Object.values(recipes),
        })
      );
      await dispatch(deleteSchedule(selectedSchedule));
    }
    closeAlertCallback();
    closeModalCallback();
  };

  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={closeAlertCallback}
      cssClass={"my-custom-select"}
      subHeader={intl.formatMessage({
        defaultMessage: "Are you sure you want to delete this schedule?",
        id: "jKnh1I",
      })}
      buttons={[
        {
          text: intl.formatMessage({
            defaultMessage: "No, Cancel",
            id: "tjhcV3",
          }),
          role: "cancel",
          handler: closeAlertCallback,
        },
        {
          text: intl.formatMessage({
            defaultMessage: "Yes, Delete",
            id: "QEmYhz",
          }),
          handler: onDeleteSchedule,
        },
      ]}
    />
  );
};

export default DeleteScheduleAlert;
