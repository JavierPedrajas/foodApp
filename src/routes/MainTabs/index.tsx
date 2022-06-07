import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  NavContext,
} from "@ionic/react";
import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { listRoute, scheduleRoute, todayRoute } from "..";
import TodayPage from "../../App/Pages/Today";
import CalendarPage from "../../App/Pages/Calendar";

import ListPage from "../../App/Pages/List";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarWeek,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";
import CalendarToday from "../../App/Components/CalendarToday";

const MainTabs: React.FC = () => {
  const { navigate, routeInfo } = useContext(NavContext);

  return (
    <IonTabs className="tabs">
      <IonRouterOutlet>
        <Route path={todayRoute} component={TodayPage} exact={true} />
        <Route path={scheduleRoute} component={CalendarPage} exact={true} />
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
