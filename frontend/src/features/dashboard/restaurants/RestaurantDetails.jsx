import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurant, clearCurrentRestaurant } from '../../../store/slices/restaurantsSlice';
import api from '../../../services/api';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Switch from '../../../components/ui/Switch';
import Modal from '../../../components/ui/Modal';
import SuccessModal from '../../../components/ui/SuccessModal';
import ErrorModal from '../../../components/ui/ErrorModal';
import './RestaurantDetails.css';

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { current: restaurant, loading } = useSelector(state => state.restaurants);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [togglingStatus, setTogglingStatus] = useState(false);
  const [successAction, setSuccessAction] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchRestaurant(id));
    }
    return () => {
      dispatch(clearCurrentRestaurant());
    };
  }, [dispatch, id]);

  const confirmDelete = async () => {
    try {
      await api.delete(`/restaurants/${id}`);
      setDeleteModalOpen(false);
      setSuccessAction('delete');
      setModalMessage('Restaurant supprimé avec succès.');
      setSuccessModalOpen(true);
    } catch (err) {
      setDeleteModalOpen(false);
      setModalMessage(err.response?.data?.message || 'Erreur lors de la suppression.');
      setErrorModalOpen(true);
    }
  };

  const handleToggleActive = async () => {
    if (!restaurant || togglingStatus) return;
    setTogglingStatus(true);
    try {
      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('is_active', restaurant.is_active ? '0' : '1');
      await api.post(`/restaurants/${restaurant.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      await dispatch(fetchRestaurant(restaurant.id));
      setSuccessAction('toggle');
      setModalMessage('Statut du restaurant mis à jour avec succès.');
      setSuccessModalOpen(true);
    } catch (err) {
      setModalMessage(err.response?.data?.message || 'Erreur lors de la mise à jour du statut.');
      setErrorModalOpen(true);
    } finally {
      setTogglingStatus(false);
    }
  };

  const ArrowLeftIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  );

  const EditIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  );

  const TrashIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  );

  const InfoIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );

  const ContactIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );

  const CutleryIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
      <path d="M7 2v20"></path>
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
    </svg>
  );
  
  const CutleryIconSmall = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
      <path d="M7 2v20"></path>
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
    </svg>
  );

  const ChartIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  );

  const ClockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );

  const MapPinIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );

  const MapIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
      <line x1="8" y1="2" x2="8" y2="18"></line>
      <line x1="16" y1="6" x2="16" y2="22"></line>
    </svg>
  );

  const MailIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );

  const GlobeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  );

  const PhoneIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  );

  if (loading || !restaurant) {
    return <div style={{ padding: 'var(--spacing-6)' }}>Chargement des détails du restaurant...</div>;
  }

  return (
    <div className="restaurant-details-page">
      <Link to="/restaurants" className="restaurant-details-back">
        {ArrowLeftIcon} Retour à la liste
      </Link>

      <Card className="restaurant-details-header-card">
        <div className="restaurant-details-header-content">
          <div className="restaurant-details-logo">
            {restaurant.logo_url ? (
               <img src={restaurant.logo_url} alt={restaurant.name} />
            ) : (
               <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                 {restaurant.name.charAt(0)}
               </div>
            )}
          </div>
          <div className="restaurant-details-header-info">
            <div className="restaurant-details-header-top">
              <span className="restaurant-details-id-badge">#RES-{restaurant.id.toString().padStart(3, '0')}</span>
              <Badge variant={restaurant.is_active ? "success" : "default"} showDot={false}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: restaurant.is_active ? '#22c55e' : '#94a3b8', display: 'inline-block', marginRight: '4px' }}></span>
                {restaurant.is_active ? 'Actif' : 'Inactif'}
              </Badge>
            </div>
            <h1 className="restaurant-details-name">{restaurant.name}</h1>
            <div className="restaurant-details-location">
              {MapPinIcon} {restaurant.city}
            </div>
          </div>
        </div>
        <div className="restaurant-details-header-actions">
          <Button variant="outline" onClick={() => navigate(`/restaurants/edit/${restaurant.id}`)} style={{ color: 'var(--text-secondary)' }}>
            {EditIcon} Modifier
          </Button>
          <Button variant="outline" onClick={() => setDeleteModalOpen(true)} style={{ color: 'var(--error-text)', borderColor: 'var(--error-border)' }}>
            {TrashIcon} Supprimer
          </Button>
        </div>
      </Card>

      <div className="restaurant-details-grid">
        <div className="restaurant-details-main">
          
          <Card className="restaurant-details-card">
            <h2 className="restaurant-details-card-title">
              {InfoIcon} Informations Générales
            </h2>
            <div className="restaurant-details-info-grid">
              <div className="restaurant-details-info-col" style={{ gridColumn: 'span 2' }}>
                <div className="restaurant-details-label">DESCRIPTION</div>
                <div className="restaurant-details-value">
                  {restaurant.description || "Aucune description fournie pour ce restaurant."}
                </div>
              </div>
              <div className="restaurant-details-info-col">
                <div className="restaurant-details-label">TYPE DE CUISINE</div>
                <div className="restaurant-details-value" style={{ fontWeight: 'var(--weight-bold)' }}>{restaurant.cuisine_type || "Non spécifié"}</div>
                
                <div className="restaurant-details-label" style={{ marginTop: 'var(--spacing-4)' }}>DATE D'OUVERTURE</div>
                <div className="restaurant-details-value" style={{ fontWeight: 'var(--weight-bold)' }}>
                  {new Date(restaurant.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>
          </Card>

          <Card className="restaurant-details-card">
            <h2 className="restaurant-details-card-title">
              {ContactIcon} Contact & Emplacement
            </h2>
            <div className="restaurant-details-contact-grid">
              <div>
                <div className="restaurant-details-label">ADRESSE</div>
                <div className="restaurant-details-contact-item" style={{ alignItems: 'flex-start' }}>
                  <div style={{ marginTop: '2px', color: 'var(--text-secondary)' }}>{MapIcon}</div>
                  <div>
                    {restaurant.address || "Non renseigné"}<br/>
                    {restaurant.city} {restaurant.postal_code}
                  </div>
                </div>
                <div className="restaurant-details-contact-item" style={{ marginTop: 'var(--spacing-4)' }}>
                  <div style={{ color: 'var(--text-secondary)' }}>{PhoneIcon}</div>
                  <div>{restaurant.phone || "Non renseigné"}</div>
                </div>
              </div>
              <div>
                <div className="restaurant-details-contact-item" style={{ marginTop: 'var(--spacing-6)' }}>
                  <div style={{ color: 'var(--error-text)' }}>{MailIcon}</div>
                  <div style={{ color: 'var(--error-text)' }}>{restaurant.email || "Non renseigné"}</div>
                </div>
                <div className="restaurant-details-contact-item" style={{ marginTop: 'var(--spacing-4)' }}>
                  <div style={{ color: 'var(--error-text)' }}>{GlobeIcon}</div>
                  <div style={{ color: 'var(--error-text)' }}>{restaurant.website || "Non renseigné"}</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="restaurant-details-card">
            <h2 className="restaurant-details-card-title">
              {CutleryIcon} Menu & Plats
            </h2>
            <div className="restaurant-details-menu-actions">
              <Button variant="primary" style={{ backgroundColor: 'var(--error-text)', borderColor: 'var(--error-text)' }} onClick={() => navigate(`/restaurants/${restaurant.id}/menu`)}>
                {CutleryIconSmall} Gérer le Menu
              </Button>
            </div>
          </Card>

        </div>

        <div className="restaurant-details-sidebar">

          {user?.role === 'super_admin' && (
            <Card className="restaurant-details-card">
              <h2 className="restaurant-details-card-title">
                {InfoIcon} Statut du Restaurant
              </h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-2) 0' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--weight-semibold)', fontSize: 'var(--font-sm)', color: 'var(--text-primary)' }}>
                    Activer le restaurant
                  </div>
                  <div style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Visible sur la plateforme
                  </div>
                </div>
                <Switch checked={!!restaurant.is_active} onChange={handleToggleActive} disabled={togglingStatus} />
              </div>
            </Card>
          )}

          <Card className="restaurant-details-card">
            <h2 className="restaurant-details-card-title">
              {ChartIcon} Performances
            </h2>
            <div className="restaurant-details-stat-box">
              <div className="restaurant-details-stat-icon">
                {CutleryIconSmall}
              </div>
              <div className="restaurant-details-stat-label">Total des Commandes</div>
              <div className="restaurant-details-stat-value">--</div>
            </div>
          </Card>

          <Card className="restaurant-details-card">
            <h2 className="restaurant-details-card-title">
              {ClockIcon} Horaires d'ouverture
            </h2>
            <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-sm)' }}>
              Les horaires d'ouverture ne sont pas encore configurés pour ce restaurant.
            </div>
          </Card>

        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} hideCloseButton={true}>
        <div style={{ textAlign: 'center', padding: 'var(--spacing-6) var(--spacing-4)' }}>
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '50%', 
            backgroundColor: 'var(--error-bg)', color: 'var(--error-text)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            margin: '0 auto var(--spacing-4)' 
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-xl)', margin: '0 0 var(--spacing-2) 0', color: 'var(--text-primary)' }}>
            Confirmer la suppression
          </h2>
          <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-6)', lineHeight: '1.5' }}>
            Êtes-vous sûr de vouloir supprimer le restaurant <strong>"{restaurant?.name}"</strong> ?<br/>
            Cette action est irréversible et supprimera toutes les données associées (menus, utilisateurs, etc).
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-4)' }}>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Annuler</Button>
            <Button variant="primary" style={{ backgroundColor: 'var(--error-text)' }} onClick={confirmDelete}>Supprimer</Button>
          </div>
        </div>
      </Modal>

      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          setSuccessAction(null);
          if (successAction === 'delete') navigate('/restaurants');
        }}
        message={modalMessage}
      />
      
      <ErrorModal 
        isOpen={errorModalOpen} 
        onClose={() => setErrorModalOpen(false)} 
        message={modalMessage} 
      />
    </div>
  );
};

export default RestaurantDetails;
