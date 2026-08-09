import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import './RestaurantAdminDashboard.css';

const RestaurantAdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get('/dashboard/restaurant');
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

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

  const ChartIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  );

  if (loading) return <div style={{ padding: 'var(--spacing-6)' }}>Chargement du tableau de bord...</div>;
  if (error) return <div style={{ padding: 'var(--spacing-6)', color: 'var(--error-text)' }}>{error}</div>;
  if (!data) return null;

  return (
    <div className="restaurant-dashboard-page">
      <div className="restaurant-dashboard-header">
        <h1 className="restaurant-dashboard-title">Vue d'ensemble</h1>
        <p className="restaurant-dashboard-subtitle">Aperçu des performances de {data.restaurant?.name}</p>
      </div>

      <div className="restaurant-dashboard-top-metrics">
        <Card className="metric-card">
          <div className="metric-header">
            <span className="metric-label">STATUS DU MENU</span>
            <span style={{ color: 'var(--error-text)' }}>{CutleryIcon}</span>
          </div>
          <div className="metric-value-row">
            <span className="metric-value">{data.stats?.total_dishes || 0}</span>
            <span className="metric-subtext metric-subtext--success">{data.stats?.active_dishes || 0} actifs</span>
          </div>
          <div className="metric-desc">Plats totaux dans le menu</div>
        </Card>

        <Card className="metric-card">
          <div className="metric-header">
            <span className="metric-label">CATÉGORIES</span>
            <span style={{ color: 'var(--error-text)' }}>{BadgeIcon}</span>
          </div>
          <div className="metric-value-row">
            <span className="metric-value">{data.stats?.total_categories || 0}</span>
            <span className="metric-subtext">Sections</span>
          </div>
          <div className="metric-desc">Catégories du menu</div>
        </Card>

        <Card className="metric-card metric-card--status">
          <div className="metric-header">
            <span className="metric-label">STATUT OPÉRATIONNEL</span>
            <span>{CheckCircleIcon}</span>
          </div>
          <div className="metric-value-row">
            <span className="metric-value">{data.restaurant?.is_active ? 'ACTIF' : 'INACTIF'}</span>
          </div>
          <div className="metric-desc">Statut du restaurant</div>
        </Card>
      </div>

      <div className="restaurant-dashboard-content">

          <div className="quick-management-section">
            <h2 className="section-title">Actions Rapides</h2>
            <div className="quick-management-grid">
              <button className="quick-btn quick-btn--primary" onClick={() => navigate('/menu/add')}>
                <div className="quick-btn-icon">{PlusIcon}</div>
                <span>Ajouter un Plat</span>
              </button>
              <button className="quick-btn" onClick={() => navigate('/menu')}>
                <div className="quick-btn-icon">{EditMenuIcon}</div>
                <span>Gérer le Menu</span>
              </button>
              <button className="quick-btn" onClick={() => navigate('/menu')}>
                <div className="quick-btn-icon">{BadgeIcon}</div>
                <span>Gérer les Catégories</span>
              </button>
              <button className="quick-btn" onClick={() => navigate('/menu/plats')}>
                <div className="quick-btn-icon">{ChartIcon}</div>
                <span>Gérer les Plats</span>
              </button>
            </div>
          </div>

          <div className="menu-performance-section">
            <div className="section-header-flex">
              <h2 className="section-title" style={{ margin: 0 }}>Plats Récents</h2>
              <button className="view-all-link" onClick={() => navigate('/menu')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Voir tous les plats
              </button>
            </div>
            <Card className="menu-performance-card">
              {data.top_dishes && data.top_dishes.length > 0 ? (
                <table className="performance-table">
                  <thead>
                    <tr>
                      <th>NOM DU PLAT</th>
                      <th>CATÉGORIE</th>
                      <th>PRIX</th>
                      <th>STATUT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.top_dishes.map(dish => (
                      <tr key={dish.id}>
                        <td style={{ fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)' }}>{dish.name}</td>
                        <td>{dish.category?.name || '-'}</td>
                        <td style={{ fontWeight: 'var(--weight-bold)', color: 'var(--error-text)' }}>{dish.price} €</td>
                        <td>
                          {dish.is_active ? (
                            <Badge variant="success" className="perf-badge perf-badge--success">
                              Disponible
                            </Badge>
                          ) : (
                            <Badge variant="warning" className="perf-badge perf-badge--warning">
                              Indisponible
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ padding: 'var(--spacing-4)', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  Aucun plat trouvé.
                </div>
              )}
            </Card>
          </div>

      </div>
    </div>
  );
};

export default RestaurantAdminDashboard;