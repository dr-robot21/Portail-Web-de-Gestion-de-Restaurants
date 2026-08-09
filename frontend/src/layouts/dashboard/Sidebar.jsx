import PrimaryButton from "../../components/common/PrimaryButton/PrimaryButton";
import styles from "./sidebar.module.css";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { MENU_LIST } from "./menuConfig";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const role = user?.role || "restaurant_admin";
  const navList =
    role === "super_admin" ? MENU_LIST.SUPER_ADMIN : MENU_LIST.RESTAURANT_ADMIN;

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.container}>
        <div className={styles.sidebarHeader}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <img src={user?.avatar_url || user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=b91c1c&color=fff`} alt="user image" />
            </div>
            <div className={styles.userInfos}>
              <h2 className={styles.userName}>{user?.name || 'Utilisateur'}</h2>
              <p className={styles.userRole}>{role === 'super_admin' ? 'Super admin' : 'Admin Restaurant'}</p>
            </div>
          </div>
        </div>

        {role === "super_admin" && (
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
              onClick={() => navigate('/restaurants/add')}
            />
          </div>
        )}

        <div className={styles.sidebarMenu}>
          <nav className={styles.listContainer}>
            {navList.map((link, index) => (
              <NavLink
                to={link.path}
                key={index}
                end={link.path === "/dashboard" || link.path === "/restaurant-dashboard"}
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
          <NavLink to="/help" className={styles.navLink}>
            <IoMdHelpCircleOutline />
            <span className={styles.label}>Help Center</span>
          </NavLink>

          <button className={styles.logout} onClick={handleLogout}>
            <FiLogOut />
            <span className={styles.label}>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
