import React from 'react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import './Notifications.css';

const Notifications = () => {
  const SettingsIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  );

  const CheckIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <polyline points="20 6 9 17 4 12"></polyline>
      <polyline points="20 12 20 12"></polyline> {/* double check trick */}
      <path d="M15 12L9 18l-5-5" style={{ opacity: 0.5 }}></path>
    </svg>
  );

  const StoreIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );

  const UserPlusIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <line x1="20" y1="8" x2="20" y2="14"></line>
      <line x1="23" y1="11" x2="17" y2="11"></line>
    </svg>
  );

  const AlertTriangleIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  );

  const RefreshCwIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  );

  const FileTextIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <div>
          <h1 className="notifications-title">Centre du notifications</h1>
          {/* Using the text exactly as it appears in the mockup, even if it looks like a copy-paste error from Menu */}
          <p className="notifications-subtitle">Gérez votre menu, les prix et la disponibilité des plats.</p>
        </div>
        <div className="notifications-header-actions">
          <Button variant="outline" className="notifications-btn-param">
            {SettingsIcon} Paramètres
          </Button>
          <Button variant="primary">
            {CheckIcon} Tout marquer<br/>comme lu
          </Button>
        </div>
      </div>

      <Card className="notifications-card">
        {/* Section: Aujourd'hui */}
        <div className="notifications-section">
          <h2 className="notifications-section-title">Aujourd'hui</h2>
          
          <div className="notification-item">
            <div className="notification-icon notification-icon--red">
              {StoreIcon}
            </div>
            <div className="notification-content">
              <h3 className="notification-item-title">Nouveau restaurant créé</h3>
              <p className="notification-item-desc">Le restaurant "Bistro Central" a finalisé son intégration sur la plateforme et est prêt à être configuré.</p>
            </div>
            <div className="notification-meta">
              <span className="notification-time">Il y a 10 min</span>
              <span className="notification-unread-dot"></span>
            </div>
          </div>

          <div className="notification-item">
            <div className="notification-icon notification-icon--blue">
              {UserPlusIcon}
            </div>
            <div className="notification-content">
              <h3 className="notification-item-title">Nouvelle assignation</h3>
              <p className="notification-item-desc">Marc Tremblay a été assigné au rôle de Manager pour le restaurant "Bistro Central".</p>
            </div>
            <div className="notification-meta">
              <span className="notification-time">Il y a 1 h</span>
              <span className="notification-unread-dot"></span>
            </div>
          </div>

          <div className="notification-item">
            <div className="notification-icon notification-icon--gray">
              {AlertTriangleIcon}
            </div>
            <div className="notification-content">
              <h3 className="notification-item-title">Alerte de synchronisation</h3>
              <p className="notification-item-desc">Le menu de "La Trattoria" a rencontré une erreur de synchronisation avec les terminaux de paiement.</p>
            </div>
            <div className="notification-meta">
              <span className="notification-time">Il y a 3 h</span>
              {/* No unread dot */}
            </div>
          </div>
        </div>

        {/* Section: Plus tôt */}
        <div className="notifications-section notifications-section--alt">
          <h2 className="notifications-section-title">Plus tôt</h2>
          
          <div className="notification-item">
            <div className="notification-icon notification-icon--gray">
              {RefreshCwIcon}
            </div>
            <div className="notification-content">
              <h3 className="notification-item-title">Mise à jour du système</h3>
              <p className="notification-item-desc">La mise à jour de la plateforme v2.4 a été déployée avec succès. Aucun temps d'arrêt signalé.</p>
            </div>
            <div className="notification-meta">
              <span className="notification-time">Hier, 23:00</span>
            </div>
          </div>

          <div className="notification-item">
            <div className="notification-icon notification-icon--gray">
              {FileTextIcon}
            </div>
            <div className="notification-content">
              <h3 className="notification-item-title">Rapport mensuel généré</h3>
              <p className="notification-item-desc">Les rapports de performance globaux pour le mois de Mai sont maintenant disponibles en téléchargement.</p>
            </div>
            <div className="notification-meta">
              <span className="notification-time">Hier, 08:00</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="notifications-footer">
        <Button variant="outline" className="notifications-load-more">
          Charger plus
        </Button>
      </div>
    </div>
  );
};

export default Notifications;
