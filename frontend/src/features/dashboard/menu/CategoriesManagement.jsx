import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory, deleteCategory } from '../../../store/slices/categoriesSlice';
import Button from '../../../components/ui/Button';
import Loader from '../../../components/ui/Loader';
import Tabs from '../../../components/ui/Tabs';
import DataTable from '../../../components/ui/DataTable';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import SuccessModal from '../../../components/ui/SuccessModal';
import ErrorModal from '../../../components/ui/ErrorModal';
import './CategoriesManagement.css';

const FILTER_TABS = [
  { id: 'all', label: 'Tous' }
];

const CategoriesManagement = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('all');
  
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  const [formData, setFormData] = useState({ name: '', icon: '' });

  const { list: categories, loading } = useSelector(state => state.categories);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user?.restaurant_id) {
      dispatch(fetchCategories(user.restaurant_id));
    }
  }, [dispatch, user]);

  const handleAddSubmit = async () => {
    if (!formData.name) return;

    const result = await dispatch(addCategory({ name: formData.name, icon: formData.icon, restaurant_id: user?.restaurant_id }));
    if (addCategory.fulfilled.match(result)) {
      setModalMessage('L\'opération a été effectuée avec succès.');
      setSuccessModalOpen(true);
      setAddModalOpen(false);
      setFormData({ name: '', icon: '' });
    } else {
      const msg = typeof result.payload === 'string' ? result.payload : 'Une erreur s\'est produite.';
      setModalMessage(msg);
      setErrorModalOpen(true);
    }
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    const result = await dispatch(deleteCategory(categoryToDelete.id));
    setDeleteModalOpen(false);
    setCategoryToDelete(null);
    if (deleteCategory.fulfilled.match(result)) {
      setModalMessage('L\'opération a été effectuée avec succès.');
      setSuccessModalOpen(true);
    } else {
      const msg = typeof result.payload === 'string' ? result.payload : 'Une erreur s\'est produite.';
      setModalMessage(msg);
      setErrorModalOpen(true);
    }
  };

  const columns = [
    { 
      header: 'NOM DE LA CATÉGORIE', 
      accessor: 'name',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
          <div style={{ 
            width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', 
            backgroundColor: 'var(--background)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', fontSize: '20px' 
          }}>
            {row.icon || '🍽️'}
          </div>
          <span style={{ fontWeight: 'var(--weight-bold)', color: 'var(--text-primary)' }}>{row.name}</span>
        </div>
      )
    },
    { 
      header: 'DISHES', 
      accessor: 'dishes',
      render: (row) => <span style={{ fontWeight: 'var(--weight-bold)', fontSize: 'var(--font-lg)' }}>{row.dishes_count || 0}</span>
    },
    { 
      header: 'ACTIONS', 
      accessor: 'actions',
      render: (row) => (
        <Button variant="outline" size="sm" onClick={() => handleDeleteClick(row)} style={{ color: 'var(--error-text)', borderColor: 'var(--error-border)' }}>
          Supprimer
        </Button>
      )
    }
  ];

  return (
    <div className="categories-page">
      <div className="categories-header">
        <div>
          <h1 className="categories-title">Gestion des categories</h1>
          <p className="categories-subtitle">Gérez la structure de votre menu</p>
        </div>
        <Button variant="primary" onClick={() => setAddModalOpen(true)}>
          + Ajouter une Catégorie
        </Button>
      </div>

      <div className="categories-table-container">
        <div className="categories-toolbar">
          <Tabs tabs={FILTER_TABS} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        {loading && <div style={{ padding: 'var(--spacing-4)' }}>Chargement...</div>}
        
        {!loading && (
          <DataTable 
            columns={columns} 
            data={categories} 
            pagination={true}
            pageSize={10}
            className="categories-datatable-override"
          />
        )}
      </div>

      {/* Add Category Modal */}
      <Modal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} className="categories-modal">
        <h2 className="categories-modal-title">Ajouter une nouvelle catégorie</h2>
        
        <div className="categories-form-group">
          <Input 
            label="Nom de la catégorie *" 
            placeholder="Ex: Boissons Chaudes" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="categories-form-group">
          <Input 
            label="Icône (Emoji)" 
            placeholder="Ex: ☕" 
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          />
        </div>

        <div className="categories-modal-actions">
          <Button variant="outline" onClick={() => setAddModalOpen(false)} disabled={loading}>Annuler</Button>
          <Button variant="primary" onClick={handleAddSubmit} disabled={loading}>
            {loading && <Loader size="sm" color="#ffffff" />}
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </div>
      </Modal>

      {/* Delete Category Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} hideCloseButton={true}>
        <div style={{ textAlign: 'center', padding: 'var(--spacing-6) var(--spacing-4)' }}>
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '50%', 
            backgroundColor: 'var(--error-bg)', color: 'var(--error-text)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            margin: '0 auto var(--spacing-4)' 
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-xl)', margin: '0 0 var(--spacing-2) 0', color: 'var(--text-primary)' }}>
            Confirmer la suppression
          </h2>
          <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-6)', lineHeight: '1.5' }}>
            Êtes-vous sûr de vouloir supprimer la catégorie <strong>"{categoryToDelete?.name}"</strong> ?<br/>
            Les plats associés devront être réassignés.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-4)' }}>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)} disabled={loading}>Annuler</Button>
            <Button variant="primary" style={{ backgroundColor: 'var(--error-text)' }} onClick={confirmDelete} disabled={loading}>
              {loading && <Loader size="sm" color="#ffffff" />}
              {loading ? 'Suppression...' : 'Supprimer'}
            </Button>
          </div>
        </div>
      </Modal>

      <SuccessModal 
        isOpen={successModalOpen} 
        onClose={() => setSuccessModalOpen(false)} 
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

export default CategoriesManagement;
