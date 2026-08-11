import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../store/slices/usersSlice';
import api from '../../../services/api';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Loader from '../../../components/ui/Loader';
import SuccessModal from '../../../components/ui/SuccessModal';
import ErrorModal from '../../../components/ui/ErrorModal';
import './RestaurantForm.css';

const RestaurantForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedManager, setSelectedManager] = useState(null);
  const [managerSearch, setManagerSearch] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    cuisine_type: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    postal_code: '',
    country: 'France',
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const { list: users, loading: usersLoading } = useSelector(state => state.users);

  const filteredManagers = users.filter(u => {
    const q = managerSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      String(u.id).includes(q)
    );
  });

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    dispatch(fetchUsers({ role: 'restaurant_admin', is_active: true }));
    if (isEdit) {
      (async () => {
        try {
          const res = await api.get(`/restaurants/${id}`);
          const r = res.data;
          setFormData({
            name: r.name || '',
            cuisine_type: r.cuisine_type || '',
            email: r.email || '',
            phone: r.phone || '',
            website: r.website || '',
            address: r.address || '',
            city: r.city || '',
            postal_code: r.postal_code || '',
            country: r.country || 'France',
          });
          if (r.logo_url) setLogoPreview(r.logo_url);
          if (r.admin) setSelectedManager(r.admin.id);
        } catch {
          setModalMessage("Erreur lors du chargement du restaurant.");
          setErrorModalOpen(true);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [dispatch, isEdit, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      if (logoFile) data.append('logo', logoFile);
      if (selectedManager) data.append('manager_id', selectedManager);

      if (isEdit) {
        data.append('_method', 'PUT');
        await api.post(`/restaurants/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        setModalMessage("Restaurant modifié avec succès.");
      } else {
        await api.post('/restaurants', data, { headers: { 'Content-Type': 'multipart/form-data' } });
        setModalMessage("Restaurant ajouté avec succès.");
      }
      setSuccessModalOpen(true);
    } catch (err) {
      const errors = err.response?.data?.errors;
      const msg = errors
        ? Object.values(errors).flat().join(' ')
        : err.response?.data?.message;
      setModalMessage(msg || "Une erreur est survenue lors de l'enregistrement.");
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const InfoIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );

  const ContactIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );

  const MapPinIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );

  const ClockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );

  const UserIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const ImageIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  );

  const SearchIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );

  const AddUserIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <line x1="20" y1="8" x2="20" y2="14"></line>
      <line x1="23" y1="11" x2="17" y2="11"></line>
    </svg>
  );

  const CheckIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  return (
    <div className="restaurant-form-page">
      <div className="restaurant-form-breadcrumb">
        <Link to="/restaurants">Restaurants</Link> &gt; <span>{isEdit ? 'Nouveau Restaurant' : 'Nouveau Restaurant'}</span>
      </div>

      <div className="restaurant-form-header">
        <h1 className="restaurant-form-title">{isEdit ? 'Modifier un Restaurant' : 'Ajouter un Restaurant'}</h1>
      </div>

      <Card className="restaurant-form-card">
        <h2 className="restaurant-form-card-title">{InfoIcon} Informations Générales</h2>
        <div className="restaurant-form-grid-info">
          <div>
            <div className="ui-input-header"><label className="ui-input-label">Logo du Restaurant</label></div>
            {logoPreview ? (
              <div>
                <div className="restaurant-form-image-preview">
                  <img src={logoPreview} alt="Logo" />
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginTop: 'var(--spacing-2)' }}>
                  <Button variant="outline" size="sm" style={{ flex: 1, borderColor: 'var(--border)', color: 'var(--text-secondary)' }} onClick={() => document.getElementById('logo-upload').click()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> 
                    Changer l'image
                  </Button>
                  <Button variant="outline" size="sm" style={{ flex: 1, borderColor: 'var(--error-border)', color: 'var(--error-text)' }} onClick={() => { setLogoPreview(null); setLogoFile(null); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> 
                    Supprimer l'image
                  </Button>
                </div>
              </div>
            ) : (
              <div className="restaurant-form-upload-zone" onClick={() => document.getElementById('logo-upload').click()} style={{ cursor: 'pointer' }}>
                <div className="restaurant-form-upload-icon">{ImageIcon}</div>
                <div className="restaurant-form-upload-text"><strong>Cliquez pour ajouter</strong></div>
                <div className="restaurant-form-upload-subtext">PNG, JPG (Max 2MB)</div>
              </div>
            )}
            <input type="file" id="logo-upload" style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />
          </div>
          <div>
            <Input name="name" value={formData.name} onChange={handleInputChange} label="Nom de l'établissement *" placeholder="Ex: Le Petit Chef" style={{ marginBottom: 'var(--spacing-4)' }} />
            <div className="ui-input-header"><label className="ui-input-label">Type de Cuisine</label></div>
            <div className="ui-input-wrapper">
              <select name="cuisine_type" value={formData.cuisine_type} onChange={handleInputChange} className="restaurant-form-select">
                <option value="">Sélectionnez un type</option>
                <option value="Gastronomie Française">Gastronomie Française</option>
                <option value="Italien">Italien</option>
                <option value="Marocain">Marocain</option>
                <option value="Japonais">Japonais</option>
                <option value="International">International</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      <Card className="restaurant-form-card">
        <h2 className="restaurant-form-card-title">{ContactIcon} Coordonnées</h2>
        <div className="restaurant-form-row">
          <div className="restaurant-form-col">
            <Input name="email" value={formData.email} onChange={handleInputChange} label="Adresse Email Principale" icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>} placeholder="contact@restaurant.com" />
          </div>
          <div className="restaurant-form-col">
            <Input name="phone" value={formData.phone} onChange={handleInputChange} label="Numéro de Téléphone" icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>} placeholder="+33 1 23 45 67 89" />
          </div>
        </div>
        <div style={{ marginTop: 'var(--spacing-4)' }}>
          <Input name="website" value={formData.website} onChange={handleInputChange} label="Site Web" icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>} placeholder="https://www.restaurant.com" />
        </div>
      </Card>

      <Card className="restaurant-form-card">
        <h2 className="restaurant-form-card-title">{MapPinIcon} Localisation</h2>
        <div style={{ marginBottom: 'var(--spacing-4)' }}>
          <Input name="address" value={formData.address} onChange={handleInputChange} label="Adresse Postale" placeholder="123 Avenue des Champs-Élysées" />
        </div>
        <div className="restaurant-form-row">
          <div className="restaurant-form-col">
            <Input name="city" value={formData.city} onChange={handleInputChange} label="Ville" placeholder="Paris" />
          </div>
          <div className="restaurant-form-col">
            <Input name="postal_code" value={formData.postal_code} onChange={handleInputChange} label="Code Postal" placeholder="75008" />
          </div>
          <div className="restaurant-form-col">
            <Input name="country" value={formData.country} onChange={handleInputChange} label="Pays" placeholder="France" />
          </div>
        </div>
      </Card>

      <Card className="restaurant-form-card">
        <h2 className="restaurant-form-card-title">{ClockIcon} Horaires d'ouverture</h2>
        
        <div className="restaurant-form-hours-row">
          <div className="restaurant-form-hours-day">Lundi - Vendredi</div>
          <div className="restaurant-form-hours-status">
            <label className="restaurant-form-checkbox-label">
              <input type="checkbox" checked={true} readOnly /> Ouvert
            </label>
          </div>
          <div className="restaurant-form-hours-inputs">
            <div className="restaurant-form-time-group">
              <span className="restaurant-form-time-label">MATIN:</span>
              <input type="text" className="restaurant-form-time-input" defaultValue="12:00 PM" />
              <span style={{ color: 'var(--text-secondary)' }}>-</span>
              <input type="text" className="restaurant-form-time-input" defaultValue="02:30 PM" />
            </div>
            <div className="restaurant-form-time-group">
              <span className="restaurant-form-time-label">SOIR:</span>
              <input type="text" className="restaurant-form-time-input" defaultValue="07:00 PM" />
              <span style={{ color: 'var(--text-secondary)' }}>-</span>
              <input type="text" className="restaurant-form-time-input" defaultValue="10:30 PM" />
            </div>
          </div>
        </div>

        <div className="restaurant-form-hours-row">
          <div className="restaurant-form-hours-day">Samedi</div>
          <div className="restaurant-form-hours-status">
            <label className="restaurant-form-checkbox-label">
              <input type="checkbox" checked={true} readOnly /> Ouvert
            </label>
          </div>
          <div className="restaurant-form-hours-inputs">
            <div className="restaurant-form-time-group">
              <span className="restaurant-form-time-label">JOURNÉE:</span>
              <input type="text" className="restaurant-form-time-input" defaultValue="12:00 PM" />
              <span style={{ color: 'var(--text-secondary)' }}>-</span>
              <input type="text" className="restaurant-form-time-input" defaultValue="11:00 PM" />
            </div>
          </div>
        </div>

        <div className="restaurant-form-hours-row">
          <div className="restaurant-form-hours-day">Dimanche</div>
          <div className="restaurant-form-hours-status">
            <label className="restaurant-form-checkbox-label" style={{ opacity: 0.5 }}>
              <input type="checkbox" checked={false} readOnly /> Fermé
            </label>
          </div>
          <div className="restaurant-form-hours-inputs" style={{ opacity: 0.5 }}>
            <div className="restaurant-form-time-group">
              <input type="text" className="restaurant-form-time-input" defaultValue="--:--" disabled />
              <span style={{ color: 'var(--text-secondary)' }}>-</span>
              <input type="text" className="restaurant-form-time-input" defaultValue="--:--" disabled />
            </div>
          </div>
        </div>
      </Card>

      <Card className="restaurant-form-card">
        <h2 className="restaurant-form-card-title">{UserIcon} Assignation du Gérant</h2>
        <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-6)' }}>
          Définissez l'accès administrateur principal pour ce nouvel établissement.
        </p>
        
        <div className="restaurant-form-manager-toolbar">
          <div style={{ flex: 1 }}>
            <Input
              placeholder="Rechercher par nom, email ou ID..."
              icon={SearchIcon}
              value={managerSearch}
              onChange={(e) => setManagerSearch(e.target.value)}
            />
          </div>
          <Button variant="primary" style={{ backgroundColor: 'var(--error-text)', borderColor: 'var(--error-text)' }} onClick={() => navigate('/users/add')}>
            {AddUserIcon} Nouveau Gérant
          </Button>
        </div>

        <div className="restaurant-form-manager-list">
          {usersLoading && <div>Chargement des utilisateurs...</div>}
          {!usersLoading && managerSearch && filteredManagers.length === 0 && (
            <div style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', padding: 'var(--spacing-3) 0' }}>
              Aucun gérant trouvé pour « {managerSearch} ».
            </div>
          )}
          {filteredManagers.map(u => (
            <div key={u.id} className={`restaurant-form-manager-item ${selectedManager === u.id ? 'restaurant-form-manager-item--selected' : ''}`}>
              <div className="restaurant-form-manager-avatar" style={{ position: 'relative', backgroundColor: '#e0f2fe', color: '#0284c7' }}>
                {u.avatar_url || u.avatar ? (
                  <img src={u.avatar_url || u.avatar} alt={u.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  u.name.substring(0, 2).toUpperCase()
                )}
                {selectedManager === u.id && (
                  <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', backgroundColor: 'var(--error-text)', color: 'white', borderRadius: '50%', padding: '2px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                )}
              </div>
              <div className="restaurant-form-manager-info">
                <div className="restaurant-form-manager-name">{u.name}</div>
                <div className="restaurant-form-manager-email">{u.email}</div>
              </div>
              {selectedManager === u.id ? (
                <div style={{ color: 'var(--error-text)', fontWeight: 'var(--weight-bold)', fontSize: 'var(--font-sm)', display: 'flex', alignItems: 'center' }}>
                  {CheckIcon} Gérant Sélectionné
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setSelectedManager(u.id)}>Sélectionner</Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="restaurant-form-footer">
        <Button variant="outline" onClick={() => navigate('/restaurants')} disabled={loading}>Annuler</Button>
        <Button variant="primary" style={{ backgroundColor: 'var(--error-text)', borderColor: 'var(--error-text)' }} onClick={handleSubmit} disabled={loading}>
          {loading && <Loader size="sm" color="#ffffff" />}
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </div>

      <SuccessModal 
        isOpen={successModalOpen} 
        onClose={() => { setSuccessModalOpen(false); navigate('/restaurants'); }} 
        message={modalMessage} 
      />
      
      <ErrorModal 
        isOpen={errorModalOpen} 
        onClose={() => setErrorModalOpen(false)} 
        message={modalMessage} 
      />
    </div>
  );
};

export default RestaurantForm;
