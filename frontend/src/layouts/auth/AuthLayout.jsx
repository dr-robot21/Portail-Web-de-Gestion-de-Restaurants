import { Outlet } from 'react-router-dom';
import Card from '../../components/ui/Card';
import './AuthLayout.css';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-layout-container">
        <Card className="auth-card">
          <Outlet />
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
