import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosSettings , IoMdRestaurant  } from "react-icons/io";
import { FaUsersCog } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";

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
      icon:<IoMdRestaurant />,
    },
    {
      label: "Utilisateurs",
      path: "/users",
      icon: <FaUsersCog />,
    },
    {
      label: "Parametres",
      path: "/settingd",
      icon: <IoIosSettings />,
    },
  ],

  RESTAURANT_ADMIN: [],
};
