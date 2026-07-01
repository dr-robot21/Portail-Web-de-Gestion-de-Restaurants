import React from 'react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import './Settings.css';

const Settings = () => {
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
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" 
              alt="Profile" 
              className="settings-profile-avatar" 
            />
            <div className="settings-profile-edit-badge">
              {EditBadgeIcon}
            </div>
          </div>
          <div className="settings-profile-info">
            <h3 className="settings-profile-title">Photo de profil</h3>
            <p className="settings-profile-desc">PNG ou JPG. Max 5MB.</p>
            <div className="settings-profile-actions">
              <Button variant="primary" size="sm">Modifier</Button>
              <Button variant="outline" size="sm" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)' }}>Supprimer</Button>
            </div>
          </div>
        </div>

        <div className="settings-form-row">
          <div className="settings-form-col">
            <Input label="PRÉNOM" defaultValue="Jean" />
          </div>
          <div className="settings-form-col">
            <Input label="NOM" defaultValue="Dupont" />
          </div>
        </div>

        <div className="settings-form-group">
          <Input label="ADRESSE E-MAIL" defaultValue="jean.dupont@culinary-intelligence.com" type="email" />
        </div>

        <div className="settings-form-group">
          <Input label="NUMÉRO DE TÉLÉPHONE" defaultValue="+33 1 23 45 67 89" />
        </div>
      </Card>

      <Card className="settings-card">
        <h2 className="settings-card-title">
          {LockIcon} Sécurité
        </h2>

        <Alert type="info" icon={InfoIcon} className="settings-security-alert">
          Votre mot de passe doit comporter au moins 12 caractères, incluant des lettres majuscules, minuscules, des chiffres et des caractères spéciaux.
        </Alert>

        <div className="settings-form-group">
          <Input label="MOT DE PASSE ACTUEL" type="password" defaultValue="••••••••••••" />
        </div>

        <div className="settings-form-row">
          <div className="settings-form-col">
            <Input label="NOUVEAU MOT DE PASSE" type="password" />
          </div>
          <div className="settings-form-col">
            <Input label="CONFIRMER LE MOT DE PASSE" type="password" />
          </div>
        </div>
      </Card>

      <div className="settings-footer-actions">
        <Button variant="outline">Annuler</Button>
        <Button variant="primary">
          {SaveIcon} Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
};

export default Settings;
