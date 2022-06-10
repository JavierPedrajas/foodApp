import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  NavContext,
} from "@ionic/react";
import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { groceriesRoute, scheduleRoute, todayRoute } from "..";
import TodayPage from "../../app/pages/Today";
import CalendarPage from "../../app/pages/Calendar";

import GroceriesPage from "../../app/pages/Groceries";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarWeek,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";
import CalendarToday from "../../app/components/CalendarToday";
import styled from "styled-components";

const MainTabs: React.FC = () => {
  const { navigate, routeInfo } = useContext(NavContext);

  return (
    // can't replace with styled-components
    <IonTabs className="tabs">
      <IonRouterOutlet>
        <Route path={todayRoute} component={TodayPage} exact={true} />
        <Route path={scheduleRoute} component={CalendarPage} exact={true} />
        <Route path={groceriesRoute} component={GroceriesPage} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" className="tabs__tabBar">
        <IonTabButton tab="today" selected={routeInfo?.pathname === todayRoute}>
          <TabsIconContainer
            onClick={() => {
              navigate(todayRoute);
            }}
          >
            <CalendarToday />
          </TabsIconContainer>
        </IonTabButton>

        <IonTabButton
          tab="schedule"
          selected={routeInfo?.pathname === scheduleRoute}
        >
          <TabsIconContainer
            onClick={() => {
              navigate(scheduleRoute);
            }}
          >
            <FontAwesomeIcon icon={faCalendarWeek} size="3x" />
          </TabsIconContainer>
        </IonTabButton>
        <IonTabButton
          tab="list"
          selected={routeInfo?.pathname === groceriesRoute}
        >
          <TabsIconContainer
            onClick={() => {
              navigate(groceriesRoute);
            }}
          >
            <FontAwesomeIcon icon={faShoppingBasket} size="3x" />
          </TabsIconContainer>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;

const TabsIconContainer = styled.div`
  width: 120%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
