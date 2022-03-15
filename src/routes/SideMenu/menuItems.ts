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

interface IMenuItem {
  title: string;
  link: string;
  icon: IconDefinition;
}

export const MenuItemList: IMenuItem[] = [
  {
    title: "routes.SideMenu.Home",
    link: "/tabs/today",
    icon: faHome,
  },
  {
    title: "routes.SideMenu.Recipes",
    link: "/recipes",
    icon: faHamburger,
  },
  {
    title: "routes.SideMenu.Ingredients",
    link: "/ingredients",
    icon: faCarrot,
  },
  {
    title: "routes.SideMenu.Schedule",
    link: "/schedule",
    icon: faClock,
  },
  {
    title: "routes.SideMenu.Profile",
    link: "/profile",
    icon: faUser,
  },
  {
    title: "routes.SideMenu.Configuration",
    link: "/config",
    icon: faCog,
  },
  {
    title: "routes.SideMenu.Logout",
    link: "/logout",
    icon: faSignOutAlt,
  },
];
