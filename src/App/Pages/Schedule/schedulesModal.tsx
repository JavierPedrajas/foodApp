import { IonModal, IonButton, IonItem, IonLabel, IonInput } from "@ionic/react";
import CustomInputLabel from "app/components/CustomInputLabel";
import ModalWrapper from "app/components/ModalWrapper";
import DeleteScheduleAlert from "app/pages/Schedule/deleteScheduleAlert";
import { useAppDispatch } from "lib/hooks/store";
import { ISchedule, ITime } from "lib/interfaces";
import { addSchedule, updateSchedule } from "lib/store/schedulesSlice";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { v4 as uuidv4 } from "uuid";

interface ISchedulesModal {
  isOpen: boolean;
  selectedSchedule?: ISchedule;
  closeCallback: () => void;
}

const SchedulesModal: React.FC<ISchedulesModal> = ({
  isOpen,
  selectedSchedule,
  closeCallback,
}) => {
  const [scheduleName, setScheduleName] = useState<string>("");
  const [scheduleTime, setScheduleTime] = useState<ITime>({
    hours: 0,
    minutes: 0,
  });

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const intl = useIntl();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedSchedule) {
      setScheduleTime(selectedSchedule.time);
      setScheduleName(selectedSchedule.name);
    } else {
      setScheduleTime({ hours: 0, minutes: 0 });
      setScheduleName("");
    }
  }, [selectedSchedule, isOpen]);

  const onAddSchedule = async () => {
    if (scheduleName !== "") {
      const newSchedule: ISchedule = {
        name: scheduleName,
        time: scheduleTime,
        id: uuidv4(),
      };
      await dispatch(addSchedule(newSchedule));
    }
    closeCallback();
  };

  const onUpdateSchedule = async () => {
    if (selectedSchedule && scheduleName !== "") {
      const newSchedule: ISchedule = {
        name: scheduleName,
        time: scheduleTime,
        id: selectedSchedule.id,
      };
      await dispatch(updateSchedule(newSchedule));
    }
    closeCallback();
  };

  const onClickDelete = () => {
    setIsDeleteAlertOpen(true);
  };

  return (
    <IonModal isOpen={isOpen}>
      <ModalWrapper
        title={intl.formatMessage({
          defaultMessage: "Schedule",
          id: "hGQqkW",
        })}
        buttonText={
          selectedSchedule
            ? intl.formatMessage({
                defaultMessage: "Update Schedule",
                id: "Lwte0+",
              })
            : intl.formatMessage({
                defaultMessage: "Add Schedule",
                id: "bqi8A+",
              })
        }
        onHandleClose={closeCallback}
        onHandleAdd={selectedSchedule ? onUpdateSchedule : onAddSchedule}
        isDisabled={scheduleName === ""}
        deleteButton={
          selectedSchedule ? (
            <IonButton onClick={onClickDelete} fill="outline">
              <FormattedMessage defaultMessage="Delete Schedule" id="XnBXRB" />
            </IonButton>
          ) : undefined
        }
      >
        <IonItem>
          <CustomInputLabel>
            <FormattedMessage defaultMessage="Name" id="HAlOn1" />
          </CustomInputLabel>
          <IonInput
            color="light"
            value={scheduleName}
            type="text"
            onIonChange={(e) => setScheduleName(e.detail.value as string)}
          />
        </IonItem>
        <IonItem>
          <CustomInputLabel>
            <FormattedMessage defaultMessage="Time" id="ug01Mk" />
          </CustomInputLabel>
          <IonInput
            color="light"
            value={`${scheduleTime.hours
              .toString()
              .padStart(2, "0")}:${scheduleTime.minutes
              .toString()
              .padStart(2, "0")}`}
            type="time"
            onIonChange={(e) => {
              console.log("e", e);
              if (!e.detail.value) {
                return;
              }

              const [hours, minutes] = e.detail.value.split(":");
              setScheduleTime({
                hours: +hours,
                minutes: +minutes,
              });
            }}
          />
        </IonItem>
        <DeleteScheduleAlert
          isOpen={isDeleteAlertOpen}
          closeAlertCallback={() => setIsDeleteAlertOpen(false)}
          closeModalCallback={closeCallback}
          selectedSchedule={selectedSchedule}
        />
      </ModalWrapper>
    </IonModal>
  );
};

export default SchedulesModal;
