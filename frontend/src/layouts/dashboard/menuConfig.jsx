import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosSettings, IoMdRestaurant } from "react-icons/io";
import { FaUsersCog } from "react-icons/fa";
import { MdOutlineMenuBook, MdOutlineNotificationsNone, MdOutlineShoppingBag } from "react-icons/md";

export const MENU_LIST = {
  SUPER_ADMIN: [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LuLayoutDashboard />,
    },
    {
      label: "Restaurants",
      path: "/restaurants",
      icon: <IoMdRestaurant />,
    },
    {
      label: "Utilisateurs",
      path: "/users",
      icon: <FaUsersCog />,
    },
    {
      label: "Paramètres",
      path: "/settings",
      icon: <IoIosSettings />,
    },
  ],

  RESTAURANT_ADMIN: [
    {
      label: "Dashboard",
      path: "/restaurant-dashboard",
      icon: <LuLayoutDashboard />,
    },
    {
      label: "Menu",
      path: "/menu",
      icon: <MdOutlineMenuBook />,
    },
    {
      label: "Commandes",
      path: "/orders",
      icon: <MdOutlineShoppingBag />,
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: <MdOutlineNotificationsNone />,
    },
    {
      label: "Paramètres",
      path: "/settings",
      icon: <IoIosSettings />,
    },
  ],
};
