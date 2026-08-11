import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addDish } from '../../../store/slices/dishesSlice';
import { fetchCategories } from '../../../store/slices/categoriesSlice';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Loader from '../../../components/ui/Loader';
import Card from '../../../components/ui/Card';
import Switch from '../../../components/ui/Switch';
import SuccessModal from '../../../components/ui/SuccessModal';
import ErrorModal from '../../../components/ui/ErrorModal';
import './AddDish.css';

const ALLERGENS = ['Végétarien', 'Végétalien', 'Sans Gluten', 'Sans Lactose', 'Fruits à coque', 'Fruits de mer'];

const AddDish = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { loading } = useSelector(state => state.dishes);
  const { list: categories } = useSelector(state => state.categories);
  const { user } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: searchParams.get('category') || '',
    is_active: true,
    allergens: [],
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (user?.restaurant_id) {
      dispatch(fetchCategories(user.restaurant_id));
    }
  }, [dispatch, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAllergenToggle = (tag) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens.includes(tag)
        ? prev.allergens.filter(a => a !== tag)
        : [...prev.allergens, tag]
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.category_id) {
      setModalMessage('Veuillez remplir tous les champs obligatoires.');
      setErrorModalOpen(true);
      return;
    }
    const payload = { ...formData, restaurant_id: user?.restaurant_id };
    if (imageFile) payload.image = imageFile;

    const result = await dispatch(addDish(payload));
    if (addDish.fulfilled.match(result)) {
      setModalMessage('Plat ajouté avec succès.');
      setSuccessModalOpen(true);
    } else {
      const err = result.payload;
      const msg = typeof err === 'object' ? Object.values(err).flat().join(' ') : (err || 'Une erreur est survenue.');
      setModalMessage(msg);
      setErrorModalOpen(true);
    }
  };

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
        <Link to="/menu/plats">Plats</Link> &gt; <span>Nouveau Plat</span>
      </div>

      <div className="add-dish-header">
        <h1 className="add-dish-title">Ajouter un Plat</h1>
        <div className="add-dish-header-actions">
          <Button variant="outline" onClick={() => navigate('/menu/plats')} disabled={loading}>Annuler</Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading && <Loader size="sm" color="#ffffff" />}
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </div>
      </div>

      <div className="add-dish-layout">
        <div className="add-dish-main">
          {/* Informations Générales */}
          <Card className="add-dish-card">
            <h2 className="add-dish-card-title">Informations Générales</h2>
            <div className="add-dish-form-group">
              <Input name="name" value={formData.name} onChange={handleChange} label="Nom du Plat *" placeholder="Ex: Filet de Bœuf Rossini" />
            </div>
            <div className="add-dish-form-group">
              <div className="ui-input-header">
                <label className="ui-input-label">Description (Menu) *</label>
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="add-dish-textarea"
                placeholder="Description appétissante pour le client..."
                rows="4"
                maxLength={150}
              ></textarea>
              <div className="add-dish-textarea-limit">{formData.description.length}/150 caractères</div>
            </div>
          </Card>

          {/* Tarification & Détails */}
          <Card className="add-dish-card">
            <h2 className="add-dish-card-title">Tarification &amp; Détails</h2>
            <div className="add-dish-row">
              <div className="add-dish-col">
                <Input name="price" value={formData.price} onChange={handleChange} label="Prix de vente *" placeholder="0.00 MAD" type="number" step="0.01" min="0" />
              </div>
              <div className="add-dish-col">
                <div className="ui-input-header">
                  <label className="ui-input-label">Catégorie *</label>
                </div>
                <div className="ui-input-wrapper">
                  <select name="category_id" value={formData.category_id} onChange={handleChange} className="add-dish-select">
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="add-dish-form-group">
              <label className="ui-input-label" style={{ display: 'block', marginBottom: 'var(--spacing-2)' }}>
                Allergènes &amp; Régimes
              </label>
              <div className="add-dish-tags">
                {ALLERGENS.map(tag => (
                  <span
                    key={tag}
                    className={`add-dish-tag${formData.allergens.includes(tag) ? ' add-dish-tag--active' : ''}`}
                    onClick={() => handleAllergenToggle(tag)}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: formData.allergens.includes(tag) ? 'var(--error-text)' : undefined,
                      color: formData.allergens.includes(tag) ? 'white' : undefined,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="add-dish-sidebar">
          {/* Image du Plat */}
          <Card className="add-dish-card">
            <h2 className="add-dish-card-title">Image du Plat</h2>
            {imagePreview ? (
              <div>
                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />
                <Button variant="outline" size="sm" style={{ width: '100%', color: 'var(--error-text)' }} onClick={() => { setImagePreview(null); setImageFile(null); }}>
                  Supprimer l'image
                </Button>
              </div>
            ) : (
              <div className="add-dish-upload-area" onClick={() => document.getElementById('dish-image-upload').click()} style={{ cursor: 'pointer' }}>
                <div className="add-dish-upload-icon-circle">
                  {CloudUploadIcon}
                </div>
                <p className="add-dish-upload-text"><strong>Glissez une image ici</strong><br />ou cliquez pour parcourir</p>
                <p className="add-dish-upload-subtext">JPG, PNG max 5MB (1:1 recommandé)</p>
              </div>
            )}
            <input type="file" id="dish-image-upload" style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} />
          </Card>

          {/* Disponibilité */}
          <Card className="add-dish-card">
            <h2 className="add-dish-card-title">Disponibilité</h2>
            <div className="add-dish-availability">
              <div>
                <div className="add-dish-availability-title">Plat Actif</div>
                <div className="add-dish-availability-subtitle">Visible sur le menu client</div>
              </div>
              <Switch
                checked={formData.is_active}
                onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                id="plat-actif-switch"
              />
            </div>
          </Card>
        </div>
      </div>

      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => { setSuccessModalOpen(false); navigate('/menu/plats'); }}
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

export default AddDish;
