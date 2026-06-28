import { Outlet } from 'react-router-dom'
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./dashboard-layout.module.css";


function DashboardLayout() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Header />
        <main className={styles.content}>
            <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;