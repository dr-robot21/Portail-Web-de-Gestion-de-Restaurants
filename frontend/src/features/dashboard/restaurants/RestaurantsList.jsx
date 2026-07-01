import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import DataTable from '../../../components/ui/DataTable';
import Badge from '../../../components/ui/Badge';
import Input from '../../../components/ui/Input';
import './RestaurantsList.css';

const MOCK_RESTAURANTS = [
  {
    id: 'RES-001',
    name: 'Lumina Prime',
    address: '1240 Downtown Ave',
    city: 'Metropolis, NY 10001',
    manager: 'S. Manager',
    email: 'gm@lumina.com',
    phone: '+1 (555) 019-2834',
    isActive: true,
    logo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'RES-042',
    name: 'Verdant Heights',
    address: '88 Peak Road',
    city: 'Westcliff, CA 90210',
    manager: 'J. Doe',
    email: 'contact@verdant.com',
    phone: '+1 (555) 882-1092',
    isActive: false,
    logo: null
  },
  {
    id: 'RES-018',
    name: 'The Brass Oyster',
    address: 'Pier 4, Harbor Bay',
    city: 'Seaport, MA 02110',
    manager: 'A. Fisher',
    email: 'info@brassoyster.co',
    phone: '+1 (555) 443-9001',
    isActive: true,
    logo: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'RES-019',
    name: 'The Brass Oyster',
    address: 'Pier 4, Harbor Bay',
    city: 'Seaport, MA 02110',
    manager: 'A. Fisher',
    email: 'info@brassoyster.co',
    phone: '+1 (555) 443-9001',
    isActive: true,
    logo: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'RES-020',
    name: 'The Brass Oyster',
    address: 'Pier 4, Harbor Bay',
    city: 'Seaport, MA 02110',
    manager: 'A. Fisher',
    email: 'info@brassoyster.co',
    phone: '+1 (555) 443-9001',
    isActive: true,
    logo: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  }
];

const RestaurantsList = () => {
  const navigate = useNavigate();

  const columns = [
    {
      header: 'Nom du Restaurant',
      accessor: 'name',
      render: (row) => (
        <div className="restaurant-list-name-col">
          {row.logo ? (
            <img src={row.logo} alt={row.name} className="restaurant-list-logo" />
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
          <div className="restaurant-list-manager">{row.manager}</div>
          <div className="restaurant-list-email">({row.email})</div>
          <div className="restaurant-list-phone">{row.phone}</div>
        </div>
      )
    },
    {
      header: 'Statut',
      accessor: 'isActive',
      render: (row) => (
        <Badge variant="default" style={{ backgroundColor: row.isActive ? '#e0f2fe' : '#f1f5f9', color: row.isActive ? '#0284c7' : '#64748b' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: row.isActive ? '#0ea5e9' : '#94a3b8', display: 'inline-block', marginRight: '6px' }}></span>
          {row.isActive ? 'Actif' : 'Inactif'}
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
          <button className="restaurant-list-action-btn" title="Delete">
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
          />
        </div>
        <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
          <div className="restaurants-filter-select-wrapper">
            <select className="restaurants-filter-select">
              <option>Tous les statuts</option>
              <option>Actif</option>
              <option>Inactif</option>
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
        <DataTable 
          columns={columns} 
          data={MOCK_RESTAURANTS} 
          pagination={true}
          pageSize={5}
        />
      </div>
    </div>
  );
};

export default RestaurantsList;
