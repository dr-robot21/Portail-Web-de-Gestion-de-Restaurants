import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Switch from '../../../components/ui/Switch';
import './AddDish.css';

const AddDish = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);

  const CloudUploadIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
      <polyline points="16 16 12 12 8 16"></polyline>
      <line x1="12" y1="12" x2="12" y2="21"></line>
    </svg>
  );

  return (
    <div className="add-dish-page">
      <div className="add-dish-breadcrumb">
        <Link to="/menu">Menu Management</Link> &gt; <span>Nouveau Plat</span>
      </div>

      <div className="add-dish-header">
        <h1 className="add-dish-title">Ajouter un Plat</h1>
        <div className="add-dish-header-actions">
          <Button variant="outline" onClick={() => navigate('/menu')}>Annuler</Button>
          <Button variant="primary">Enregistrer</Button>
        </div>
      </div>

      <div className="add-dish-layout">
        <div className="add-dish-main">
          {/* Informations Générales */}
          <Card className="add-dish-card">
            <h2 className="add-dish-card-title">Informations Générales</h2>
            <div className="add-dish-form-group">
              <Input label="Nom du Plat *" placeholder="Ex: Filet de Bœuf Rossini" />
            </div>
            <div className="add-dish-form-group">
              <div className="ui-input-header">
                <label className="ui-input-label">Description (Menu) *</label>
              </div>
              <textarea 
                className="add-dish-textarea" 
                placeholder="Description appétissante pour le client..."
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
                <Input label="Prix de vente *" placeholder="€ 0.00" />
              </div>
              <div className="add-dish-col">
                <div className="ui-input-header">
                  <label className="ui-input-label">Catégorie *</label>
                </div>
                <div className="ui-input-wrapper">
                  <select className="add-dish-select">
                    <option>Sélectionner une catégorie</option>
                    <option>Plats Principaux</option>
                    <option>Entrées</option>
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
                <span className="add-dish-tag">Sans Gluten</span>
                <span className="add-dish-tag">Fruits à coque</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="add-dish-sidebar">
          {/* Image du Plat */}
          <Card className="add-dish-card">
            <h2 className="add-dish-card-title">Image du Plat</h2>
            <div className="add-dish-upload-area">
              <div className="add-dish-upload-icon-circle">
                {CloudUploadIcon}
              </div>
              <p className="add-dish-upload-text"><strong>Glissez une image ici</strong><br/>ou cliquez pour parcourir</p>
              <p className="add-dish-upload-subtext">JPG, PNG max 5MB (1:1 recommandé)</p>
            </div>
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
    </div>
  );
};

export default AddDish;
