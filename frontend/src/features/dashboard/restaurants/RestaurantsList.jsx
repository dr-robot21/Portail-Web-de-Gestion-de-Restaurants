import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../../../store/slices/restaurantsSlice';
import api from '../../../services/api';
import Button from '../../../components/ui/Button';
import DataTable from '../../../components/ui/DataTable';
import Badge from '../../../components/ui/Badge';
import Input from '../../../components/ui/Input';
import Modal from '../../../components/ui/Modal';
import SuccessModal from '../../../components/ui/SuccessModal';
import ErrorModal from '../../../components/ui/ErrorModal';
import './RestaurantsList.css';

// MOCK data removed, fetching from Redux

const RestaurantsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: restaurants, loading } = useSelector(state => state.restaurants);
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);
  
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    dispatch(fetchRestaurants({ search, is_active: statusFilter }));
  }, [dispatch, search, statusFilter]);

  const handleDelete = (row) => {
    setRestaurantToDelete(row);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!restaurantToDelete) return;
    try {
      await api.delete(`/restaurants/${restaurantToDelete.id}`);
      setDeleteModalOpen(false);
      setRestaurantToDelete(null);
      setModalMessage('Restaurant supprimé avec succès.');
      setSuccessModalOpen(true);
      dispatch(fetchRestaurants({ search, is_active: statusFilter }));
    } catch (error) {
      setDeleteModalOpen(false);
      setModalMessage(error.response?.data?.message || 'Erreur lors de la suppression.');
      setErrorModalOpen(true);
    }
  };

  const getLogoUrl = (logo) => {
    if (!logo) return null;
    if (logo.startsWith('http')) return logo;
    return `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000'}/storage/${logo}`;
  };

  const columns = [
    {
      header: 'Nom du Restaurant',
      accessor: 'name',
      render: (row) => (
        <div className="restaurant-list-name-col">
          {row.logo ? (
            <img src={getLogoUrl(row.logo)} alt={row.name} className="restaurant-list-logo" />
          ) : (
            <div className="restaurant-list-logo-placeholder">
              {row.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="restaurant-list-name">{row.name}</div>
            <div className="restaurant-list-id">ID: #{row.id}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Emplacement / Adresse',
      accessor: 'address',
      render: (row) => (
        <div>
          <div className="restaurant-list-address">{row.address}</div>
          <div className="restaurant-list-city">{row.city}</div>
        </div>
      )
    },
    {
      header: 'Infos de Contact',
      accessor: 'contact',
      render: (row) => (
        <div>
          <div className="restaurant-list-manager">{row.admin?.name || '—'}</div>
          <div className="restaurant-list-email">{row.email || '—'}</div>
          <div className="restaurant-list-phone">{row.phone || '—'}</div>
        </div>
      )
    },
    {
      header: 'Statut',
      accessor: 'is_active',
      render: (row) => (
        <Badge variant="default" showDot={false} style={{ backgroundColor: row.is_active ? '#e0f2fe' : '#f1f5f9', color: row.is_active ? '#0284c7' : '#64748b' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: row.is_active ? '#0ea5e9' : '#94a3b8', display: 'inline-block', marginRight: '6px' }}></span>
          {row.is_active ? 'Actif' : 'Inactif'}
        </Badge>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="restaurant-list-actions">
          <button className="restaurant-list-action-btn" onClick={() => navigate(`/restaurants/${row.id}`)} title="View">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
          <button className="restaurant-list-action-btn" onClick={() => navigate(`/restaurants/edit/${row.id}`)} title="Edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>
          <button className="restaurant-list-action-btn" onClick={() => handleDelete(row)} title="Delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      )
    }
  ];

  const SearchIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );

  return (
    <div className="restaurants-page">
      <div className="restaurants-header">
        <div>
          <h1 className="restaurants-title">Aperçu des Restaurants</h1>
          <p className="restaurants-subtitle">Gérez et surveillez toutes les propriétés du réseau.</p>
        </div>
        <Button variant="primary" onClick={() => navigate('/restaurants/add')}>
          + Ajouter un Restaurant
        </Button>
      </div>

      <div className="restaurants-toolbar">
        <div style={{ flex: 1, maxWidth: '500px' }}>
          <Input 
            placeholder="Rechercher des restaurants par nom ou emplacement..." 
            icon={SearchIcon}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
          <div className="restaurants-filter-select-wrapper">
            <select 
              className="restaurants-filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Tous les statuts</option>
              <option value="true">Actif</option>
              <option value="false">Inactif</option>
            </select>
          </div>
          <Button variant="outline" style={{ padding: 'var(--spacing-2)', borderColor: 'var(--border)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
          </Button>
        </div>
      </div>

      <div className="restaurants-table-wrapper">
        {loading ? (
          <div style={{ padding: 'var(--spacing-4)', textAlign: 'center' }}>Loading restaurants...</div>
        ) : (
          <DataTable 
            columns={columns} 
            data={restaurants} 
            pagination={true}
            pageSize={10}
          />
        )}
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
            Êtes-vous sûr de vouloir supprimer le restaurant <strong>"{restaurantToDelete?.name}"</strong> ?<br/>
            Cette action est irréversible.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-4)' }}>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Annuler</Button>
            <Button variant="primary" style={{ backgroundColor: 'var(--error-text)' }} onClick={confirmDelete}>Supprimer</Button>
          </div>
        </div>
      </Modal>

      <SuccessModal 
        isOpen={successModalOpen} 
        onClose={() => setSuccessModalOpen(false)} 
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

export default RestaurantsList;
