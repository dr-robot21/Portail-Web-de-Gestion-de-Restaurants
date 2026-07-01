import React from 'react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import './RestaurantAdminDashboard.css';

const MOCK_MENU_PERFORMANCE = [
  { id: 1, name: 'Duck Confit Parmentier', category: 'Main Course', price: '€28.00', sales: 14, status: 'IN STOCK', statusVariant: 'success' },
  { id: 2, name: 'Truffle Risotto', category: 'Main Course', price: '€32.00', sales: 22, status: 'LOW STOCK', statusVariant: 'warning' },
  { id: 3, name: 'Escargot de Bourgogne', category: 'Appetizer', price: '€18.00', sales: 9, status: 'IN STOCK', statusVariant: 'success' },
];

const MOCK_STAFF = [
  { id: 1, name: 'Jean Dupont', role: 'Head Chef', status: 'online' },
  { id: 2, name: 'Marie Laurent', role: 'Floor Manager', status: 'online' },
  { id: 3, name: 'Luc Bernard', role: 'Sommelier', status: 'away' },
];

const RestaurantAdminDashboard = () => {
  const CutleryIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
      <path d="M7 2v20"></path>
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
    </svg>
  );

  const BadgeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="12" cy="10" r="3"></circle>
      <path d="M7 20v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2"></path>
    </svg>
  );

  const CheckCircleIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );

  const PlusIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  );

  const EditMenuIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
      <line x1="8" y1="14" x2="16" y2="14"></line>
      <line x1="8" y1="18" x2="12" y2="18"></line>
    </svg>
  );

  const ClockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );

  const ChartIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  );

  const UserIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  return (
    <div className="restaurant-dashboard-page">
      <div className="restaurant-dashboard-header">
        <h1 className="restaurant-dashboard-title">Vue d'ensemble</h1>
        <p className="restaurant-dashboard-subtitle">Aperçu des performances d'aujourd'hui</p>
      </div>

      <div className="restaurant-dashboard-top-metrics">
        <Card className="metric-card">
          <div className="metric-header">
            <span className="metric-label">MENU STATUS</span>
            <span style={{ color: 'var(--error-text)' }}>{CutleryIcon}</span>
          </div>
          <div className="metric-value-row">
            <span className="metric-value">42</span>
            <span className="metric-subtext metric-subtext--success">+3 new</span>
          </div>
          <div className="metric-desc">Total Dishes in Menu</div>
        </Card>

        <Card className="metric-card">
          <div className="metric-header">
            <span className="metric-label">PERSONNEL</span>
            <span style={{ color: 'var(--error-text)' }}>{BadgeIcon}</span>
          </div>
          <div className="metric-value-row">
            <span className="metric-value">18</span>
            <span className="metric-subtext">Active Now</span>
          </div>
          <div className="metric-desc">Staff Members On Duty</div>
        </Card>

        <Card className="metric-card metric-card--status">
          <div className="metric-header">
            <span className="metric-label">STATUT OPÉRATIONNEL</span>
            <span>{CheckCircleIcon}</span>
          </div>
          <div className="metric-value-row">
            <span className="metric-value">OUVERT</span>
          </div>
          <div className="metric-desc">Service du soir en cours</div>
        </Card>
      </div>

      <div className="restaurant-dashboard-main-grid">
        <div className="restaurant-dashboard-left-col">
          
          <div className="quick-management-section">
            <h2 className="section-title">Quick Management</h2>
            <div className="quick-management-grid">
              <button className="quick-btn quick-btn--primary">
                <div className="quick-btn-icon">{PlusIcon}</div>
                <span>Add New Dish</span>
              </button>
              <button className="quick-btn">
                <div className="quick-btn-icon">{EditMenuIcon}</div>
                <span>Edit Menu</span>
              </button>
              <button className="quick-btn">
                <div className="quick-btn-icon">{ClockIcon}</div>
                <span>Roster</span>
              </button>
              <button className="quick-btn">
                <div className="quick-btn-icon">{ChartIcon}</div>
                <span>Reports</span>
              </button>
            </div>
          </div>

          <div className="menu-performance-section">
            <div className="section-header-flex">
              <h2 className="section-title" style={{ margin: 0 }}>Menu Performance</h2>
              <a href="#" className="view-all-link">View All Dishes</a>
            </div>
            <Card className="menu-performance-card">
              <table className="performance-table">
                <thead>
                  <tr>
                    <th>DISH NAME</th>
                    <th>CATEGORY</th>
                    <th>PRICE</th>
                    <th>TODAY'S SALES</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_MENU_PERFORMANCE.map(dish => (
                    <tr key={dish.id}>
                      <td style={{ fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)' }}>{dish.name}</td>
                      <td>{dish.category}</td>
                      <td style={{ fontWeight: 'var(--weight-bold)', color: 'var(--error-text)' }}>{dish.price}</td>
                      <td>{dish.sales} Orders</td>
                      <td>
                        <Badge variant={dish.statusVariant} className={`perf-badge perf-badge--${dish.statusVariant}`}>
                          {dish.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

        </div>

        <div className="restaurant-dashboard-right-col">
          <Card className="floor-management-card">
            <h2 className="section-title">Floor Management</h2>
            <div className="floor-staff-list">
              {MOCK_STAFF.map(staff => (
                <div key={staff.id} className="floor-staff-item">
                  <div className="floor-staff-avatar">
                    {UserIcon}
                  </div>
                  <div className="floor-staff-info">
                    <div className="floor-staff-name">{staff.name}</div>
                    <div className="floor-staff-role">{staff.role}</div>
                  </div>
                  <div className={`floor-staff-status-dot floor-staff-status-dot--${staff.status}`}></div>
                </div>
              ))}
            </div>
            <Button variant="outline" fullWidth style={{ marginTop: 'var(--spacing-6)', color: 'var(--text-primary)' }}>
              Manage All Staff
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantAdminDashboard;