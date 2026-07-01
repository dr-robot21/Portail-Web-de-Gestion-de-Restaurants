import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Switch from '../../../components/ui/Switch';
import Modal from '../../../components/ui/Modal';
import './AddDish.css'; // Reusing CSS

const EditDish = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  const [saveModalOpen, setSaveModalOpen] = useState(true); // Default true for image_3.png mockup demonstration

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

  const SaveIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  );

  return (
    <div className="add-dish-page">
      <div className="add-dish-breadcrumb">
        <Link to="/menu">Menu Management</Link> &gt; <span>Nouveau Plat</span> {/* Keeping text from mockup exactly */}
      </div>

      <div className="add-dish-header">
        <h1 className="add-dish-title">Modifier le Plat</h1>
        <div className="add-dish-header-actions">
          <Button variant="outline" onClick={() => navigate('/menu')}>Annuler</Button>
          <Button variant="primary" onClick={() => setSaveModalOpen(true)}>
            {SaveIcon} Enregistrer les modifications
          </Button>
        </div>
      </div>

      <div className="add-dish-layout">
        <div className="add-dish-main">
          {/* Informations Générales */}
          <Card className="add-dish-card">
            <h2 className="add-dish-card-title">Informations Générales</h2>
            <div className="add-dish-form-group">
              <Input label="Nom du Plat *" value="Faux-filet Maturé" readOnly />
            </div>
            <div className="add-dish-form-group">
              <div className="ui-input-header">
                <label className="ui-input-label">Description (Menu) *</label>
              </div>
              <textarea 
                className="add-dish-textarea" 
                defaultValue="Notre faux-filet signature, maturé à sec pendant 45 jours pour une tendreté optimale et une concentration de saveurs intense. Servi avec une sauce au poivre vert."
                rows="4"
              ></textarea>
              <div className="add-dish-textarea-limit">0/150 caractères</div>
            </div>
          </Card>

          {/* Tarification & Détails */}
          <Card className="add-dish-card">
            <h2 className="add-dish-card-title">Tarification & Détails</h2>
            <div className="add-dish-row">
              <div className="add-dish-col">
                <Input label="Prix de vente *" value="€ 48.00" readOnly />
              </div>
              <div className="add-dish-col">
                <div className="ui-input-header">
                  <label className="ui-input-label">Catégorie *</label>
                </div>
                <div className="ui-input-wrapper">
                  <select className="add-dish-select" defaultValue="Plats Principaux">
                    <option>Sélectionner une catégorie</option>
                    <option value="Plats Principaux">Plats Principaux</option>
                    <option value="Entrées">Entrées</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="add-dish-form-group">
              <label className="ui-input-label" style={{ display: 'block', marginBottom: 'var(--spacing-2)' }}>
                Allergènes & Régimes
              </label>
              <div className="add-dish-tags">
                <span className="add-dish-tag">Végétarien</span>
                <span className="add-dish-tag" style={{ borderColor: 'var(--primary)', color: 'var(--primary)', backgroundColor: 'rgba(192, 57, 43, 0.05)' }}>Sans Gluten</span>
                <span className="add-dish-tag">Fruits à coque</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="add-dish-sidebar">
          {/* Image du Plat */}
          <Card className="add-dish-card">
            <h2 className="add-dish-card-title">Image du Plat</h2>
            
            <div style={{ marginBottom: 'var(--spacing-4)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1546833998-877b37c2e5c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Faux-filet" style={{ width: '100%', display: 'block' }} />
            </div>

            <Button fullWidth variant="outline" style={{ marginBottom: 'var(--spacing-2)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}>
              {EditIcon} Changer l'image
            </Button>
            
            <Button fullWidth variant="outline" style={{ color: 'var(--error-text)', borderColor: 'var(--error-border)', backgroundColor: 'transparent' }}>
              {TrashIcon} Supprimer l'image
            </Button>
          </Card>

          {/* Disponibilité */}
          <Card className="add-dish-card">
            <h2 className="add-dish-card-title">Disponibilité</h2>
            <div className="add-dish-availability">
              <div>
                <div className="add-dish-availability-title">Plat Actif</div>
                <div className="add-dish-availability-subtitle">Visible sur le menu client</div>
              </div>
              <Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} id="plat-actif-switch" />
            </div>
          </Card>
        </div>
      </div>

      {/* Save Confirmation Modal */}
      <Modal isOpen={saveModalOpen} onClose={() => setSaveModalOpen(false)} hideCloseButton={true} className="menu-delete-modal">
        <div style={{ textAlign: 'center', padding: 'var(--spacing-6) var(--spacing-4)' }}>
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '50%', 
            backgroundColor: '#f0f7ff', color: '#0369a1', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            margin: '0 auto var(--spacing-4)' 
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-xl)', margin: '0 0 var(--spacing-2) 0', color: 'var(--text-primary)' }}>
            Enregistrer les modifications
          </h2>
          <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-6)', lineHeight: '1.5' }}>
            Voulez-vous enregistrer les changements apportés au plat<br/>
            <strong>"Faux-filet Maturé"</strong> ?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-4)' }}>
            <Button variant="outline" onClick={() => setSaveModalOpen(false)}>Annuler</Button>
            <Button variant="primary" onClick={() => setSaveModalOpen(false)}>Enregistrer</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditDish;
