import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDish, deleteDish } from '../../../store/slices/dishesSlice';
import { fetchCategories } from '../../../store/slices/categoriesSlice';
import api from '../../../services/api';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Loader from '../../../components/ui/Loader';
import Card from '../../../components/ui/Card';
import Switch from '../../../components/ui/Switch';
import Modal from '../../../components/ui/Modal';
import SuccessModal from '../../../components/ui/SuccessModal';
import ErrorModal from '../../../components/ui/ErrorModal';
import './AddDish.css';

const ALLERGENS = ['Végétarien', 'Végétalien', 'Sans Gluten', 'Sans Lactose', 'Fruits à coque', 'Fruits de mer'];

const EditDish = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.dishes);
  const { list: categories } = useSelector(state => state.categories);
  const { user } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    is_active: true,
    allergens: [],
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [loadingDish, setLoadingDish] = useState(true);

  const [saveConfirmOpen, setSaveConfirmOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (user?.restaurant_id) {
      dispatch(fetchCategories(user.restaurant_id));
    }
    (async () => {
      try {
        const res = await api.get(`/dishes/${id}`);
        const d = res.data;
        let allergens = d.allergens || [];
        if (typeof allergens === 'string') {
          try { allergens = JSON.parse(allergens); } catch { allergens = []; }
        }
        if (!Array.isArray(allergens)) allergens = [];
        setFormData({
          name: d.name || '',
          description: d.description || '',
          price: d.price || '',
          category_id: d.category_id || '',
          is_active: d.is_active ?? true,
          allergens,
        });
        if (d.image_url) setImagePreview(d.image_url);
      } catch {
        setModalMessage('Erreur lors du chargement du plat.');
        setErrorModalOpen(true);
      } finally {
        setLoadingDish(false);
      }
    })();
  }, [dispatch, user, id]);

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
      setRemoveImage(false);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setRemoveImage(true);
    setImagePreview(null);
  };

  const handleSave = async () => {
    const payload = { ...formData };
    if (imageFile) payload.image = imageFile;
    if (removeImage) payload.remove_image = true;

    const result = await dispatch(updateDish({ id, dishData: payload }));
    setSaveConfirmOpen(false);
    if (updateDish.fulfilled.match(result)) {
      setModalMessage('Plat modifié avec succès.');
      setSuccessModalOpen(true);
    } else {
      const err = result.payload;
      const msg = typeof err === 'object' ? Object.values(err).flat().join(' ') : (err || 'Une erreur est survenue.');
      setModalMessage(msg);
      setErrorModalOpen(true);
    }
  };

  const handleDelete = async () => {
    const result = await dispatch(deleteDish(id));
    setDeleteConfirmOpen(false);
    if (deleteDish.fulfilled.match(result)) {
      setModalMessage('Plat supprimé avec succès.');
      setSuccessModalOpen(true);
    } else {
      const msg = typeof result.payload === 'string' ? result.payload : 'Une erreur est survenue.';
      setModalMessage(msg);
      setErrorModalOpen(true);
    }
  };

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

  if (loadingDish) {
    return <div style={{ padding: 'var(--spacing-8)', textAlign: 'center' }}>Chargement...</div>;
  }

  return (
    <div className="add-dish-page">
      <div className="add-dish-breadcrumb">
        <Link to="/menu/plats">Plats</Link> &gt; <span>Modifier le Plat</span>
      </div>

      <div className="add-dish-header">
        <h1 className="add-dish-title">Modifier le Plat</h1>
        <div className="add-dish-header-actions">
          <Button variant="outline" onClick={() => navigate('/menu')}>Annuler</Button>
          <Button variant="outline" style={{ color: 'var(--error-text)', borderColor: 'var(--error-border)' }} onClick={() => setDeleteConfirmOpen(true)}>
            {TrashIcon} Supprimer
          </Button>
          <Button variant="primary" onClick={() => setSaveConfirmOpen(true)} disabled={loading}>
            {SaveIcon} Enregistrer les modifications
          </Button>
        </div>
      </div>

      <div className="add-dish-layout">
        <div className="add-dish-main">
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
                    className="add-dish-tag"
                    onClick={() => handleAllergenToggle(tag)}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: formData.allergens.includes(tag) ? 'var(--error-text)' : undefined,
                      color: formData.allergens.includes(tag) ? 'white' : undefined,
                      borderColor: formData.allergens.includes(tag) ? 'var(--error-text)' : undefined,
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
          <Card className="add-dish-card">
            <h2 className="add-dish-card-title">Image du Plat</h2>
            {imagePreview ? (
              <div style={{ marginBottom: 'var(--spacing-4)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <img src={imagePreview} alt="Preview" style={{ width: '100%', display: 'block' }} />
              </div>
            ) : null}
            <Button fullWidth variant="outline" style={{ marginBottom: 'var(--spacing-2)', color: 'var(--text-primary)', borderColor: 'var(--border)' }} onClick={() => document.getElementById('edit-dish-image').click()}>
              {EditIcon} Changer l'image
            </Button>
            <Button fullWidth variant="outline" style={{ color: 'var(--error-text)', borderColor: 'var(--error-border)', backgroundColor: 'transparent' }} onClick={handleRemoveImage}>
              {TrashIcon} Supprimer l'image
            </Button>
            <input type="file" id="edit-dish-image" style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} />
          </Card>

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

      {/* Save Confirmation Modal */}
      <Modal isOpen={saveConfirmOpen} onClose={() => setSaveConfirmOpen(false)} hideCloseButton={true}>
        <div style={{ textAlign: 'center', padding: 'var(--spacing-6) var(--spacing-4)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#f0f7ff', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--spacing-4)' }}>
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
            Voulez-vous enregistrer les changements apportés au plat<br />
            <strong>"{formData.name}"</strong> ?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-4)' }}>
            <Button variant="outline" onClick={() => setSaveConfirmOpen(false)} disabled={loading}>Annuler</Button>
            <Button variant="primary" onClick={handleSave} disabled={loading}>
              {loading && <Loader size="sm" color="#ffffff" />}
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} hideCloseButton={true}>
        <div style={{ textAlign: 'center', padding: 'var(--spacing-6) var(--spacing-4)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--error-bg)', color: 'var(--error-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--spacing-4)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </div>
          <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-xl)', margin: '0 0 var(--spacing-2) 0', color: 'var(--text-primary)' }}>
            Confirmer la suppression
          </h2>
          <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-6)', lineHeight: '1.5' }}>
            Êtes-vous sûr de vouloir supprimer le plat <strong>"{formData.name}"</strong> ?<br />
            Cette action est irréversible.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-4)' }}>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)} disabled={loading}>Annuler</Button>
            <Button variant="primary" style={{ backgroundColor: 'var(--error-text)' }} onClick={handleDelete} disabled={loading}>
              {loading && <Loader size="sm" color="#ffffff" />}
              {loading ? 'Suppression...' : 'Supprimer'}
            </Button>
          </div>
        </div>
      </Modal>

      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => { setSuccessModalOpen(false); navigate('/menu'); }}
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

export default EditDish;
