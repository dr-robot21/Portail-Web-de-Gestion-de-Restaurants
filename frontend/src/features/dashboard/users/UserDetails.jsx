import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import Switch from '../../../components/ui/Switch';
import './UserDetails.css';

const UserDetails = () => {
  const navigate = useNavigate();

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
      <path d="M8 6h.01"></path>
      <path d="M16 6h.01"></path>
      <path d="M12 6h.01"></path>
      <path d="M12 10h.01"></path>
      <path d="M12 14h.01"></path>
      <path d="M16 10h.01"></path>
      <path d="M16 14h.01"></path>
      <path d="M8 10h.01"></path>
      <path d="M8 14h.01"></path>
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

  return (
    <div className="user-details-page">
      <div className="user-details-breadcrumb">
        <Link to="/users">Utilisateurs</Link> &gt; <span>Détails de l'utilisateur</span>
      </div>

      <div className="user-details-header">
        <div>
          <h1 className="user-details-title">Jean Dupont</h1>
          <Badge variant="default" style={{ backgroundColor: '#fef2f2', color: '#dc2626', marginTop: 'var(--spacing-2)' }}>
            Administrateur
          </Badge>
        </div>
        <div className="user-details-actions">
          <Button variant="outline" onClick={() => navigate('/users')}>
            {ArrowLeftIcon} Retour
          </Button>
          <Button variant="primary" style={{ backgroundColor: 'var(--error-text)', borderColor: 'var(--error-text)' }} onClick={() => navigate('/users/edit/1')}>
            {EditIcon} Modifier
          </Button>
        </div>
      </div>

      <div className="user-details-grid">
        <div className="user-details-main">
          
          <Card className="user-details-card">
            <h2 className="user-details-card-title">
              {UserIcon} Informations Personnelles
            </h2>
            <div className="user-details-info-grid">
              <div className="user-details-info-col">
                <div className="user-details-label">NOM COMPLET</div>
                <div className="user-details-value">Jean Dupont</div>
              </div>
              <div className="user-details-info-col">
                <div className="user-details-label">EMAIL</div>
                <div className="user-details-value">jean.dupont@culinaryintel.com</div>
              </div>
              <div className="user-details-info-col" style={{ marginTop: 'var(--spacing-4)' }}>
                <div className="user-details-label">NUMÉRO DE TÉLÉPHONE</div>
                <div className="user-details-value">+33 6 12 34 56 78</div>
              </div>
              <div className="user-details-info-col" style={{ marginTop: 'var(--spacing-4)' }}>
                <div className="user-details-label">DATE D'INSCRIPTION</div>
                <div className="user-details-value">15 Mars 2022</div>
              </div>
            </div>
          </Card>

          <Card className="user-details-card">
            <div className="user-details-card-header-flex">
              <h2 className="user-details-card-title" style={{ margin: 0, padding: 0, border: 'none' }}>
                {BuildingIcon} Établissements Rattachés
              </h2>
              <a href="#" className="user-details-manage-link">Gérer</a>
            </div>
            
            <div className="user-details-establishment-list">
              <div className="user-details-establishment-item">
                <div className="user-details-establishment-icon">
                  {CutleryIcon}
                </div>
                <div className="user-details-establishment-info">
                  <div className="user-details-establishment-name">Le Bistrot Parisien</div>
                  <div className="user-details-establishment-location">Paris, France</div>
                </div>
                <div className="user-details-establishment-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
              </div>

              <div className="user-details-establishment-item">
                <div className="user-details-establishment-icon">
                  {CutleryIcon}
                </div>
                <div className="user-details-establishment-info">
                  <div className="user-details-establishment-name">La Table d'Or</div>
                  <div className="user-details-establishment-location">Lyon, France</div>
                </div>
                <div className="user-details-establishment-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
              </div>
            </div>
          </Card>

        </div>

        <div className="user-details-sidebar">
          
          <Card className="user-details-card">
            <h2 className="user-details-card-title">
              {LockIcon} Statut du Compte
            </h2>
            <div className="user-details-status-row">
              <div className="user-details-status-label">Statut Actuel</div>
              <div className="user-details-status-value">
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block', marginRight: '6px' }}></span>
                Actif
              </div>
            </div>
            <div className="user-details-status-row">
              <div className="user-details-status-label">Dernière<br/>Connexion</div>
              <div className="user-details-status-value-sub">Aujourd'hui,<br/>09:42</div>
            </div>
            
            <div className="user-details-toggle-container">
              <div className="user-details-toggle-label">Activer le compte</div>
              <Switch checked={true} onChange={() => {}} />
            </div>
          </Card>

          <Card className="user-details-card">
            <h2 className="user-details-card-title">
              {ShieldIcon} Sécurité
            </h2>
            <div className="user-details-security-label">Dernier changement de mot de passe</div>
            <div className="user-details-security-value">Il y a 3 mois</div>
            
            <Button variant="outline" className="user-details-reset-btn" style={{ width: '100%', marginTop: 'var(--spacing-4)', color: 'var(--text-secondary)' }}>
              {RefreshIcon} Réinitialiser le mot de passe
            </Button>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default UserDetails;
