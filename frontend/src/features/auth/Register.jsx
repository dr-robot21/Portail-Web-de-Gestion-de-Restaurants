import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../store/slices/authSlice';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Alert from '../../components/ui/Alert';

const Register = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    restaurant_name: '',
    country: '',
    address: '',
    city: '',
    postal_code: '',
    phone: '',
    website: '',
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/restaurant-dashboard');
    }
    return () => {
      if (error) dispatch(clearError());
    };
  }, [isAuthenticated, user, navigate, dispatch, error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.password_confirmation) {
      // Basic client validation could go here, for now just allow proceed
    }
    setStep(2);
  };

  const handleBack = () => setStep(1);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  const AlertCircleIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  );

  const ArrowLeftIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  );

  const renderError = () => {
    if (!error) return null;
    
    // Parse backend validation errors
    let errorMsg = error;
    if (typeof error === 'object') {
       errorMsg = Object.values(error).flat().join(' ');
    }
    
    return (
      <div style={{ marginBottom: 'var(--spacing-6)' }}>
        <Alert 
          type="error" 
          title="Échec de l'inscription"
          icon={AlertCircleIcon}
          style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c' }}
        >
          <span style={{ color: '#dc2626' }}>{errorMsg}</span>
        </Alert>
      </div>
    );
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: 'var(--spacing-8) 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-8)' }}>
        <h1 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)', margin: '0 0 var(--spacing-2) 0' }}>
          Inscription Admin
        </h1>
        <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', margin: 0 }}>
          Créez votre compte et configurez votre restaurant
        </p>
      </div>

      <Card style={{ padding: 'var(--spacing-8)', boxShadow: 'var(--shadow-md)' }}>
        {renderError()}

        <form onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()}>
          {step === 1 && (
            <div>
              <div style={{ marginBottom: 'var(--spacing-6)' }}>
                <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-2xl)', fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)', margin: '0 0 var(--spacing-2) 0' }}>
                  Créez votre compte
                </h2>
                <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                  Saisissez vos informations personnelles pour commencer.
                </p>
              </div>

              <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-4)' }}>
                <div style={{ flex: 1 }}>
                  <Input name="name" value={formData.name} onChange={handleChange} label={<span>Nom complet <span style={{ color: 'var(--error-text)' }}>*</span></span>} placeholder="Ex: Zakaria Chargaoui" />
                </div>
              </div>

              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                <Input name="email" value={formData.email} onChange={handleChange} label={<span>Email <span style={{ color: 'var(--error-text)' }}>*</span></span>} type="email" placeholder="Ex: admin@example.com" />
              </div>

              <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-4)' }}>
                <div style={{ flex: 1 }}>
                  <Input name="password" value={formData.password} onChange={handleChange} label={<span>Mot de passe <span style={{ color: 'var(--error-text)' }}>*</span></span>} type="password" placeholder="••••••••••" />
                </div>
                <div style={{ flex: 1 }}>
                  <Input name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} label={<span>Confirmer mot de passe <span style={{ color: 'var(--error-text)' }}>*</span></span>} type="password" placeholder="••••••••••" />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: 'var(--spacing-6)', mt: 6 }}>
                <div style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)' }}>
                  Vous avez déjà un compte ? <Link to="/login" style={{ color: '#475569', fontWeight: 'var(--weight-bold)', textDecoration: 'none' }}>Se connecter</Link>
                </div>
                <Button type="button" variant="primary" onClick={handleNext} style={{ backgroundColor: '#c53030', borderColor: '#c53030', paddingLeft: 'var(--spacing-6)', paddingRight: 'var(--spacing-6)' }}>
                  Suivant <span style={{ marginLeft: '8px' }}>→</span>
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
                <Input name="restaurant_name" value={formData.restaurant_name} onChange={handleChange} label={<span>Nom du Restaurant <span style={{ color: 'var(--error-text)' }}>*</span></span>} placeholder="Ex: Le Gourmet" />
              </div>

              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                <div className="ui-input-header">
                  <label className="ui-input-label">Pays <span style={{ color: 'var(--error-text)' }}>*</span></label>
                </div>
                <div className="ui-input-wrapper">
                  <select name="country" value={formData.country} onChange={handleChange} style={{ width: '100%', border: 'none', background: 'transparent', padding: 'var(--spacing-3) var(--spacing-4)', fontFamily: 'var(--font-family)', fontSize: 'var(--font-md)', color: 'var(--text-primary)', outline: 'none' }}>
                    <option value="">Sélectionner un pays</option>
                    <option value="Maroc">Maroc</option>
                    <option value="France">France</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                <Input name="address" value={formData.address} onChange={handleChange} label={<span>Adresse <span style={{ color: 'var(--error-text)' }}>*</span></span>} placeholder="Ex: 23 Culinary Blvd, Suite 400" />
              </div>

              <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-4)' }}>
                <div style={{ flex: 1 }}>
                  <Input name="city" value={formData.city} onChange={handleChange} label={<span>Ville <span style={{ color: 'var(--error-text)' }}>*</span></span>} placeholder="Ex: Casablanca" />
                </div>
                <div style={{ flex: 1 }}>
                  <Input name="postal_code" value={formData.postal_code} onChange={handleChange} label={<span>Code postal <span style={{ color: 'var(--error-text)' }}>*</span></span>} placeholder="Ex: 65080" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-8)' }}>
                <div style={{ flex: 1 }}>
                  <Input name="phone" value={formData.phone} onChange={handleChange} label={<span>Numéro de téléphone <span style={{ color: 'var(--error-text)' }}>*</span></span>} placeholder="Ex: +212 6 36 33 81 00" />
                </div>
                <div style={{ flex: 1 }}>
                  <Input name="website" value={formData.website} onChange={handleChange} label={<span>Site web</span>} placeholder="Ex: www.example.com" />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: 'var(--spacing-6)' }}>
                <Button type="button" variant="outline" onClick={handleBack} style={{ color: '#475569' }} disabled={loading}>
                  {ArrowLeftIcon} Retour
                </Button>
                <Button type="submit" variant="primary" style={{ backgroundColor: '#c53030', borderColor: '#c53030' }} disabled={loading}>
                  {loading ? 'Inscription...' : "Terminer l'inscription"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
};

export default Register;
