import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Tabs from '../../../components/ui/Tabs';
import DataTable from '../../../components/ui/DataTable';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import './CategoriesManagement.css';

const MOCK_CATEGORIES = [
  { id: 1, name: 'Entrées', description: 'Light starters and appetizers to begin the meal.', dishes: 24, isActive: true, icon: '🍽️' },
  { id: 2, name: 'Plats Principaux', description: 'Main courses featuring premium meats and vegetarian options.', dishes: 42, isActive: true, icon: '🍲' },
  { id: 3, name: 'Desserts', description: 'Sweet finishes crafted by our pastry chef.', dishes: 15, isActive: true, icon: '🍰' },
  { id: 4, name: 'Seasonal Specials', description: 'Limited time holiday menu items.', dishes: 0, isActive: false, icon: '🍷' },
];

const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'inactive', label: 'Inactive' }
];

const CategoriesManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [modalOpen, setModalOpen] = useState(true); // Default true for image_2.png mockup demonstration

  const filteredCategories = MOCK_CATEGORIES.filter(cat => {
    if (activeTab === 'active') return cat.isActive;
    if (activeTab === 'inactive') return !cat.isActive;
    return true;
  });

  const columns = [
    { 
      header: 'CATEGORY NAME', 
      accessor: 'name',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
          <div style={{ 
            width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', 
            backgroundColor: 'var(--background)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', fontSize: '20px' 
          }}>
            {row.icon}
          </div>
          <span style={{ fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)' }}>{row.name}</span>
        </div>
      )
    },
    { 
      header: 'DESCRIPTION', 
      accessor: 'description',
      render: (row) => <span style={{ color: 'var(--text-secondary)' }}>{row.description}</span>
    },
    { 
      header: 'DISHES', 
      accessor: 'dishes',
      render: (row) => <span style={{ fontWeight: 'var(--weight-bold)', fontSize: 'var(--font-lg)' }}>{row.dishes}</span>
    },
    { 
      header: 'STATUS', 
      accessor: 'isActive',
      render: (row) => (
        <Badge variant={row.isActive ? 'success' : 'default'}>
          {row.isActive ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
    { 
      header: 'ACTIONS', 
      accessor: 'actions',
      render: () => null // Mockup doesn't show action icons clearly, leave blank
    }
  ];

  return (
    <div className="categories-page">
      <div className="categories-header">
        <div>
          <h1 className="categories-title">Gestion des categories</h1>
          <p className="categories-subtitle">Manage and organize your menu structure</p>
        </div>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          + Ajouter un Categorie
        </Button>
      </div>

      <div className="categories-table-container">
        <div className="categories-toolbar">
          <Tabs tabs={FILTER_TABS} activeTab={activeTab} onChange={setActiveTab} />
          
          <div className="categories-sort">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
              <line x1="21" y1="10" x2="3" y2="10"></line>
              <line x1="21" y1="6" x2="3" y2="6"></line>
              <line x1="21" y1="14" x2="3" y2="14"></line>
              <line x1="21" y1="18" x2="3" y2="18"></line>
            </svg>
            <select className="categories-sort-select">
              <option>Sort by: Name (A-Z)</option>
              <option>Sort by: Status</option>
            </select>
          </div>
        </div>

        <DataTable 
          columns={columns} 
          data={filteredCategories} 
          pagination={true}
          pageSize={4}
          className="categories-datatable-override"
        />
      </div>

      {/* Add Category Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} className="categories-modal">
        <h2 className="categories-modal-title">Ajouter une nouvelle catégorie</h2>
        
        <div className="categories-form-group">
          <Input label="Nom de la catégorie" placeholder="Ex: Boissons Chaudes" />
        </div>
        
        <div className="categories-form-group">
          <div className="ui-input-header">
            <label className="ui-input-label">Description</label>
            <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)' }}>(Optionnel)</span>
          </div>
          <textarea 
            className="categories-textarea" 
            placeholder="Brève description du contenu de cette catégorie..."
            rows="3"
          ></textarea>
        </div>

        <div className="categories-form-group">
          <div className="ui-input-header">
            <label className="ui-input-label">Statut</label>
          </div>
          <div className="ui-input-wrapper">
            <select className="categories-select">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="categories-modal-actions">
          <Button variant="outline" onClick={() => setModalOpen(false)}>Annuler</Button>
          <Button variant="primary" onClick={() => setModalOpen(false)}>Enregistrer</Button>
        </div>
      </Modal>
    </div>
  );
};

export default CategoriesManagement;
