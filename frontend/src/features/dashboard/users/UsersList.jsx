import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import DataTable from '../../../components/ui/DataTable';
import Badge from '../../../components/ui/Badge';
import Input from '../../../components/ui/Input';
import './UsersList.css';

const MOCK_USERS = [
  {
    id: 1,
    name: 'Sophie Martin',
    email: 'sophie.m@le-bistrot.fr',
    role: 'Manager',
    roleVariant: 'info',
    establishment: 'Le Bistrot Parisien',
    isActive: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 2,
    name: 'Antoine Laurent',
    email: 'antoine.l@le-bistrot.fr',
    role: 'Serveur',
    roleVariant: 'warning',
    establishment: 'Le Bistrot Parisien',
    isActive: true,
    avatar: null,
    initials: 'AL'
  },
  {
    id: 3,
    name: 'Marc Dubois',
    email: 'marc.d@hospitalityos.com',
    role: 'Administrateur',
    roleVariant: 'default',
    establishment: 'Tous les établissements',
    isActive: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 4,
    name: 'Marc Dubois',
    email: 'marc.d@hospitalityos.com',
    role: 'Administrateur',
    roleVariant: 'default',
    establishment: 'Tous les établissements',
    isActive: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 5,
    name: 'Marc Dubois',
    email: 'marc.d@hospitalityos.com',
    role: 'Administrateur',
    roleVariant: 'default',
    establishment: 'Tous les établissements',
    isActive: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  }
];

const UsersList = () => {
  const navigate = useNavigate();

  const columns = [
    {
      header: 'UTILISATEUR',
      accessor: 'user',
      render: (row) => (
        <div className="users-list-user-col">
          {row.avatar ? (
            <img src={row.avatar} alt={row.name} className="users-list-avatar" />
          ) : (
            <div className="users-list-avatar-placeholder">
              {row.initials}
            </div>
          )}
          <div>
            <div className="users-list-name">{row.name}</div>
            <div className="users-list-email">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      header: 'RÔLE',
      accessor: 'role',
      render: (row) => (
        <Badge variant={row.roleVariant === 'info' ? 'default' : row.roleVariant} style={row.roleVariant === 'info' ? { backgroundColor: '#e0e7ff', color: '#4f46e5' } : row.roleVariant === 'default' ? { backgroundColor: '#1e293b', color: 'white' } : {}}>
          {row.role}
        </Badge>
      )
    },
    {
      header: 'ÉTABLISSEMENT',
      accessor: 'establishment',
      render: (row) => <span style={{ color: 'var(--text-secondary)' }}>{row.establishment}</span>
    },
    {
      header: 'STATUT',
      accessor: 'isActive',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: row.isActive ? 'var(--error-text)' : '#cbd5e1' }}></span>
          <span style={{ color: row.isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{row.isActive ? 'Actif' : 'Inactif'}</span>
        </div>
      )
    },
    {
      header: 'ACTIONS',
      accessor: 'actions',
      render: (row) => (
        <div className="users-list-actions">
          {/* Action icons normally go here, mockup shows empty space but it's good practice to have row click */}
          <Button variant="outline" size="sm" onClick={() => navigate(`/users/${row.id}`)} style={{ border: 'none', color: 'var(--text-secondary)' }}>
             Voir
          </Button>
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
    <div className="users-page">
      <div className="users-header">
        <div>
          <h1 className="users-title">Gestion des Utilisateurs</h1>
          <p className="users-subtitle">Gérez les accès, les rôles et le personnel de vos établissements.</p>
        </div>
        <Button variant="primary" style={{ backgroundColor: 'var(--error-text)', borderColor: 'var(--error-text)' }} onClick={() => navigate('/users/add')}>
          + Créer un utilisateur
        </Button>
      </div>

      <div className="users-toolbar">
        <div style={{ display: 'flex', gap: 'var(--spacing-4)', flex: 1 }}>
          <div style={{ width: '300px' }}>
            <Input 
              placeholder="Rechercher par nom, email..." 
              icon={SearchIcon} 
            />
          </div>
          
          <div className="users-filter-select-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', color: 'var(--text-secondary)' }}><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
            <select className="users-filter-select">
              <option>Tous les rôles</option>
              <option>Administrateur</option>
              <option>Manager</option>
              <option>Serveur</option>
            </select>
          </div>

          <div className="users-filter-select-wrapper">
            <select className="users-filter-select">
              <option>Statut : Actif</option>
              <option>Statut : Inactif</option>
            </select>
          </div>
        </div>

        <div className="users-total-count">
          Total : 42 utilisateurs
        </div>
      </div>

      <div className="users-table-wrapper">
        <DataTable 
          columns={columns} 
          data={MOCK_USERS} 
          pagination={true}
          pageSize={5}
        />
      </div>
    </div>
  );
};

export default UsersList;
