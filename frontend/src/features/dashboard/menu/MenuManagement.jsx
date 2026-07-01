import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '../../../components/ui/Tabs';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Alert from '../../../components/ui/Alert';
import Modal from '../../../components/ui/Modal';
import Badge from '../../../components/ui/Badge';
import DishCard from './components/DishCard';
import './MenuManagement.css';

const MOCK_DISHES = [
  {
    id: 1,
    name: 'Entrecôte Grillée',
    price: 24.00,
    description: 'Pièce de bœuf tendre, servie avec frites maison...',
    image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    isActive: true,
    categoryId: 'principaux'
  },
  {
    id: 2,
    name: 'Filet de Saumon',
    price: 22.50,
    description: 'Saumon frais rôti aux herbes, accompagné...',
    image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    isActive: true,
    categoryId: 'principaux'
  },
  {
    id: 3,
    name: 'Risotto aux Truffes',
    price: 19.00,
    description: 'Riz arborio crémeux, éclats de truffe noire et...',
    image: 'https://images.unsplash.com/photo-1633337474564-1d8219eb9601?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    isActive: false,
    categoryId: 'principaux'
  },
  {
    id: 4,
    name: 'Pizza Margherita',
    price: 14.00,
    description: 'Sauce tomate San Marzano, mozzarella di...',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    isActive: true,
    categoryId: 'principaux'
  }
];

const CATEGORIES = [
  { id: 'principaux', label: 'Plats Principaux', icon: <span style={{marginRight: '8px'}}>🍴</span> },
  { id: 'entrees', label: 'Entrées', icon: <span style={{marginRight: '8px'}}>🥗</span> },
  { id: 'desserts', label: 'Desserts', icon: <span style={{marginRight: '8px'}}>🍰</span> },
  { id: 'boissons', label: 'Boissons', icon: <span style={{marginRight: '8px'}}>🍷</span> },
  { id: 'cafe', label: 'Café & Thé', icon: <span style={{marginRight: '8px'}}>☕</span> }
];

const MenuManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('principaux');
  const [search, setSearch] = useState('');
  
  // Simulate an alert state from the mockup
  const [alert, setAlert] = useState(null); 
  const [deleteModalOpen, setDeleteModalOpen] = useState(true); // Default true to demonstrate mockup image_2.png
  const [viewModalOpen, setViewModalOpen] = useState(true); // Default true to demonstrate mockup image_3.png

  const handleEdit = (dish) => {
    navigate('/menu/edit/1'); // Mocking ID
  };

  const handleDelete = (dish) => {
    setDeleteModalOpen(true);
  };

  const handleView = (dish) => {
    setViewModalOpen(true);
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

      {alert && (
        <Alert type={alert.type} title={alert.title} className="menu-alert-floating">
          {alert.message}
        </Alert>
      )}

      <div className="menu-search-bar">
        <Input 
          placeholder="Rechercher un plat..." 
          icon={SearchIcon}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="menu-tabs-container">
        <Tabs 
          tabs={CATEGORIES} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
        />
      </div>

      <div className="menu-grid">
        {MOCK_DISHES.filter(d => d.categoryId === activeTab).map(dish => (
          <DishCard 
            key={dish.id} 
            dish={dish} 
            onEdit={handleEdit}
            onView={() => handleView(dish)}
            onDelete={() => handleDelete(dish)}
          />
        ))}
      </div>

      {/* Pagination Mockup */}
      <div className="menu-pagination">
        <button className="menu-pagination-btn" disabled>Précédent</button>
        <button className="menu-pagination-page menu-pagination-page--active">1</button>
        <button className="menu-pagination-page">2</button>
        <button className="menu-pagination-page">3</button>
        <span className="menu-pagination-dots">...</span>
        <button className="menu-pagination-btn">Suivant</button>
      </div>

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
            Êtes-vous sûr de vouloir supprimer le plat <strong>"Faux-filet Maturé"</strong> ?<br/>
            Cette action est irréversible.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-4)' }}>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Annuler</Button>
            <Button variant="primary" style={{ backgroundColor: 'var(--error-text)' }} onClick={() => setDeleteModalOpen(false)}>Supprimer</Button>
          </div>
        </div>
      </Modal>

      {/* View Dish Modal */}
      <Modal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)} className="menu-view-modal">
        <div style={{ position: 'relative' }}>
          <img src="https://images.unsplash.com/photo-1546833998-877b37c2e5c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Dish" style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', bottom: 'var(--spacing-4)', left: 'var(--spacing-4)' }}>
            <Badge variant="default" style={{ backgroundColor: 'white' }}>PLATS PRINCIPAUX</Badge>
          </div>
        </div>
        <div style={{ padding: 'var(--spacing-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-2)' }}>
            <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-2xl)', fontWeight: 'bold', margin: 0, color: 'var(--text-primary)' }}>
              Faux-filet Maturé
            </h2>
            <div style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-xl)', fontWeight: 'bold', color: 'var(--primary)' }}>
              48.00 €
            </div>
          </div>
          
          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <Badge variant="default">
               <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--error-text)', display: 'inline-block', marginRight: '4px' }}></span>
               Disponible
            </Badge>
          </div>

          <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: 'var(--spacing-8)' }}>
            Notre faux-filet signature, maturé à sec pendant 45 jours pour une tendreté optimale et une concentration de saveurs intense.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-4)' }}>
            <Button variant="outline" onClick={() => { setViewModalOpen(false); navigate('/menu/edit/1'); }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg> Modifier
            </Button>
            <Button variant="primary" onClick={() => setViewModalOpen(false)} style={{ backgroundColor: 'var(--error-text)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg> Supprimer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MenuManagement;
