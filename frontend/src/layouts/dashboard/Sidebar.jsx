import PrimaryButton from "../../components/common/PrimaryButton/PrimaryButton";
import styles from "./sidebar.module.css";
import { HiPlus } from "react-icons/hi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdOutlineAdd } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { MENU_LIST } from "./menuConfig";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const role = "super_admin";
  const navList =
    role === "super_admin" ? MENU_LIST.SUPER_ADMIN : MENU_LIST.RESTAURANT_ADMIN;
  return (
    <aside className={styles.sidebar}>
      <div className={styles.container}>
        <div className={styles.sidebarHeader}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <img src="https://picsum.photos/300/200" alt="user image" />
            </div>
            <div className={styles.userInfos}>
              <h2 className={styles.userName}>Zakaria Chargaoui</h2>
              <p className={styles.userRole}>Super admin</p>
            </div>
          </div>
        </div>

        <div className={styles.sidebarActions}>
          <PrimaryButton
            icon={
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 6H0V4.5H4.5V0H6V4.5H10.5V6H6V10.5H4.5V6V6"
                  fill="white"
                />
              </svg>
            }
            content={"Ajouter un restaurant"}
          />
        </div>

        <div className={styles.sidebarMenu}>
          <nav className={styles.listContainer}>
            {navList.map((link , index) => (
              <NavLink
                to={link.path}
                key={index}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                {link.icon}
                <span className={styles.label}>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className={styles.sidebarFooter}>
          <NavLink className={styles.navLink}>
            <IoMdHelpCircleOutline />
            <span className={styles.label}>Help Center</span>
          </NavLink>

          <button className={styles.logout}>
            <FiLogOut />
            <span className={styles.label}>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
