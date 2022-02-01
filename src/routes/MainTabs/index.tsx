import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import React from "react";
import { Route } from "react-router";
import { listRoute, scheduleRoute, todayRoute } from "..";
import TodayPage from "../../pages/Today";
import SchedulePage from "../../pages/Schedule";

import { calendar, restaurant, list } from "ionicons/icons";
import ListPage from "../../pages/List";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarWeek,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";
import CalendarToday from "../../components/CalendarToday";

const MainTabs: React.FC = () => {
  return (
    <IonTabs className="tabs">
      <IonRouterOutlet>
        <Route path={todayRoute} component={TodayPage} exact={true} />
        <Route path={scheduleRoute} component={SchedulePage} exact={true} />
        <Route path={listRoute} component={ListPage} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" className="tabs__tabBar">
        <IonTabButton tab="tab1" href={todayRoute}>
          {/* <FontAwesomeIcon icon={faCalendar} /> */}
          {/* <IonIcon icon={} /> */}
          <CalendarToday />
          {/* <IonLabel>Hoy</IonLabel> */}
        </IonTabButton>
        <IonTabButton tab="tab2" href={scheduleRoute}>
          <FontAwesomeIcon icon={faCalendarWeek} size="3x" />
        </IonTabButton>
        <IonTabButton tab="tab3" href={listRoute}>
          <FontAwesomeIcon icon={faShoppingBasket} size="3x" />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
