import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, createUser, updateUser } from '../../../store/slices/usersSlice';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Loader from '../../../components/ui/Loader';
import Switch from '../../../components/ui/Switch';
import SuccessModal from '../../../components/ui/SuccessModal';
import ErrorModal from '../../../components/ui/ErrorModal';
import './UserForm.css';

const UserForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.users);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    password_confirmation: '',
    is_active: true,
    force_password_change: !isEdit,
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (isEdit) {
      (async () => {
        const result = await dispatch(fetchUserById(id));
        if (fetchUserById.fulfilled.match(result)) {
          const u = result.payload;
          setFormData({
            name: u.name || '',
            email: u.email || '',
            phone: u.phone || '',
            role: u.role || '',
            password: '',
            password_confirmation: '',
            is_active: u.is_active ?? true,
            force_password_change: false,
          });
          if (u.avatar_url || u.avatar) setAvatarPreview(u.avatar_url || u.avatar);
        }
      })();
    }
  }, [dispatch, id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const payload = { ...formData };
    if (avatarFile) payload.avatar = avatarFile;
    if (!payload.password) {
      delete payload.password;
      delete payload.password_confirmation;
    }

    const result = isEdit
      ? await dispatch(updateUser({ id, userData: payload }))
      : await dispatch(createUser(payload));

    if ((isEdit ? updateUser : createUser).fulfilled.match(result)) {
      setModalMessage(isEdit ? 'Utilisateur modifié avec succès.' : 'Utilisateur créé avec succès.');
      setSuccessModalOpen(true);
    } else {
      const err = result.payload;
      const msg = typeof err === 'object' ? Object.values(err).flat().join(' ') : (err || 'Une erreur est survenue.');
      setModalMessage(msg);
      setErrorModalOpen(true);
    }
  };

  const UserIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const ShieldIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  );

  const LockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );

  const InfoIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );

  const UploadCloudIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16"></polyline>
      <line x1="12" y1="12" x2="12" y2="21"></line>
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
    </svg>
  );

  return (
    <div className="user-form-page">
      <div className="user-form-breadcrumb">
        <Link to="/users">Utilisateurs</Link> &gt; <span>{isEdit ? 'Modifier un Utilisateur' : 'Ajouter un Utilisateur'}</span>
      </div>

      <div className="user-form-header">
        <h1 className="user-form-title">{isEdit ? 'Modifier un Utilisateur' : 'Ajouter un Utilisateur'}</h1>
        <div className="user-form-header-actions">
          <Button variant="outline" onClick={() => navigate('/users')} disabled={loading}>Annuler</Button>
          <Button variant="primary" style={{ backgroundColor: 'var(--error-text)', borderColor: 'var(--error-text)' }} onClick={handleSubmit} disabled={loading}>
            {loading && <Loader size="sm" color="#ffffff" />}
            {loading ? 'Enregistrement...' : (isEdit ? 'Enregistrer' : "Créer l'utilisateur")}
          </Button>
        </div>
      </div>

      <div className="user-form-grid">
        <div className="user-form-main">

          <Card className="user-form-card">
            <h2 className="user-form-card-title">{UserIcon} Informations Personnelles</h2>
            <div className="user-form-row">
              <div className="user-form-col">
                <Input name="name" value={formData.name} onChange={handleChange} label="Nom complet" placeholder="Jean Dupont" />
              </div>
              <div className="user-form-col">
                <Input name="phone" value={formData.phone} onChange={handleChange} label="Numéro de Téléphone" placeholder="+33 6 00 00 00 00" />
              </div>
            </div>
            <div className="user-form-row" style={{ marginTop: 'var(--spacing-4)' }}>
              <div className="user-form-col">
                <Input name="email" value={formData.email} onChange={handleChange} label="Email Professionnel" type="email" placeholder="jean@exemple.com" />
              </div>
            </div>
          </Card>

          <Card className="user-form-card">
            <h2 className="user-form-card-title">{ShieldIcon} Rôle du Compte</h2>
            <div className="ui-input-header"><label className="ui-input-label">Type d'Accès</label></div>
            <div className="ui-input-wrapper">
              <select name="role" value={formData.role} onChange={handleChange} className="user-form-select">
                <option value="">Sélectionner un rôle</option>
                <option value="super_admin">Super Admin</option>
                <option value="restaurant_admin">Administrateur Restaurant</option>
              </select>
            </div>
            <div className="user-form-info-box">
              {InfoIcon}
              <span>Le rôle définit les permissions globales de l'utilisateur sur la plateforme.</span>
            </div>
          </Card>

          <Card className="user-form-card">
            <h2 className="user-form-card-title">{LockIcon} Sécurité &amp; Mot de Passe</h2>
            <div className="user-form-row">
              <div className="user-form-col">
                <Input name="password" value={formData.password} onChange={handleChange} label={isEdit ? 'Nouveau mot de passe (optionnel)' : 'Mot de passe *'} type="password" placeholder="••••••••" />
              </div>
              <div className="user-form-col">
                <Input name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} label="Confirmer le mot de passe" type="password" placeholder="••••••••" />
              </div>
            </div>
            <label className="user-form-checkbox-label">
              <input type="checkbox" name="force_password_change" checked={formData.force_password_change} onChange={handleChange} />
              <span>Forcer le changement de mot de passe à la première connexion</span>
            </label>
          </Card>

        </div>

        <div className="user-form-sidebar">

          <Card className="user-form-card user-form-photo-card">
            <h2 className="user-form-photo-title">Photo de Profil</h2>
            {avatarPreview ? (
              <div className="user-form-photo-preview-container">
                <div className="user-form-photo-preview">
                  <img src={avatarPreview} alt="Avatar" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
                  <Button variant="outline" style={{ color: 'var(--text-secondary)' }} onClick={() => document.getElementById('avatar-upload').click()}>
                    Changer l'image
                  </Button>
                  <Button variant="outline" style={{ color: 'var(--error-text)', borderColor: 'var(--error-border)' }} onClick={() => { setAvatarPreview(null); setAvatarFile(null); }}>
                    Supprimer l'image
                  </Button>
                </div>
              </div>
            ) : (
              <div className="user-form-upload-container" onClick={() => document.getElementById('avatar-upload').click()} style={{ cursor: 'pointer' }}>
                <div className="user-form-upload-zone">
                  {UploadCloudIcon}
                  <div className="user-form-upload-text">Glisser ou Cliquez</div>
                </div>
                <div className="user-form-upload-subtext">JPG, PNG ou SVG. Max 2MB.</div>
              </div>
            )}
            <input type="file" id="avatar-upload" style={{ display: 'none' }} accept="image/*" onChange={handleAvatarChange} />
          </Card>

          <Card className="user-form-card">
            <h2 className="user-form-card-title" style={{ border: 'none', margin: '0 0 var(--spacing-4) 0', padding: 0 }}>Statut du Compte</h2>
            <div className="user-form-status-box">
              <div className="user-form-status-text">
                <div className="user-form-status-label">Activer Immédiatement</div>
                <div className="user-form-status-desc">L'utilisateur recevra un mail.</div>
              </div>
              <Switch
                checked={formData.is_active}
                onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
              />
            </div>
          </Card>

        </div>
      </div>

      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => { setSuccessModalOpen(false); navigate('/users'); }}
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

export default UserForm;
