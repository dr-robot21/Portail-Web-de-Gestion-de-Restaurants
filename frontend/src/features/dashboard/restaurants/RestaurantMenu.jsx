import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurant, clearCurrentRestaurant } from '../../../store/slices/restaurantsSlice';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Card from '../../../components/ui/Card';
import './RestaurantMenu.css';

const RestaurantMenu = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { current: restaurant, loading } = useSelector(state => state.restaurants);

  useEffect(() => {
    if (id) {
      dispatch(fetchRestaurant(id));
    }
    return () => {
      dispatch(clearCurrentRestaurant());
    };
  }, [dispatch, id]);

  const EditIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  );

  if (loading || !restaurant) {
    return <div style={{ padding: 'var(--spacing-6)' }}>Chargement du menu...</div>;
  }

  const categories = restaurant.categories || [];

  return (
    <div className="restaurant-menu-page">
      <div className="restaurant-menu-header">
        <div>
          <h1 className="restaurant-menu-title">Menu du Restaurant</h1>
          <p className="restaurant-menu-subtitle">Aperçu de la structure du menu pour {restaurant.name}.</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
          <Button variant="outline" onClick={() => navigate(`/menu?restaurant=${restaurant.id}`)}>
            Gérer les catégories
          </Button>
          <Button variant="primary" style={{ backgroundColor: 'var(--error-text)', borderColor: 'var(--error-text)' }} onClick={() => navigate(`/menu/plats?restaurant=${restaurant.id}`)}>
            Gérer les plats
          </Button>
        </div>
      </div>

      <div className="restaurant-menu-restaurant-section">
        <h2 className="restaurant-menu-section-label">Restaurant</h2>
        <Card className="restaurant-menu-restaurant-card">
          <div className="restaurant-menu-restaurant-info">
            <div className="restaurant-menu-restaurant-logo">
              {restaurant.logo_url ? (
                <img src={restaurant.logo_url} alt={restaurant.name} />
              ) : (
                <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                  {restaurant.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="restaurant-menu-restaurant-tags">
                <span className="restaurant-menu-id-badge">#RES-{restaurant.id.toString().padStart(3, '0')}</span>
                <Badge variant={restaurant.is_active ? "success" : "default"} showDot={false}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: restaurant.is_active ? '#22c55e' : '#94a3b8', display: 'inline-block', marginRight: '4px' }}></span>
                  {restaurant.is_active ? 'Actif' : 'Inactif'}
                </Badge>
              </div>
              <h3 className="restaurant-menu-restaurant-name">{restaurant.name}</h3>
              <div className="restaurant-menu-restaurant-location">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                {restaurant.city}
              </div>
            </div>
          </div>
          <Button variant="outline" style={{ color: 'var(--text-secondary)' }} onClick={() => navigate(`/restaurants/edit/${restaurant.id}`)}>
            {EditIcon} Modifier
          </Button>
        </Card>
      </div>

      <div className="restaurant-menu-sections">
        {categories.length === 0 ? (
           <div style={{ textAlign: 'center', padding: 'var(--spacing-8)', color: 'var(--text-secondary)' }}>
             Aucun menu configuré pour ce restaurant.
           </div>
        ) : (
          categories.map((category) => (
            <Card key={category.id} className="restaurant-menu-section-card">
              <div className="restaurant-menu-section-header">
                <div className="restaurant-menu-section-title-wrap">
                  <div style={{ fontSize: '20px' }}>{category.icon || '🍽️'}</div>
                  <h3 className="restaurant-menu-section-title">{category.name}</h3>
                </div>
              </div>

              {category.dishes && category.dishes.length > 0 ? (
                <div className="restaurant-menu-table">
                  <div className="restaurant-menu-th-row">
                    <div className="restaurant-menu-th" style={{ flex: 2 }}>PLAT</div>
                    <div className="restaurant-menu-th" style={{ flex: 1 }}>PRIX</div>
                    <div className="restaurant-menu-th" style={{ flex: 1 }}>STATUT</div>
                    <div className="restaurant-menu-th" style={{ flex: 1, textAlign: 'right' }}>ACTIONS</div>
                  </div>
                  {category.dishes.map(dish => (
                    <div key={dish.id} className="restaurant-menu-tr">
                      <div className="restaurant-menu-td" style={{ flex: 2 }}>
                        <div className="restaurant-menu-dish-info">
                          {dish.image_url ? (
                             <img src={dish.image_url} alt={dish.name} className="restaurant-menu-dish-img" />
                          ) : (
                             <div className="restaurant-menu-dish-img" style={{ backgroundColor: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                               🍽️
                             </div>
                          )}
                          <span className="restaurant-menu-dish-name">{dish.name}</span>
                        </div>
                      </div>
                      <div className="restaurant-menu-td" style={{ flex: 1 }}>
                        <span className="restaurant-menu-dish-price">{dish.price} MAD</span>
                      </div>
                      <div className="restaurant-menu-td" style={{ flex: 1 }}>
                        {dish.is_active ? (
                          <Badge variant="success" showDot={false} style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block', marginRight: '4px' }}></span>
                            Disponible
                          </Badge>
                        ) : (
                          <Badge variant="warning" showDot={false} style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block', marginRight: '4px' }}></span>
                            Indisponible
                          </Badge>
                        )}
                      </div>
                      <div className="restaurant-menu-td restaurant-menu-td-actions" style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <button className="restaurant-menu-action-btn" onClick={() => navigate(`/menu/edit/${dish.id}?restaurant=${restaurant.id}`)}>{EditIcon}</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: 'var(--spacing-4)', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  Aucun plat dans cette catégorie.
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
