import {
  faCalendarCheck,
  faCarrot,
  faClock,
  faCog,
  faHamburger,
  faHome,
  faSignOutAlt,
  faUser,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

import { IntlShape } from "react-intl";

interface IMenuItem {
  title: string;
  link: string;
  icon: IconDefinition;
}

export const getMenuItemList = (intl: IntlShape): IMenuItem[] => {
  return [
    {
      title: intl.formatMessage({ defaultMessage: "Home", id: "ejEGdx" }),
      link: "/tabs/today",
      icon: faHome,
    },
    {
      title: intl.formatMessage({ defaultMessage: "Recipes", id: "RJ0Itf" }),
      link: "/recipes",
      icon: faHamburger,
    },
    {
      title: intl.formatMessage({
        defaultMessage: "Ingredients",
        id: "q+X++I",
      }),
      link: "/ingredients",
      icon: faCarrot,
    },
    {
      title: intl.formatMessage({ defaultMessage: "Schedule", id: "hGQqkW" }),
      link: "/schedule",
      icon: faClock,
    },
    {
      title: intl.formatMessage({ defaultMessage: "Profile", id: "itPgxd" }),
      link: "/profile",
      icon: faUser,
    },
    {
      title: intl.formatMessage({
        defaultMessage: "Configuration",
        id: "7OW8BT",
      }),
      link: "/config",
      icon: faCog,
    },
    {
      title: intl.formatMessage({ defaultMessage: "Logout", id: "C81/uG" }),
      link: "/logout",
      icon: faSignOutAlt,
    },
  ];
};
