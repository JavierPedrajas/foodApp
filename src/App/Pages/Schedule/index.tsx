import {
  IonAlert,
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
} from "@ionic/react";
import LoadingSpinner from "app/components/LoadingSpinner";
import ModalWrapper from "app/components/ModalWrapper";
import TopBar from "app/components/TopBar";
import { add } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { IIngredient, ISchedule, ITime } from "lib/interfaces";
import {
  getIngredients,
  addIngredient,
  deleteIngredient,
  updateIngredient,
} from "lib/store/ingredientsSlice";
import "./styles.scss";

import { v4 as uuidv4 } from "uuid";
import IngredientItem from "app/components/IngredientItem";
import { useFormatMessage } from "langs/utils";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import {
  addSchedule,
  deleteSchedule,
  getSchedules,
  selectIsLoadingSchedules,
  selectSchedules,
  updateSchedule,
} from "lib/store/schedulesSlice";
import ScheduleItem from "app/components/ScheduleItem";

const Ingredients: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [scheduleName, setScheduleName] = useState<string>("");
  const [scheduleTime, setScheduleTime] = useState<ITime>({
    hours: 0,
    minutes: 0,
  });
  const [selectedSchedule, setSelectedSchedule] = useState<ISchedule>();

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const dispatch = useAppDispatch();
  const schedules = useAppSelector(selectSchedules);
  const isLoading = useAppSelector(selectIsLoadingSchedules);

  const fetchSchedules = async () => {
    await dispatch(getSchedules());
  };

  const onAddSchedule = async () => {
    if (scheduleName !== "") {
      const newSchedule: ISchedule = {
        name: scheduleName,
        time: scheduleTime,
        id: uuidv4(),
      };
      await dispatch(addSchedule(newSchedule));
    }
    onCloseModal();
  };

  const onEditSchedule = (sch: ISchedule) => {
    setSelectedSchedule(sch);
    setScheduleName(sch.name);
    setScheduleTime(sch.time);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setScheduleName("");
    setScheduleTime({ hours: 0, minutes: 0 });
    setSelectedSchedule(undefined);
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
    onCloseModal();
  };

  const onClickDelete = () => {
    setIsDeleteAlertOpen(true);
  };

  const onDeleteSchedule = async () => {
    if (selectedSchedule) {
      await dispatch(deleteSchedule(selectedSchedule));
    }
    onCloseModal();
  };

  useEffect(() => {
    if (!Object.keys(schedules).length) {
      fetchSchedules();
    }
  }, [schedules]);

  return (
    <IonPage>
      <IonModal isOpen={isModalOpen}>
        <ModalWrapper
          title={useFormatMessage("routes.SideMenu.Schedule")}
          buttonText={useFormatMessage(
            selectedSchedule
              ? "pages.Ingredients.Modal.Update"
              : "pages.Ingredients.Modal.Add"
          )}
          onHandleClose={onCloseModal}
          onHandleAdd={selectedSchedule ? onUpdateSchedule : onAddSchedule}
          isDisabled={scheduleName === ""}
          deleteButton={
            selectedSchedule ? (
              <IonButton onClick={onClickDelete} fill="outline">
                <FormattedMessage id={"pages.Ingredients.Modal.Delete"} />
              </IonButton>
            ) : undefined
          }
        >
          <IonItem>
            <IonLabel position="floating" color="primary">
              <FormattedMessage defaultMessage="Name" id="ScheduleName" />
            </IonLabel>
            <IonInput
              color="light"
              value={scheduleName}
              type="text"
              onIonChange={(e) => setScheduleName(e.detail.value as string)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating" color="primary">
              <FormattedMessage defaultMessage="Time" id="ScheduleTime" />
            </IonLabel>
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
          <IonAlert
            isOpen={isDeleteAlertOpen}
            onDidDismiss={() => setIsDeleteAlertOpen(false)}
            cssClass={"my-custom-select"}
            subHeader={useFormatMessage(
              "pages.Ingredients.Modal.DeleteConfirm"
            )}
            buttons={[
              {
                text: useFormatMessage("modal.buttons.Cancel"),
                role: "cancel",
                handler: () => setIsDeleteAlertOpen(false),
              },
              {
                text: useFormatMessage("modal.buttons.Confirm"),
                handler: onDeleteSchedule,
              },
            ]}
          />
        </ModalWrapper>
      </IonModal>
      <LoadingSpinner open={isLoading} />
      <TopBar title="routes.SideMenu.Schedules" />
      <IonContent fullscreen className="ingredients">
        {Object.keys(schedules).length > 0 ? (
          <>
            <IonList>
              {Object.values(schedules).map((sch) => (
                <ScheduleItem
                  key={sch.id}
                  schedule={sch}
                  onHandleEdit={onEditSchedule}
                />
              ))}
            </IonList>
            <IonFab
              vertical="bottom"
              horizontal="end"
              slot="fixed"
              onClick={() => setIsModalOpen(true)}
              // className={"custom-fab"}
            >
              <IonFabButton>
                <IonIcon icon={add} />
              </IonFabButton>
            </IonFab>
          </>
        ) : (
          <div className="ingredients__noList">
            {!isLoading && (
              <>
                <div className="ingredients__noList__text">
                  <FormattedMessage id={"pages.Ingredients.NoIngredients"} />
                </div>
                <div className="ingredients__noList__text">
                  <FormattedMessage id={"pages.Ingredients.PressHereToAdd"} />
                </div>

                <IonFab
                  horizontal="center"
                  onClick={() => setIsModalOpen(true)}
                >
                  <IonFabButton>
                    <IonIcon icon={add} />
                  </IonFabButton>
                </IonFab>
              </>
            )}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Ingredients;
