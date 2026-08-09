import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, updateUser, deleteUser, clearSelectedUser } from '../../../store/slices/usersSlice';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Switch from '../../../components/ui/Switch';
import Modal from '../../../components/ui/Modal';
import SuccessModal from '../../../components/ui/SuccessModal';
import ErrorModal from '../../../components/ui/ErrorModal';
import './UserDetails.css';

const ROLE_LABEL = {
  super_admin: 'Super Admin',
  restaurant_admin: 'Admin Restaurant',
};

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedUser: user, loading } = useSelector(state => state.users);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [successAction, setSuccessAction] = useState(null);

  useEffect(() => {
    dispatch(fetchUserById(id));
    return () => dispatch(clearSelectedUser());
  }, [dispatch, id]);

  const handleToggleActive = async () => {
    if (!user) return;

    const result = await dispatch(updateUser({ id: user.id, userData: { is_active: !user.is_active } }));
    if (updateUser.fulfilled.match(result)) {
      setSuccessAction('toggle');
      setModalMessage('Statut du compte mis à jour.');
      setSuccessModalOpen(true);
    } else {
      const err = result.payload;
      const msg = typeof err === 'object' ? Object.values(err).flat().join(' ') : (err || 'Une erreur est survenue.');
      setModalMessage(msg);
      setErrorModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    const result = await dispatch(deleteUser(id));
    setDeleteModalOpen(false);
    if (deleteUser.fulfilled.match(result)) {
      setSuccessAction('delete');
      setModalMessage('Utilisateur supprimé avec succès.');
      setSuccessModalOpen(true);
    } else {
      const msg = typeof result.payload === 'string' ? result.payload : 'Une erreur est survenue.';
      setModalMessage(msg);
      setErrorModalOpen(true);
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

  const UserIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const BuildingIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
      <path d="M9 22v-4h6v4"></path>
      <path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path>
    </svg>
  );

  const CutleryIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
      <path d="M7 2v20"></path>
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
    </svg>
  );

  const ShieldIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  );

  const LockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );

  const RefreshIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  );

  if (loading && !user) {
    return <div style={{ padding: 'var(--spacing-8)', textAlign: 'center' }}>Chargement...</div>;
  }

  if (!user) return null;

  return (
    <div className="user-details-page">
      <div className="user-details-breadcrumb">
        <Link to="/users">Utilisateurs</Link> &gt; <span>Détails de l'utilisateur</span>
      </div>

      <div className="user-details-header">
        <div>
          <h1 className="user-details-title">{user.name}</h1>
          <Badge variant="default" style={{ backgroundColor: '#fef2f2', color: '#dc2626', marginTop: 'var(--spacing-2)' }}>
            {ROLE_LABEL[user.role] || user.role}
          </Badge>
        </div>
        <div className="user-details-actions">
          <Button variant="outline" onClick={() => navigate('/users')}>
            {ArrowLeftIcon} Retour
          </Button>
          <Button variant="outline" style={{ color: 'var(--error-text)', borderColor: 'var(--error-border)' }} onClick={() => setDeleteModalOpen(true)}>
            Supprimer
          </Button>
          <Button variant="primary" style={{ backgroundColor: 'var(--error-text)', borderColor: 'var(--error-text)' }} onClick={() => navigate(`/users/edit/${user.id}`)}>
            {EditIcon} Modifier
          </Button>
        </div>
      </div>

      <div className="user-details-grid">
        <div className="user-details-main">

          <Card className="user-details-card">
            <h2 className="user-details-card-title">{UserIcon} Informations Personnelles</h2>
            <div className="user-details-info-grid">
              <div className="user-details-info-col">
                <div className="user-details-label">NOM COMPLET</div>
                <div className="user-details-value">{user.name}</div>
              </div>
              <div className="user-details-info-col">
                <div className="user-details-label">EMAIL</div>
                <div className="user-details-value">{user.email}</div>
              </div>
              <div className="user-details-info-col" style={{ marginTop: 'var(--spacing-4)' }}>
                <div className="user-details-label">NUMÉRO DE TÉLÉPHONE</div>
                <div className="user-details-value">{user.phone || '—'}</div>
              </div>
              <div className="user-details-info-col" style={{ marginTop: 'var(--spacing-4)' }}>
                <div className="user-details-label">DATE D'INSCRIPTION</div>
                <div className="user-details-value">
                  {user.created_at ? new Date(user.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
                </div>
              </div>
            </div>
          </Card>

          {user.restaurant && (
            <Card className="user-details-card">
              <div className="user-details-card-header-flex">
                <h2 className="user-details-card-title" style={{ margin: 0, padding: 0, border: 'none' }}>
                  {BuildingIcon} Établissement Rattaché
                </h2>
              </div>
              <div className="user-details-establishment-list">
                <div className="user-details-establishment-item">
                  <div className="user-details-establishment-icon">{CutleryIcon}</div>
                  <div className="user-details-establishment-info">
                    <div className="user-details-establishment-name">{user.restaurant.name}</div>
                    <div className="user-details-establishment-location">{user.restaurant.city || '—'}</div>
                  </div>
                  <div className="user-details-establishment-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </div>
                </div>
              </div>
            </Card>
          )}

        </div>

        <div className="user-details-sidebar">

          <Card className="user-details-card">
            <h2 className="user-details-card-title">{LockIcon} Statut du Compte</h2>
            <div className="user-details-status-row">
              <div className="user-details-status-label">Statut Actuel</div>
              <div className="user-details-status-value">
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: user.is_active ? '#22c55e' : '#94a3b8', display: 'inline-block', marginRight: '6px' }}></span>
                {user.is_active ? 'Actif' : 'Inactif'}
              </div>
            </div>
            <div className="user-details-status-row">
              <div className="user-details-status-label">Dernière<br />Connexion</div>
              <div className="user-details-status-value-sub">
                {user.last_login_at
                  ? new Date(user.last_login_at).toLocaleDateString('fr-FR')
                  : 'Jamais connecté'}
              </div>
            </div>
            <div className="user-details-toggle-container">
              <div className="user-details-toggle-label">Activer le compte</div>
              <Switch checked={!!user.is_active} onChange={handleToggleActive} />
            </div>
          </Card>

          <Card className="user-details-card">
            <h2 className="user-details-card-title">{ShieldIcon} Sécurité</h2>
            <div className="user-details-security-label">Dernier changement de mot de passe</div>
            <div className="user-details-security-value">
              {user.password_changed_at
                ? new Date(user.password_changed_at).toLocaleDateString('fr-FR')
                : '—'}
            </div>
            <Button variant="outline" className="user-details-reset-btn" style={{ width: '100%', marginTop: 'var(--spacing-4)', color: 'var(--text-secondary)' }}>
              {RefreshIcon} Réinitialiser le mot de passe
            </Button>
          </Card>

        </div>
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
            Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>"{user?.name}"</strong> ?<br />
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

      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => { setSuccessModalOpen(false); setSuccessAction(null); if (successAction === 'delete') navigate('/users'); }}
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

export default UserDetails;
