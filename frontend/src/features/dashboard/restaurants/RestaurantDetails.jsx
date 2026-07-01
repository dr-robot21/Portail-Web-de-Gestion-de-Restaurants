import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import './RestaurantDetails.css';

const RestaurantDetails = () => {
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

  const TrashIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  );

  const InfoIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );

  const ContactIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );

  const CutleryIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
      <path d="M7 2v20"></path>
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
    </svg>
  );
  
  const CutleryIconSmall = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
      <path d="M7 2v20"></path>
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
    </svg>
  );

  const ChartIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  );

  const ClockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--error-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );

  const MapPinIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );

  const MapIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
      <line x1="8" y1="2" x2="8" y2="18"></line>
      <line x1="16" y1="6" x2="16" y2="22"></line>
    </svg>
  );

  const MailIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );

  const GlobeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  );

  const PhoneIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  );

  return (
    <div className="restaurant-details-page">
      <Link to="/restaurants" className="restaurant-details-back">
        {ArrowLeftIcon} Retour à la liste
      </Link>

      <Card className="restaurant-details-header-card">
        <div className="restaurant-details-header-content">
          <div className="restaurant-details-logo">
            <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" alt="Lumina Prime" />
          </div>
          <div className="restaurant-details-header-info">
            <div className="restaurant-details-header-top">
              <span className="restaurant-details-id-badge">#RES-001</span>
              <Badge variant="success">
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block', marginRight: '4px' }}></span>
                Active
              </Badge>
            </div>
            <h1 className="restaurant-details-name">Lumina Prime</h1>
            <div className="restaurant-details-location">
              {MapPinIcon} Metropolis Downtown
            </div>
          </div>
        </div>
        <div className="restaurant-details-header-actions">
          <Button variant="outline" onClick={() => navigate('/restaurants/edit/1')} style={{ color: 'var(--text-secondary)' }}>
            {EditIcon} Modifier
          </Button>
          <Button variant="outline" style={{ color: 'var(--error-text)', borderColor: 'var(--error-border)' }}>
            {TrashIcon} Supprimer
          </Button>
        </div>
      </Card>

      <div className="restaurant-details-grid">
        <div className="restaurant-details-main">
          
          <Card className="restaurant-details-card">
            <h2 className="restaurant-details-card-title">
              {InfoIcon} Informations Générales
            </h2>
            <div className="restaurant-details-info-grid">
              <div className="restaurant-details-info-col" style={{ gridColumn: 'span 2' }}>
                <div className="restaurant-details-label">DESCRIPTION</div>
                <div className="restaurant-details-value">
                  Lumina Prime is a premier fine dining establishment blending classical French gastronomy with modern molecular techniques. Known for its impeccable service and award-winning tasting menus.
                </div>
              </div>
              <div className="restaurant-details-info-col">
                <div className="restaurant-details-label">TYPE DE CUISINE</div>
                <div className="restaurant-details-value" style={{ fontWeight: 'var(--weight-bold)' }}>French Gastronomy</div>
                
                <div className="restaurant-details-label" style={{ marginTop: 'var(--spacing-4)' }}>DATE D'OUVERTURE</div>
                <div className="restaurant-details-value" style={{ fontWeight: 'var(--weight-bold)' }}>15 Octobre 2018</div>
              </div>
            </div>
          </Card>

          <Card className="restaurant-details-card">
            <h2 className="restaurant-details-card-title">
              {ContactIcon} Contact & Emplacement
            </h2>
            <div className="restaurant-details-contact-grid">
              <div>
                <div className="restaurant-details-label">ADRESSE</div>
                <div className="restaurant-details-contact-item" style={{ alignItems: 'flex-start' }}>
                  <div style={{ marginTop: '2px', color: 'var(--text-secondary)' }}>{MapIcon}</div>
                  <div>
                    1240 Downtown Ave<br/>
                    Metropolis, NY 10001
                  </div>
                </div>
                <div className="restaurant-details-contact-item" style={{ marginTop: 'var(--spacing-4)' }}>
                  <div style={{ color: 'var(--text-secondary)' }}>{PhoneIcon}</div>
                  <div>+1 (555) 123-4567</div>
                </div>
              </div>
              <div>
                <div className="restaurant-details-contact-item" style={{ marginTop: 'var(--spacing-6)' }}>
                  <div style={{ color: 'var(--error-text)' }}>{MailIcon}</div>
                  <div style={{ color: 'var(--error-text)' }}>gm@lumina.com</div>
                </div>
                <div className="restaurant-details-contact-item" style={{ marginTop: 'var(--spacing-4)' }}>
                  <div style={{ color: 'var(--error-text)' }}>{GlobeIcon}</div>
                  <div style={{ color: 'var(--error-text)' }}>www.luminaprime.com</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="restaurant-details-card">
            <h2 className="restaurant-details-card-title">
              {CutleryIcon} Menu & Plats
            </h2>
            <div className="restaurant-details-menu-actions">
              <Button variant="primary" style={{ backgroundColor: 'var(--error-text)', borderColor: 'var(--error-text)' }} onClick={() => navigate('/restaurants/1/menu')}>
                {CutleryIconSmall} Gérer le Menu
              </Button>
              <Button variant="primary" style={{ backgroundColor: 'var(--error-text)', borderColor: 'var(--error-text)' }} onClick={() => navigate('/menu')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> 
                Gérer les Plats
              </Button>
            </div>
          </Card>

        </div>

        <div className="restaurant-details-sidebar">
          
          <Card className="restaurant-details-card">
            <h2 className="restaurant-details-card-title">
              {ChartIcon} Performances
            </h2>
            <div className="restaurant-details-stat-box">
              <div className="restaurant-details-stat-icon">
                {CutleryIconSmall}
              </div>
              <div className="restaurant-details-stat-label">Plats au menu</div>
              <div className="restaurant-details-stat-value">45</div>
            </div>
            <div className="restaurant-details-stat-box" style={{ marginTop: 'var(--spacing-4)' }}>
              <div className="restaurant-details-stat-icon">
                {CutleryIconSmall}
              </div>
              <div className="restaurant-details-stat-label">Plats au menu</div>
              <div className="restaurant-details-stat-value">45</div>
            </div>
          </Card>

          <Card className="restaurant-details-card">
            <h2 className="restaurant-details-card-title">
              {ClockIcon} Horaires d'ouverture
            </h2>
            <div className="restaurant-details-hours-row">
              <div className="restaurant-details-hours-day">Lundi - Jeudi</div>
              <div className="restaurant-details-hours-time">12:00 - 22:30</div>
            </div>
            <div className="restaurant-details-hours-row">
              <div className="restaurant-details-hours-day">Vendredi - Samedi</div>
              <div className="restaurant-details-hours-time" style={{ color: 'var(--error-text)', fontWeight: 'var(--weight-bold)' }}>12:00 - 23:30</div>
            </div>
            <div className="restaurant-details-hours-row">
              <div className="restaurant-details-hours-day">Dimanche</div>
              <div className="restaurant-details-hours-time">Fermé</div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
