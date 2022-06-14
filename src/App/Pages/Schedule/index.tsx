import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonPage,
} from "@ionic/react";
import LoadingSpinner from "app/components/LoadingSpinner";
import TopBar from "app/components/TopBar";
import { add } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ISchedule } from "lib/interfaces";

import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import {
  getSchedules,
  selectIsLoadingSchedules,
  selectSchedules,
} from "lib/store/schedulesSlice";
import ScheduleItem from "app/components/ScheduleItem";
import {
  NoItemsList,
  NoItemsText,
} from "app/components/SharedStyledComponents";
import SchedulesModal from "app/pages/Schedule/schedulesModal";

const Ingredients: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedSchedule, setSelectedSchedule] = useState<ISchedule>();

  const schedules = useAppSelector(selectSchedules);
  const isLoading = useAppSelector(selectIsLoadingSchedules);

  const onEditSchedule = (sch: ISchedule) => {
    setSelectedSchedule(sch);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSchedule(undefined);
  };

  const intl = useIntl();

  return (
    <IonPage>
      <SchedulesModal
        isOpen={isModalOpen}
        selectedSchedule={selectedSchedule}
        closeCallback={onCloseModal}
      />
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
