import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../store/slices/authSlice';
import api from '../../services/api';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import SuccessModal from '../../components/ui/SuccessModal';
import ErrorModal from '../../components/ui/ErrorModal';
import './Settings.css';

const Settings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const [profileData, setProfileData] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });
  const [passwordData, setPasswordData] = useState({ current_password: '', password: '', password_confirmation: '' });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar_url || user?.avatar || null);
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setRemoveAvatar(false);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setRemoveAvatar(true);
    setAvatarPreview(null);
  };

  const handleSaveProfile = async () => {
    try {
      setSavingProfile(true);
      const formData = new FormData();
      formData.append('name', profileData.name);
      formData.append('email', profileData.email);
      formData.append('phone', profileData.phone);
      if (avatarFile) formData.append('avatar', avatarFile);
      if (removeAvatar) formData.append('remove_avatar', '1');
      formData.append('_method', 'PUT');

      await api.post('/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setModalMessage('Profil mis à jour avec succès.');
      setSuccessModalOpen(true);
      setRemoveAvatar(false);
      dispatch(fetchCurrentUser()); // Refresh user state
    } catch (err) {
      setModalMessage(err.response?.data?.message || 'Erreur lors de la mise à jour du profil.');
      setErrorModalOpen(true);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSavePassword = async () => {
    if (passwordData.password !== passwordData.password_confirmation) {
      setModalMessage('Les mots de passe ne correspondent pas.');
      setErrorModalOpen(true);
      return;
    }
    try {
      setSavingPassword(true);
      await api.put('/profile/password', passwordData);
      setModalMessage('Mot de passe modifié avec succès.');
      setSuccessModalOpen(true);
      setPasswordData({ current_password: '', password: '', password_confirmation: '' });
    } catch (err) {
      const msg = err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat().join(' ')
        : err.response?.data?.message || 'Erreur lors du changement de mot de passe.';
      setModalMessage(msg);
      setErrorModalOpen(true);
    } finally {
      setSavingPassword(false);
    }
  };

  const UserIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const LockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );

  const InfoIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );

  const EditBadgeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  );

  const SaveIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  );

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1 className="settings-title">Paramètres du compte</h1>
        <p className="settings-subtitle">Gérez vos informations personnelles et vos préférences de sécurité.</p>
      </div>

      <Card className="settings-card">
        <h2 className="settings-card-title">
          {UserIcon} Informations personnelles
        </h2>

        <div className="settings-profile-section">
          <div className="settings-profile-avatar-wrapper">
            <img
              src={avatarPreview || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=b91c1c&color=fff`}
              alt="Profile"
              className="settings-profile-avatar"
            />
            <div className="settings-profile-edit-badge" onClick={() => document.getElementById('settings-avatar-upload').click()} style={{ cursor: 'pointer' }}>
              {EditBadgeIcon}
            </div>
            <input type="file" id="settings-avatar-upload" style={{ display: 'none' }} accept="image/*" onChange={handleAvatarChange} />
          </div>
          <div className="settings-profile-info">
            <h3 className="settings-profile-title">Photo de profil</h3>
            <p className="settings-profile-desc">PNG ou JPG. Max 5MB.</p>
            <div className="settings-profile-actions">
              <Button variant="primary" size="sm" onClick={() => document.getElementById('settings-avatar-upload').click()}>Modifier</Button>
              <Button variant="outline" size="sm" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)' }} onClick={handleRemoveAvatar}>Supprimer</Button>
            </div>
          </div>
        </div>

        <div className="settings-form-row">
          <div className="settings-form-col">
            <Input name="name" value={profileData.name} onChange={handleProfileChange} label="NOM COMPLET" placeholder="Jean Dupont" />
          </div>
        </div>

        <div className="settings-form-group">
          <Input name="email" value={profileData.email} onChange={handleProfileChange} label="ADRESSE E-MAIL" type="email" placeholder="email@exemple.com" />
        </div>

        <div className="settings-form-group">
          <Input name="phone" value={profileData.phone} onChange={handleProfileChange} label="NUMÉRO DE TÉLÉPHONE" placeholder="+33 1 23 45 67 89" />
        </div>

        <div className="settings-footer-actions" style={{ marginTop: 'var(--spacing-4)', padding: 0, border: 'none' }}>
          <Button variant="primary" onClick={handleSaveProfile} disabled={savingProfile}>
            {SaveIcon} {savingProfile ? 'Enregistrement...' : 'Enregistrer le profil'}
          </Button>
        </div>
      </Card>

      <Card className="settings-card">
        <h2 className="settings-card-title">
          {LockIcon} Sécurité
        </h2>

        <Alert type="info" icon={InfoIcon} className="settings-security-alert">
          Votre mot de passe doit comporter au moins 8 caractères, incluant des lettres majuscules, minuscules, des chiffres et des caractères spéciaux.
        </Alert>

        <div className="settings-form-group">
          <Input name="current_password" value={passwordData.current_password} onChange={handlePasswordChange} label="MOT DE PASSE ACTUEL" type="password" placeholder="••••••••••••" />
        </div>

        <div className="settings-form-row">
          <div className="settings-form-col">
            <Input name="password" value={passwordData.password} onChange={handlePasswordChange} label="NOUVEAU MOT DE PASSE" type="password" placeholder="••••••••" />
          </div>
          <div className="settings-form-col">
            <Input name="password_confirmation" value={passwordData.password_confirmation} onChange={handlePasswordChange} label="CONFIRMER LE MOT DE PASSE" type="password" placeholder="••••••••" />
          </div>
        </div>

        <div className="settings-footer-actions" style={{ marginTop: 'var(--spacing-4)', padding: 0, border: 'none' }}>
          <Button variant="primary" onClick={handleSavePassword} disabled={savingPassword}>
            {SaveIcon} {savingPassword ? 'Modification...' : 'Changer le mot de passe'}
          </Button>
        </div>
      </Card>

      <SuccessModal isOpen={successModalOpen} onClose={() => setSuccessModalOpen(false)} message={modalMessage} />
      <ErrorModal isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} message={modalMessage} />
    </div>
  );
};

export default Settings;
