import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../store/slices/categoriesSlice';
import { fetchDishes, deleteDish } from '../../../store/slices/dishesSlice';
import Tabs from '../../../components/ui/Tabs';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import Badge from '../../../components/ui/Badge';
import SuccessModal from '../../../components/ui/SuccessModal';
import ErrorModal from '../../../components/ui/ErrorModal';
import DishCard from './components/DishCard';
import './MenuManagement.css';

// MOCK data removed since we are fetching from Redux

const MenuManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(null);
  const [search, setSearch] = useState('');
  
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [dishToDelete, setDishToDelete] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [dishToView, setDishToView] = useState(null);

  const { list: categories } = useSelector(state => state.categories);
  const { list: dishes, loading: dishLoading } = useSelector(state => state.dishes);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user?.restaurant_id) {
      dispatch(fetchCategories(user.restaurant_id));
      dispatch(fetchDishes({ restaurant_id: user.restaurant_id, per_page: 500 }));
    }
  }, [dispatch, user]);

  const currentTab = activeTab ?? categories[0]?.id ?? null;

  // Pagination
  const PAGE_SIZE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDishes = dishes.filter(d => d.category_id === currentTab && (
    search === '' || d.name.toLowerCase().includes(search.toLowerCase())
  ));
  const totalItems = filteredDishes.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const pagedDishes = filteredDishes.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleEdit = (dish) => {
    navigate(`/menu/edit/${dish.id}`);
  };

  const handleDelete = (dish) => {
    setDishToDelete(dish);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!dishToDelete) return;

    const result = await dispatch(deleteDish(dishToDelete.id));
    setDeleteModalOpen(false);
    setDishToDelete(null);
    if (deleteDish.fulfilled.match(result)) {
      setModalMessage('L\'opération a été effectuée avec succès.');
      setSuccessModalOpen(true);
    } else {
      const msg = typeof result.payload === 'string' ? result.payload : 'Une erreur est survenue.';
      setModalMessage(msg);
      setErrorModalOpen(true);
    }
  };

  const handleView = (dish) => {
    setDishToView(dish);
    setViewModalOpen(true);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleAddClick = () => {
    navigate('/menu/add');
  };

  const SearchIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );

  return (
    <div className="menu-management">
      <div className="menu-header">
        <div>
          <h1 className="menu-title">Gestion des Plats</h1>
          <p className="menu-subtitle">Gérez votre menu, les prix et la disponibilité des plats.</p>
        </div>
        <Button variant="primary" onClick={handleAddClick}>
          + Ajouter un Plat
        </Button>
      </div>

      <div className="menu-search-bar">
        <Input 
          placeholder="Rechercher un plat..." 
          icon={SearchIcon}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="menu-tabs-container">
        {categories.length > 0 && (
          <Tabs 
            tabs={categories.map(c => ({ id: c.id, label: c.name, icon: <span style={{marginRight: '8px'}}>{c.icon || '🍴'}</span> }))} 
            activeTab={currentTab} 
            onChange={handleTabChange} 
          />
        )}
      </div>

      <div className="menu-grid">
        {dishLoading && <div style={{ padding: 'var(--spacing-4)' }}>Loading dishes...</div>}
        {!dishLoading && pagedDishes.map(dish => (
          <DishCard 
            key={dish.id} 
            dish={dish} 
            onEdit={() => handleEdit(dish)}
            onView={() => handleView(dish)}
            onDelete={() => handleDelete(dish)}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="menu-pagination-wrapper">
          <span className="menu-pag-info">
            Affichage de {totalItems === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1} à {Math.min(currentPage * PAGE_SIZE, totalItems)} sur {totalItems} entrées
          </span>
          <div className="menu-pag-controls">
            <button
              className="menu-pag-btn menu-pag-nav"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >Précédent</button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`menu-pag-btn menu-pag-page ${currentPage === page ? 'menu-pag-page--active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >{page}</button>
            ))}

            <button
              className="menu-pag-btn menu-pag-nav"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            >Suivant</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} hideCloseButton={true} className="menu-delete-modal">
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
            Êtes-vous sûr de vouloir supprimer le plat <strong>"{dishToDelete?.name}"</strong> ?<br/>
            Cette action est irréversible.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-4)' }}>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Annuler</Button>
            <Button variant="primary" style={{ backgroundColor: 'var(--error-text)' }} onClick={confirmDelete} disabled={dishLoading}>
              {dishLoading ? 'Suppression...' : 'Supprimer'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* View Dish Modal */}
      <Modal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)} className="menu-view-modal">
        {dishToView && (
          <>
            <div style={{ position: 'relative' }}>
              <img src={dishToView.image_url || dishToView.image || 'https://via.placeholder.com/800x300?text=No+Image'} alt="Dish" style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: 'var(--spacing-4)', left: 'var(--spacing-4)' }}>
                <Badge variant="default" style={{ backgroundColor: 'white' }}>{categories.find(c => c.id === dishToView.category_id)?.name || 'PLAT'}</Badge>
              </div>
            </div>
            <div style={{ padding: 'var(--spacing-6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-2)' }}>
                <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-2xl)', fontWeight: 'bold', margin: 0, color: 'var(--text-primary)' }}>
                  {dishToView.name}
                </h2>
                <div style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-xl)', fontWeight: 'bold', color: 'var(--primary)' }}>
                  {Number(dishToView.price).toFixed(2)} MAD
                </div>
              </div>
              
              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                <Badge variant={dishToView.is_active ? 'success' : 'default'} showDot={false} style={!dishToView.is_active ? { backgroundColor: '#f1f5f9', color: '#64748b' } : {}}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: dishToView.is_active ? 'var(--error-text)' : '#94a3b8', display: 'inline-block', marginRight: '4px' }}></span>
                  {dishToView.is_active ? 'Disponible' : 'Indisponible'}
                </Badge>
              </div>

              <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: 'var(--spacing-8)' }}>
                {dishToView.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-4)' }}>
                <Button variant="outline" onClick={() => { setViewModalOpen(false); navigate(`/menu/edit/${dishToView.id}`); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg> Modifier
                </Button>
                <Button variant="primary" onClick={() => { setViewModalOpen(false); handleDelete(dishToView); }} style={{ backgroundColor: 'var(--error-text)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg> Supprimer
                </Button>
              </div>
            </div>
          </>
        )}
      </Modal>

      {/* Success and Error Modals */}
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

export default MenuManagement;
