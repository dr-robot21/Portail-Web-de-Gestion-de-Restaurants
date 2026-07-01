import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Card from '../../../components/ui/Card';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import './RestaurantMenu.css';

const MOCK_SECTIONS = [
  {
    id: 1,
    title: 'Petit Déjeuner',
    isActive: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z"></path><path d="M12 2a10 10 0 0 1 10 10"></path></svg>
    ),
    dishes: [
      { id: 101, name: 'Croissant au Beurre', category: 'Viennoiserie', price: '3,50 €', status: 'Disponible', image: 'https://images.unsplash.com/photo-1555507036-ab1d4075c6f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 102, name: 'Toast à l\'Avocat', category: 'Salé', price: '12,00 €', status: 'Disponible', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }
    ]
  },
  {
    id: 2,
    title: 'Dîner',
    isActive: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>
    ),
    dishes: [
      { id: 201, name: 'Bœuf Bourguignon', category: 'Plat Principal', price: '28,00 €', status: 'Stock Faible', image: 'https://images.unsplash.com/photo-1544025162-811c750e5015?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
      { id: 202, name: 'Bœuf Bourguignon', category: 'Plat Principal', price: '28,00 €', status: 'Stock Faible', image: 'https://images.unsplash.com/photo-1544025162-811c750e5015?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }
    ]
  }
];

const MOCK_AVAILABLE_DISHES = [
  { id: 301, name: 'Tartare de Saumon Frais', category: 'Entrées', price: '18.00 €', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
  { id: 302, name: 'Entrecôte Grillée (300g)', category: 'Plats Principaux', price: '32.00 €', image: 'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
  { id: 303, name: 'Salade César Classique', category: 'Entrées', price: '14.50 €', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
  { id: 304, name: 'Risotto aux Champignons Sauvages', category: 'Plats Principaux', price: '24.00 €', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
  { id: 305, name: 'Crème Brûlée à la Vanille', category: 'Desserts', price: '9.00 €', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
  { id: 306, name: 'Huîtres Fines de Claire (x6)', category: 'Entrées', price: '22.00 €', image: 'https://images.unsplash.com/photo-1559727409-cf80ea39c595?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
];

const RestaurantMenu = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isSectionModalOpen, setSectionModalOpen] = useState(false);
  const [sectionModalMode, setSectionModalMode] = useState('add'); // 'add' or 'edit'
  
  const [isDishesModalOpen, setDishesModalOpen] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState([301, 304]); // Pre-select for mockup matching

  const toggleDishSelection = (dishId) => {
    if (selectedDishes.includes(dishId)) {
      setSelectedDishes(selectedDishes.filter(id => id !== dishId));
    } else {
      setSelectedDishes([...selectedDishes, dishId]);
    }
  };

  const openSectionModal = (mode) => {
    setSectionModalMode(mode);
    setSectionModalOpen(true);
  };

  const EditIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  );

  const EyeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const TrashIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  );

  const PlusIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

  return (
    <div className="restaurant-menu-page">
      <div className="restaurant-menu-header">
        <div>
          <h1 className="restaurant-menu-title">Gestion du Menu</h1>
          <p className="restaurant-menu-subtitle">Gérez les plats, les catégories et les prix pour Le Petit Bistro.</p>
        </div>
        <Button variant="primary" style={{ backgroundColor: 'var(--error-text)', borderColor: 'var(--error-text)' }} onClick={() => openSectionModal('add')}>
          + Ajouter un section
        </Button>
      </div>

      <div className="restaurant-menu-restaurant-section">
        <h2 className="restaurant-menu-section-label">Restaurant</h2>
        <Card className="restaurant-menu-restaurant-card">
          <div className="restaurant-menu-restaurant-info">
            <div className="restaurant-menu-restaurant-logo">
              <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Lumina Prime" />
            </div>
            <div>
              <div className="restaurant-menu-restaurant-tags">
                <span className="restaurant-menu-id-badge">#RES-001</span>
                <Badge variant="success">
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block', marginRight: '4px' }}></span>
                  Active
                </Badge>
              </div>
              <h3 className="restaurant-menu-restaurant-name">Lumina Prime</h3>
              <div className="restaurant-menu-restaurant-location">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                Metropolis Downtown
              </div>
            </div>
          </div>
          <Button variant="outline" style={{ color: 'var(--text-secondary)' }} onClick={() => navigate('/restaurants/1')}>
            {EditIcon} Modifier
          </Button>
        </Card>
      </div>

      <div className="restaurant-menu-sections">
        {MOCK_SECTIONS.map((section, idx) => (
          <Card key={section.id} className="restaurant-menu-section-card">
            <div className="restaurant-menu-section-header">
              <div className="restaurant-menu-section-title-wrap">
                {section.icon}
                <h3 className="restaurant-menu-section-title">{section.title}</h3>
                <Badge variant="default" style={{ backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '10px', padding: '2px 8px' }}>
                  {section.isActive ? 'Actif' : 'Inactif'}
                </Badge>
              </div>
              <div className="restaurant-menu-section-actions">
                <div className="restaurant-menu-dropdown-wrap">
                  <button className="restaurant-menu-dots-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                  {/* Mock Dropdown Open State for second section */}
                  {idx === 1 && (
                    <div className="restaurant-menu-dropdown">
                      <button className="restaurant-menu-dropdown-item" onClick={() => setDishesModalOpen(true)}>
                        {PlusIcon} Ajouter un plat
                      </button>
                      <button className="restaurant-menu-dropdown-item" onClick={() => openSectionModal('edit')}>
                        {EditIcon} Modifier la section
                      </button>
                      <button className="restaurant-menu-dropdown-item restaurant-menu-dropdown-item--danger">
                        {TrashIcon} Supprimer la section
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="restaurant-menu-table">
              <div className="restaurant-menu-th-row">
                <div className="restaurant-menu-th" style={{ flex: 2 }}>PLAT</div>
                <div className="restaurant-menu-th" style={{ flex: 1.5 }}>CATÉGORIE</div>
                <div className="restaurant-menu-th" style={{ flex: 1 }}>PRIX</div>
                <div className="restaurant-menu-th" style={{ flex: 1 }}>STATUT</div>
                <div className="restaurant-menu-th" style={{ flex: 1, textAlign: 'right' }}>ACTIONS</div>
              </div>
              {section.dishes.map(dish => (
                <div key={dish.id} className="restaurant-menu-tr">
                  <div className="restaurant-menu-td" style={{ flex: 2 }}>
                    <div className="restaurant-menu-dish-info">
                      <img src={dish.image} alt={dish.name} className="restaurant-menu-dish-img" />
                      <span className="restaurant-menu-dish-name">{dish.name}</span>
                    </div>
                  </div>
                  <div className="restaurant-menu-td" style={{ flex: 1.5 }}>
                    <span className="restaurant-menu-dish-category">{dish.category}</span>
                  </div>
                  <div className="restaurant-menu-td" style={{ flex: 1 }}>
                    <span className="restaurant-menu-dish-price">{dish.price}</span>
                  </div>
                  <div className="restaurant-menu-td" style={{ flex: 1 }}>
                    {dish.status === 'Disponible' ? (
                      <Badge variant="success" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block', marginRight: '4px' }}></span>
                        {dish.status}
                      </Badge>
                    ) : (
                      <Badge variant="warning" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block', marginRight: '4px' }}></span>
                        {dish.status}
                      </Badge>
                    )}
                  </div>
                  <div className="restaurant-menu-td restaurant-menu-td-actions" style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <button className="restaurant-menu-action-btn">{EyeIcon}</button>
                    <button className="restaurant-menu-action-btn">{EditIcon}</button>
                    <button className="restaurant-menu-action-btn restaurant-menu-action-btn--danger">{TrashIcon}</button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* SECTION MODAL */}
      <Modal isOpen={isSectionModalOpen} onClose={() => setSectionModalOpen(false)} className="restaurant-menu-modal">
        <div className="restaurant-menu-modal-header">
          <h2 className="restaurant-menu-modal-title">Ajouter une nouvelle section</h2>
        </div>
        
        <div className="restaurant-menu-modal-body">
          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <Input 
              label="Nom de la section" 
              defaultValue={sectionModalMode === 'edit' ? 'Desserts, Boissons' : ''} 
              placeholder={sectionModalMode === 'add' ? 'ex: Desserts, Boissons' : ''} 
            />
          </div>
          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <div className="ui-input-header"><label className="ui-input-label">Description</label></div>
            <textarea 
              className="restaurant-menu-textarea" 
              rows="3" 
              placeholder="Optionnel"
              defaultValue={sectionModalMode === 'edit' ? 'Optionnel' : ''}
            ></textarea>
          </div>
          <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
            <div style={{ flex: 1 }}>
              <div className="ui-input-header"><label className="ui-input-label">Statut</label></div>
              <div className="ui-input-wrapper">
                <select className="restaurant-menu-select">
                  <option>Actif</option>
                  <option>Inactif</option>
                </select>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <Input label="Ordre d'affichage" type="number" defaultValue="1" />
            </div>
          </div>
        </div>

        <div className="restaurant-menu-modal-footer">
          <Button variant="outline" onClick={() => setSectionModalOpen(false)}>Annuler</Button>
          <Button variant="primary" style={{ backgroundColor: 'var(--error-text)', borderColor: 'var(--error-text)' }} onClick={() => setSectionModalOpen(false)}>
            {sectionModalMode === 'edit' ? 'Enregistrer' : 'Créer la section'}
          </Button>
        </div>
      </Modal>

      {/* ADD DISHES MODAL */}
      <Modal isOpen={isDishesModalOpen} onClose={() => setDishesModalOpen(false)} className="restaurant-menu-dishes-modal">
        <div className="restaurant-menu-modal-header">
          <h2 className="restaurant-menu-modal-title">Ajouter des plats à la section</h2>
        </div>
        
        <div className="restaurant-menu-modal-body">
          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <Input 
              placeholder="Rechercher un plat..." 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>} 
            />
          </div>
          
          <div className="restaurant-menu-dishes-list">
            {MOCK_AVAILABLE_DISHES.map(dish => {
              const isSelected = selectedDishes.includes(dish.id);
              return (
                <div 
                  key={dish.id} 
                  className={`restaurant-menu-dish-selectable ${isSelected ? 'restaurant-menu-dish-selectable--selected' : ''}`}
                  onClick={() => toggleDishSelection(dish.id)}
                >
                  <img src={dish.image} alt={dish.name} className="restaurant-menu-dish-img-large" />
                  <div className="restaurant-menu-dish-selectable-info">
                    <div className="restaurant-menu-dish-selectable-name">{dish.name}</div>
                    <div className="restaurant-menu-dish-selectable-meta">{dish.category} • {dish.price}</div>
                  </div>
                  <div className={`restaurant-menu-checkbox ${isSelected ? 'restaurant-menu-checkbox--checked' : ''}`}>
                    {isSelected && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="restaurant-menu-dishes-footer">
          <div className="restaurant-menu-dishes-count">
            <span style={{ color: 'var(--error-text)', fontWeight: 'var(--weight-bold)' }}>{selectedDishes.length}</span> plats sélectionnés
          </div>
          <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
            <Button variant="outline" onClick={() => setDishesModalOpen(false)}>Annuler</Button>
            <Button variant="primary" style={{ backgroundColor: 'var(--error-text)', borderColor: 'var(--error-text)' }} onClick={() => setDishesModalOpen(false)}>
              + Ajouter les plats sélectionnés
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default RestaurantMenu;
