import {
  faCarrot,
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
    title: "Inicio",
    link: "/tabs/today",
    icon: faHome,
  },
  {
    title: "Recetas",
    link: "/recipes",
    icon: faHamburger,
  },
  {
    title: "Ingredientes",
    link: "/ingredients",
    icon: faCarrot,
  },
  {
    title: "Perfil",
    link: "/profile",
    icon: faUser,
  },
  {
    title: "Configuración",
    link: "/config",
    icon: faCog,
  },
  {
    title: "Cerrar sesión",
    link: "/logout",
    icon: faSignOutAlt,
  },
];
