import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuperAdminDashboard } from '../../../store/slices/dashboardSlice';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import './SuperAdminDashboard.css';

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stats, recentRestaurants, recentUsers, loading } = useSelector(state => state.dashboard);

  useEffect(() => {
    dispatch(fetchSuperAdminDashboard());
  }, [dispatch]);

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

  const BuildingIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  );

  const PlusIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  );

  const UsersIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
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
    <div className="sad-page">
      {/* Page Header */}
      <div className="sad-header">
        <h1 className="sad-title">Vue d'ensemble</h1>
        <p className="sad-subtitle">Aperçu des performances du portail</p>
      </div>

      {loading && !stats ? (
        <div style={{ padding: 'var(--spacing-8)', textAlign: 'center' }}>Chargement du tableau de bord...</div>
      ) : (
        <>
          {/* Top 3 Metric Cards */}
          <div className="sad-metrics-row">
            <Card className="sad-metric-card">
              <div className="sad-metric-top">
                <span className="sad-metric-label">RESTAURANTS</span>
                <span className="sad-metric-icon-red">{BuildingIcon}</span>
              </div>
              <div className="sad-metric-value-row">
                <span className="sad-metric-value">{stats?.total_restaurants ?? '—'}</span>
                <span className="sad-metric-badge-green">+{stats?.new_restaurants_this_month ?? 0} ce mois</span>
              </div>
              <div className="sad-metric-desc">Total des restaurants</div>
            </Card>

            <Card className="sad-metric-card">
              <div className="sad-metric-top">
                <span className="sad-metric-label">UTILISATEURS</span>
                <span className="sad-metric-icon-red">{BadgeIcon}</span>
              </div>
              <div className="sad-metric-value-row">
                <span className="sad-metric-value">{stats?.total_users ?? '—'}</span>
                <span className="sad-metric-subtext">{stats?.active_users ?? 0} actifs</span>
              </div>
              <div className="sad-metric-desc">Comptes utilisateurs</div>
            </Card>

            <Card className="sad-metric-card">
              <div className="sad-metric-top">
                <span className="sad-metric-label">PLATS AU MENU</span>
                <span className="sad-metric-icon-red">{CutleryIcon}</span>
              </div>
              <div className="sad-metric-value-row">
                <span className="sad-metric-value">{stats?.total_dishes ?? '—'}</span>
                <span className="sad-metric-subtext">{stats?.active_dishes ?? 0} actifs</span>
              </div>
              <div className="sad-metric-desc">Total des plats référencés</div>
            </Card>
          </div>

          {/* Main 2-column grid */}
          <div className="sad-main-grid">
            {/* Left column */}
            <div className="sad-left-col">

              {/* Quick Management */}
              <div className="sad-section">
                <h2 className="sad-section-title">Actions Rapides</h2>
                <Card className="sad-quick-card">
                  <div className="sad-quick-grid">
                    <button className="sad-quick-btn sad-quick-btn--primary" onClick={() => navigate('/restaurants/add')}>
                      <div className="sad-quick-icon">{PlusIcon}</div>
                      <span>Ajouter un Restaurant</span>
                    </button>
                    <button className="sad-quick-btn" onClick={() => navigate('/users/add')}>
                      <div className="sad-quick-icon">{UsersIcon}</div>
                      <span>Créer un Utilisateur</span>
                    </button>
                    <button className="sad-quick-btn" onClick={() => navigate('/restaurants')}>
                      <div className="sad-quick-icon">{BuildingIcon}</div>
                      <span>Voir les Restaurants</span>
                    </button>
                    <button className="sad-quick-btn" onClick={() => navigate('/users')}>
                      <div className="sad-quick-icon">{ChartIcon}</div>
                      <span>Gérer les Utilisateurs</span>
                    </button>
                  </div>
                </Card>
              </div>

              {/* Recent Restaurants */}
              <div className="sad-section">
                <div className="sad-section-header">
                  <h2 className="sad-section-title" style={{ margin: 0 }}>Restaurants Récents</h2>
                  <button className="sad-view-all" onClick={() => navigate('/restaurants')}>Voir tout</button>
                </div>
                <Card className="sad-table-card">
                  <table className="sad-table">
                    <thead>
                      <tr>
                        <th>NOM</th>
                        <th>VILLE</th>
                        <th>PLATS</th>
                        <th>STATUT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentRestaurants.length === 0 ? (
                        <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: 'var(--spacing-6)' }}>Aucun restaurant trouvé</td></tr>
                      ) : recentRestaurants.map(r => (
                        <tr key={r.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/restaurants/${r.id}`)}>
                          <td className="sad-td-name">{r.name}</td>
                          <td>{r.city || '—'}</td>
                          <td>{r.dishes_count ?? 0}</td>
                          <td>
                            <Badge
                              variant={r.is_active ? 'success' : 'default'}
                              className={`sad-badge sad-badge--${r.is_active ? 'success' : 'default'}`}
                            >
                              {r.is_active ? 'ACTIF' : 'INACTIF'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              </div>

            </div>

            {/* Right column — Recent Users */}
            <div className="sad-right-col">
              <Card className="sad-floor-card">
                <h2 className="sad-section-title">Utilisateurs Récents</h2>
                <div className="sad-staff-list">
                  {recentUsers.length === 0 ? (
                    <div style={{ color: 'var(--text-secondary)', padding: 'var(--spacing-4)', textAlign: 'center' }}>Aucun utilisateur</div>
                  ) : recentUsers.map(u => (
                    <div key={u.id} className="sad-staff-item" style={{ cursor: 'pointer' }} onClick={() => navigate(`/users/${u.id}`)}>
                      <div className="sad-staff-avatar">{UserIcon}</div>
                      <div className="sad-staff-info">
                        <div className="sad-staff-name">{u.name}</div>
                        <div className="sad-staff-role">{u.role === 'super_admin' ? 'Super Admin' : 'Administrateur Restaurant'}</div>
                      </div>
                      <div className={`sad-status-dot sad-status-dot--${u.is_active ? 'online' : 'away'}`} />
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  fullWidth
                  style={{ marginTop: 'var(--spacing-6)', color: 'var(--text-primary)' }}
                  onClick={() => navigate('/users')}
                >
                  Gérer tous les utilisateurs
                </Button>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SuperAdminDashboard;