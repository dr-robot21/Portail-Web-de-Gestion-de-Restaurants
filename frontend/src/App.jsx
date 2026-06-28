import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import SuperAdminDashboard from "./features/dashboard/super admin/SuperAdminDashboard";


function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />} >
        <Route path="/dashboard" element={<SuperAdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
