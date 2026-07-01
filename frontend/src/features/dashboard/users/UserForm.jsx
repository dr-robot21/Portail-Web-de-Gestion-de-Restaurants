import React, { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Switch from '../../../components/ui/Switch';
import './UserForm.css';

const UserForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

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

  const EyeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
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
      <polyline points="16 16 12 12 8 16"></polyline>
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
          <Button variant="outline" onClick={() => navigate('/users')}>Annuler</Button>
          <Button variant="primary" style={{ backgroundColor: 'var(--error-text)', borderColor: 'var(--error-text)' }}>
            {isEdit ? 'Enregistrer' : 'Créer l\'utilisateur'}
          </Button>
        </div>
      </div>

      <div className="user-form-grid">
        <div className="user-form-main">
          
          <Card className="user-form-card">
            <h2 className="user-form-card-title">{UserIcon} Informations Personnelles</h2>
            <div className="user-form-row">
              <div className="user-form-col">
                <Input label="Prénom" defaultValue={isEdit ? "Jean" : ""} />
              </div>
              <div className="user-form-col">
                <Input label="Nom" defaultValue={isEdit ? "Dupont" : ""} />
              </div>
            </div>
            <div className="user-form-row" style={{ marginTop: 'var(--spacing-4)' }}>
              <div className="user-form-col">
                <Input label="Email Professionnel" type="email" defaultValue={isEdit ? "jean.dupont@hospitalityos.fr" : ""} />
              </div>
              <div className="user-form-col">
                <Input label="Numéro de Téléphone" defaultValue={isEdit ? "+33 6 00 00 00 00" : ""} />
              </div>
            </div>
          </Card>

          <Card className="user-form-card">
            <h2 className="user-form-card-title">{ShieldIcon} Rôle du Compte</h2>
            <div className="ui-input-header"><label className="ui-input-label">Type d'Accès</label></div>
            <div className="ui-input-wrapper">
              <select className="user-form-select" defaultValue={isEdit ? "Administrateur" : ""}>
                {!isEdit && <option value="">Sélectionner un rôle</option>}
                <option value="Administrateur">Administrateur</option>
                <option value="Manager">Manager</option>
                <option value="Serveur">Serveur</option>
              </select>
            </div>
            
            <div className="user-form-info-box">
              {InfoIcon}
              <span>Le rôle définit les permissions globales de l'utilisateur sur la plateforme HospitalityOS.</span>
            </div>
          </Card>

          <Card className="user-form-card">
            <h2 className="user-form-card-title">{LockIcon} Sécurité & Mot de Passe</h2>
            <div className="user-form-row">
              <div className="user-form-col">
                <Input label="Mot de passe temporaire" type="password" defaultValue="••••••••" icon={EyeIcon} />
              </div>
              <div className="user-form-col">
                <Input label="Confirmer le mot de passe" type="password" defaultValue="••••••••" />
              </div>
            </div>
            
            <label className="user-form-checkbox-label">
              <input type="checkbox" defaultChecked={!isEdit} />
              <span>Forcer le changement de mot de passe à la première connexion</span>
            </label>
          </Card>

        </div>

        <div className="user-form-sidebar">
          
          <Card className="user-form-card user-form-photo-card">
            <h2 className="user-form-photo-title">Photo de Profil</h2>
            
            {isEdit ? (
              <div className="user-form-photo-preview-container">
                <div className="user-form-photo-preview">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" alt="Avatar" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
                  <Button variant="outline" style={{ color: 'var(--text-secondary)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> 
                    Changer l'image
                  </Button>
                  <Button variant="outline" style={{ color: 'var(--error-text)', borderColor: 'var(--error-border)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> 
                    Supprimer l'image
                  </Button>
                </div>
              </div>
            ) : (
              <div className="user-form-upload-container">
                <div className="user-form-upload-zone">
                  {UploadCloudIcon}
                  <div className="user-form-upload-text">Glisser ou Cliquez</div>
                </div>
                <div className="user-form-upload-subtext">JPG, PNG ou SVG. Max 2MB.</div>
              </div>
            )}
          </Card>

          <Card className="user-form-card">
            <h2 className="user-form-card-title" style={{ border: 'none', margin: '0 0 var(--spacing-4) 0', padding: 0 }}>Statut du Compte</h2>
            <div className="user-form-status-box">
              <div className="user-form-status-text">
                <div className="user-form-status-label">Activer Immédiatement</div>
                <div className="user-form-status-desc">L'utilisateur recevra un mail.</div>
              </div>
              <Switch checked={true} onChange={() => {}} />
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default UserForm;
