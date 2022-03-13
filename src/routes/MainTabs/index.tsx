import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
  NavContext,
} from "@ionic/react";
import React, { useContext } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
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
  const { navigate, routeInfo } = useContext(NavContext);

  return (
    <IonTabs className="tabs">
      <IonRouterOutlet>
        <Route path={todayRoute} component={TodayPage} exact={true} />
        <Route path={scheduleRoute} component={SchedulePage} exact={true} />
        <Route path={listRoute} component={ListPage} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" className="tabs__tabBar">
        <IonTabButton tab="today" selected={routeInfo?.pathname === todayRoute}>
          <div
            className="tabs__tabBar__icon-container"
            onClick={() => {
              navigate(todayRoute);
            }}
          >
            <CalendarToday />
          </div>
        </IonTabButton>

        <IonTabButton
          tab="schedule"
          selected={routeInfo?.pathname === scheduleRoute}
        >
          <div
            className="tabs__tabBar__icon-container"
            onClick={() => {
              navigate(scheduleRoute);
            }}
          >
            <FontAwesomeIcon icon={faCalendarWeek} size="3x" />
          </div>
        </IonTabButton>
        <IonTabButton tab="list" selected={routeInfo?.pathname === listRoute}>
          <div
            className="tabs__tabBar__icon-container"
            onClick={() => {
              navigate(listRoute);
            }}
          >
            <FontAwesomeIcon icon={faShoppingBasket} size="3x" />
          </div>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
