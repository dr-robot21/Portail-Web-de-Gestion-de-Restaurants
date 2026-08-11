import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosSettings, IoMdRestaurant } from "react-icons/io";
import { FaUsersCog } from "react-icons/fa";
import { MdOutlineMenuBook, MdOutlineNotificationsNone, MdOutlineRestaurantMenu } from "react-icons/md";

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
      label: "Plats",
      path: "/menu/plats",
      icon: <MdOutlineRestaurantMenu />,
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
