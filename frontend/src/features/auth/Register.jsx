import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const Register = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);
  const handleSubmit = () => {
    // Submit registration and redirect to dashboard
    navigate('/restaurant-dashboard');
  };

  const UploadCloudIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  );

  const ArrowLeftIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  );

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: 'var(--spacing-8) 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-8)' }}>
        <h1 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)', margin: '0 0 var(--spacing-2) 0' }}>
          Dashboard Admin Register
        </h1>
        <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', margin: 0 }}>
          Sign in to access the management console
        </p>
      </div>

      <Card style={{ padding: 'var(--spacing-8)', boxShadow: 'var(--shadow-md)' }}>
        {step === 1 && (
          <div>
            <div style={{ marginBottom: 'var(--spacing-6)' }}>
              <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)', margin: '0 0 var(--spacing-2) 0' }}>
                Créez votre compte
              </h2>
              <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                Saisissez vos informations personnelles pour commencer à configurer le profil de votre restaurant.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-4)' }}>
              <div style={{ flex: 1 }}><Input label={<span>Nom complete <span style={{ color: 'var(--error-text)' }}>*</span></span>} placeholder="Ex: Zakaria chargaoui" /></div>
              <div style={{ flex: 1 }}><Input label={<span>Username <span style={{ color: 'var(--error-text)' }}>*</span></span>} placeholder="Ex: ch_zakaria" /></div>
            </div>

            <div style={{ marginBottom: 'var(--spacing-4)' }}>
              <Input label={<span>Email <span style={{ color: 'var(--error-text)' }}>*</span></span>} type="email" placeholder="Ex: zakaria@gmail.com" />
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-4)' }}>
              <div style={{ flex: 1 }}><Input label={<span>Mot de passe <span style={{ color: 'var(--error-text)' }}>*</span></span>} type="password" placeholder="••••••••••" /></div>
              <div style={{ flex: 1 }}><Input label={<span>Confirmer mot de passe <span style={{ color: 'var(--error-text)' }}>*</span></span>} type="password" placeholder="••••••••••" /></div>
            </div>

            <div style={{ marginBottom: 'var(--spacing-8)' }}>
              <div className="ui-input-header"><label className="ui-input-label">Logo du Restaurant (Optionel)</label></div>
              <div style={{ border: '2px dashed #cbd5e1', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-6)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: '#f8fafc' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--spacing-3)' }}>
                  {UploadCloudIcon}
                </div>
                <div style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', fontWeight: 'var(--weight-bold)', color: '#64748b', marginBottom: 'var(--spacing-1)' }}>Cliquez pour ajouter</div>
                <div style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-xs)', color: '#94a3b8' }}>PNG, JPG (Max 2MB)</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: 'var(--spacing-6)' }}>
              <div style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                Vous avez déjà un compte ? <Link to="/login" style={{ color: '#475569', fontWeight: 'var(--weight-bold)', textDecoration: 'none' }}>Se connecter</Link>
              </div>
              <Button variant="primary" onClick={handleNext} style={{ backgroundColor: '#c53030', borderColor: '#c53030', paddingLeft: 'var(--spacing-6)', paddingRight: 'var(--spacing-6)' }}>
                suivant <span style={{ marginLeft: '8px' }}>→</span>
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ marginBottom: 'var(--spacing-6)' }}>
              <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)', margin: '0 0 var(--spacing-2) 0' }}>
                Informations sur le restaurant
              </h2>
              <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                Veuillez fournir des détails sur votre établissement culinaire.
              </p>
            </div>

            <div style={{ marginBottom: 'var(--spacing-4)' }}>
              <div className="ui-input-header">
                <label className="ui-input-label">Pays <span style={{ color: 'var(--error-text)' }}>*</span></label>
              </div>
              <div className="ui-input-wrapper">
                <select style={{ width: '100%', border: 'none', background: 'transparent', padding: 'var(--spacing-3) var(--spacing-4)', fontFamily: 'var(--font-family)', fontSize: 'var(--font-md)', color: 'var(--text-primary)', outline: 'none' }}>
                  <option value="">sélectionner un pays</option>
                  <option value="ma">Maroc</option>
                  <option value="fr">France</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--spacing-4)' }}>
              <Input label={<span>Adresse <span style={{ color: 'var(--error-text)' }}>*</span></span>} placeholder="Ex: 23 Culinary Blvd, Suite 400" />
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-4)' }}>
              <div style={{ flex: 1 }}><Input label={<span>Ville <span style={{ color: 'var(--error-text)' }}>*</span></span>} placeholder="Ex: Casablanca" /></div>
              <div style={{ flex: 1 }}><Input label={<span>code postal <span style={{ color: 'var(--error-text)' }}>*</span></span>} placeholder="Ex: 65080" /></div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-8)' }}>
              <div style={{ flex: 1 }}><Input label={<span>Numéro de téléphone <span style={{ color: 'var(--error-text)' }}>*</span></span>} placeholder="Ex: +212 6 36 33 81 00" /></div>
              <div style={{ flex: 1 }}><Input label={<span>Site web <span style={{ color: 'var(--error-text)' }}>*</span></span>} placeholder="Ex: www.example.com" /></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: 'var(--spacing-6)' }}>
              <Button variant="outline" onClick={handleBack} style={{ color: '#475569' }}>
                {ArrowLeftIcon} Retour
              </Button>
              <Button variant="primary" onClick={handleSubmit} style={{ backgroundColor: '#c53030', borderColor: '#c53030' }}>
                Terminer l'inscription
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Register;
