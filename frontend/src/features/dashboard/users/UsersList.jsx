import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../../../store/slices/usersSlice';
import Button from '../../../components/ui/Button';
import DataTable from '../../../components/ui/DataTable';
import Badge from '../../../components/ui/Badge';
import Input from '../../../components/ui/Input';
import Modal from '../../../components/ui/Modal';
import SuccessModal from '../../../components/ui/SuccessModal';
import ErrorModal from '../../../components/ui/ErrorModal';
import './UsersList.css';

const ROLE_LABEL = {
  super_admin: 'Super Admin',
  restaurant_admin: 'Administrateur Restaurant',
};

const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: users, loading, pagination } = useSelector(state => state.users);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    dispatch(fetchUsers({ search, role: roleFilter, is_active: statusFilter }));
  }, [dispatch, search, roleFilter, statusFilter]);

  const handleDelete = (row) => {
    setUserToDelete(row);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    const result = await dispatch(deleteUser(userToDelete.id));
    setDeleteModalOpen(false);
    setUserToDelete(null);
    if (deleteUser.fulfilled.match(result)) {
      setModalMessage('Utilisateur supprimé avec succès.');
      setSuccessModalOpen(true);
    } else {
      const msg = typeof result.payload === 'string' ? result.payload : 'Une erreur est survenue.';
      setModalMessage(msg);
      setErrorModalOpen(true);
    }
  };

  const columns = [
    {
      header: 'UTILISATEUR',
      accessor: 'user',
      render: (row) => (
        <div className="users-list-user-col">
          {row.avatar_url || row.avatar ? (
            <img src={row.avatar_url || row.avatar} alt={row.name} className="users-list-avatar" />
          ) : (
            <div className="users-list-avatar-placeholder">
              {row.name?.substring(0, 2).toUpperCase()}
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
        <Badge
          variant="default"
          style={
            row.role === 'super_admin'
              ? { backgroundColor: '#1e293b', color: 'white' }
              : { backgroundColor: '#e0e7ff', color: '#4f46e5' }
          }
        >
          {ROLE_LABEL[row.role] || row.role}
        </Badge>
      )
    },
    {
      header: 'ÉTABLISSEMENT',
      accessor: 'restaurant',
      render: (row) => (
        <span style={{ color: 'var(--text-secondary)' }}>
          {row.restaurant?.name || (row.role === 'super_admin' ? 'Tous les établissements' : '—')}
        </span>
      )
    },
    {
      header: 'STATUT',
      accessor: 'is_active',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: row.is_active ? 'var(--error-text)' : '#cbd5e1' }}></span>
          <span style={{ color: row.is_active ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{row.is_active ? 'Actif' : 'Inactif'}</span>
        </div>
      )
    },
    {
      header: 'ACTIONS',
      accessor: 'actions',
      render: (row) => (
        <div className="users-list-actions">
          <Button variant="outline" size="sm" onClick={() => navigate(`/users/${row.id}`)} style={{ border: 'none', color: 'var(--text-secondary)' }}>
            Voir
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate(`/users/edit/${row.id}`)} style={{ border: 'none', color: 'var(--text-secondary)' }}>
            Modifier
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleDelete(row)} style={{ border: 'none', color: 'var(--error-text)' }}>
            Supprimer
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="users-filter-select-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', color: 'var(--text-secondary)' }}><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
            <select className="users-filter-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="">Tous les rôles</option>
              <option value="super_admin">Super Admin</option>
              <option value="restaurant_admin">Administrateur Restaurant</option>
            </select>
          </div>

          <div className="users-filter-select-wrapper">
            <select className="users-filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">Tous les statuts</option>
              <option value="true">Actif</option>
              <option value="false">Inactif</option>
            </select>
          </div>
        </div>

        <div className="users-total-count">
          Total : {pagination?.total || users.length} utilisateurs
        </div>
      </div>

      <div className="users-table-wrapper">
        {loading ? (
          <div style={{ padding: 'var(--spacing-4)', textAlign: 'center' }}>Chargement...</div>
        ) : (
          <DataTable
            columns={columns}
            data={users}
            pagination={true}
            pageSize={10}
          />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} hideCloseButton={true}>
        <div style={{ textAlign: 'center', padding: 'var(--spacing-6) var(--spacing-4)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--error-bg)', color: 'var(--error-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--spacing-4)' }}>
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
            Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>"{userToDelete?.name}"</strong> ?<br />
            Cette action est irréversible.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-4)' }}>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Annuler</Button>
            <Button variant="primary" style={{ backgroundColor: 'var(--error-text)' }} onClick={confirmDelete} disabled={loading}>
              {loading ? 'Suppression...' : 'Supprimer'}
            </Button>
          </div>
        </div>
      </Modal>

      <SuccessModal isOpen={successModalOpen} onClose={() => setSuccessModalOpen(false)} message={modalMessage} />
      <ErrorModal isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} message={modalMessage} />
    </div>
  );
};

export default UsersList;
