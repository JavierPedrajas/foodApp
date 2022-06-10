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
import { FormattedMessage, useIntl } from "react-intl";
import { ISchedule, ITime } from "lib/interfaces";

import { v4 as uuidv4 } from "uuid";
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
import {
  NoItemsList,
  NoItemsText,
} from "app/components/SharedStyledComponents";

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
  }, []);

  const intl = useIntl();

  return (
    <IonPage>
      <IonModal isOpen={isModalOpen}>
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
          onHandleClose={onCloseModal}
          onHandleAdd={selectedSchedule ? onUpdateSchedule : onAddSchedule}
          isDisabled={scheduleName === ""}
          deleteButton={
            selectedSchedule ? (
              <IonButton onClick={onClickDelete} fill="outline">
                <FormattedMessage
                  defaultMessage="Delete Schedule"
                  id="XnBXRB"
                />
              </IonButton>
            ) : undefined
          }
        >
          <IonItem>
            <IonLabel position="floating" color="primary">
              <FormattedMessage defaultMessage="Name" id="HAlOn1" />
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
              <FormattedMessage defaultMessage="Time" id="ug01Mk" />
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
                handler: () => setIsDeleteAlertOpen(false),
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
        </ModalWrapper>
      </IonModal>
      <LoadingSpinner open={isLoading} />
      <TopBar
        title={intl.formatMessage({
          defaultMessage: "Schedules",
          id: "F42bEw",
        })}
      />
      <IonContent fullscreen>
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
            >
              <IonFabButton>
                <IonIcon icon={add} />
              </IonFabButton>
            </IonFab>
          </>
        ) : (
          <NoItemsList>
            {!isLoading && (
              <>
                <NoItemsText>
                  <FormattedMessage
                    defaultMessage="There are no schedules added"
                    id="c64ibu"
                  />
                </NoItemsText>
                <NoItemsText>
                  <FormattedMessage
                    defaultMessage="Press here to add the first one!"
                    id="OfCP48"
                  />
                </NoItemsText>
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
          </NoItemsList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Ingredients;
