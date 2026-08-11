import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../../../store/slices/categoriesSlice';
import { fetchDishes, deleteDish, updateDish } from '../../../store/slices/dishesSlice';
import Button from '../../../components/ui/Button';
import Loader from '../../../components/ui/Loader';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import SuccessModal from '../../../components/ui/SuccessModal';
import ErrorModal from '../../../components/ui/ErrorModal';
import './MenuStructure.css';

const MenuStructure = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { user } = useSelector(state => state.auth);
  const { list: categories } = useSelector(state => state.categories);
  const { list: dishes } = useSelector(state => state.dishes);

  const restaurantId = user?.restaurant_id || searchParams.get('restaurant') || null;

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', icon: '' });

  const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [deleteDishModalOpen, setDeleteDishModalOpen] = useState(false);
  const [dishToDelete, setDishToDelete] = useState(null);

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(false);
  const [deletingDish, setDeletingDish] = useState(false);

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchCategories(restaurantId));
      dispatch(fetchDishes({ restaurant_id: restaurantId, per_page: 500 }));
    }
  }, [dispatch, restaurantId]);

  const dishesByCategory = (categoryId) =>
    dishes.filter(d => d.category_id === categoryId);

  const openAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({ name: '', icon: '' });
    setCategoryModalOpen(true);
  };

  const openEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm({ name: category.name, icon: category.icon || '' });
    setCategoryModalOpen(true);
  };

  const handleCategorySubmit = async () => {
    if (!categoryForm.name.trim()) {
      setModalMessage('Veuillez saisir un nom de catégorie.');
      setErrorModalOpen(true);
      return;
    }

    setSubmitting(true);
    const payload = { name: categoryForm.name.trim(), icon: categoryForm.icon.trim() };
    const result = editingCategory
      ? await dispatch(updateCategory({ id: editingCategory.id, data: payload }))
      : await dispatch(addCategory({ ...payload, restaurant_id: restaurantId }));
    setSubmitting(false);

    setCategoryModalOpen(false);
    if (result.meta.requestStatus === 'fulfilled') {
      setModalMessage(editingCategory ? 'Catégorie modifiée avec succès.' : 'Catégorie ajoutée avec succès.');
      setSuccessModalOpen(true);
    } else {
      setModalMessage('Une erreur est survenue lors de l\'enregistrement.');
      setErrorModalOpen(true);
    }
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;
    setDeletingCategory(true);
    const result = await dispatch(deleteCategory(categoryToDelete.id));
    setDeletingCategory(false);
    setDeleteCategoryModalOpen(false);
    setCategoryToDelete(null);
    if (result.meta.requestStatus === 'fulfilled') {
      setModalMessage('Catégorie supprimée avec succès.');
      setSuccessModalOpen(true);
    } else {
      setModalMessage('Impossible de supprimer cette catégorie.');
      setErrorModalOpen(true);
    }
  };

  const handleDeleteDish = async () => {
    if (!dishToDelete) return;
    setDeletingDish(true);
    const result = await dispatch(deleteDish(dishToDelete.id));
    setDeletingDish(false);
    setDeleteDishModalOpen(false);
    setDishToDelete(null);
    if (result.meta.requestStatus === 'fulfilled') {
      setModalMessage('Plat supprimé avec succès.');
      setSuccessModalOpen(true);
    } else {
      setModalMessage('Une erreur est survenue lors de la suppression.');
      setErrorModalOpen(true);
    }
  };

  const handleMoveDish = async (dish, categoryId) => {
    if (!categoryId || categoryId === dish.category_id) return;
    const result = await dispatch(updateDish({ id: dish.id, dishData: { category_id: categoryId } }));
    if (result.meta.requestStatus === 'fulfilled') {
      setModalMessage('Plat déplacé dans la catégorie avec succès.');
      setSuccessModalOpen(true);
    } else {
      setModalMessage('Une erreur est survenue lors du déplacement du plat.');
      setErrorModalOpen(true);
    }
  };

  const EditIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  );

  const TrashIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  );

  return (
    <div className="menu-structure">
      <div className="menu-structure-header">
        <div>
          <h1 className="menu-structure-title">Menu</h1>
          <p className="menu-structure-subtitle">Organisez vos plats par catégories et gérez la structure de votre menu.</p>
        </div>
        <div className="menu-structure-header-actions">
          <Button variant="outline" onClick={openAddCategory}>
            + Ajouter une Catégorie
          </Button>
          <Button variant="primary" onClick={() => navigate(`/menu/add${restaurantId ? `?restaurant=${restaurantId}` : ''}`)}>
            + Ajouter un Plat
          </Button>
        </div>
      </div>

      {categories.length === 0 ? (
        <Card className="menu-structure-empty">
          <p>Aucune catégorie. Commencez par ajouter une catégorie.</p>
          <Button variant="primary" onClick={openAddCategory}>+ Ajouter une Catégorie</Button>
        </Card>
      ) : (
        <div className="menu-structure-sections">
          {categories.map(category => {
            const categoryDishes = dishesByCategory(category.id);
            return (
              <Card key={category.id} className="menu-structure-section">
                <div className="menu-structure-section-header">
                  <div className="menu-structure-section-title-wrap">
                    <div className="menu-structure-section-icon">{category.icon || '🍽️'}</div>
                    <div>
                      <h3 className="menu-structure-section-title">{category.name}</h3>
                      <span className="menu-structure-section-count">{categoryDishes.length} plat{categoryDishes.length > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <div className="menu-structure-section-actions">
                    <button
                      className="menu-structure-icon-btn"
                      title="Renommer la catégorie"
                      onClick={() => openEditCategory(category)}
                    >{EditIcon}</button>
                    <button
                      className="menu-structure-icon-btn menu-structure-icon-btn--danger"
                      title="Supprimer la catégorie"
                      onClick={() => { setCategoryToDelete(category); setDeleteCategoryModalOpen(true); }}
                    >{TrashIcon}</button>
                  </div>
                </div>

                <div className="menu-structure-dish-list">
                  <div className="menu-structure-th-row">
                    <div className="menu-structure-th" style={{ flex: 2 }}>PLAT</div>
                    <div className="menu-structure-th" style={{ flex: 1 }}>PRIX</div>
                    <div className="menu-structure-th" style={{ flex: 1 }}>STATUT</div>
                    <div className="menu-structure-th" style={{ flex: 1, textAlign: 'right' }}>ACTIONS</div>
                  </div>

                  {categoryDishes.length === 0 ? (
                    <div className="menu-structure-no-dishes">
                      Aucun plat dans cette catégorie.
                      <Button variant="outline" size="sm" onClick={() => navigate(`/menu/add?category=${category.id}${restaurantId ? `&restaurant=${restaurantId}` : ''}`)}>
                        + Ajouter un plat ici
                      </Button>
                    </div>
                  ) : (
                    categoryDishes.map(dish => (
                      <div key={dish.id} className="menu-structure-tr">
                        <div className="menu-structure-td" style={{ flex: 2 }}>
                          <div className="menu-structure-dish-info">
                            {dish.image_url ? (
                              <img src={dish.image_url} alt={dish.name} className="menu-structure-dish-img" />
                            ) : (
                              <div className="menu-structure-dish-img menu-structure-dish-img--placeholder">🍽️</div>
                            )}
                            <span className="menu-structure-dish-name">{dish.name}</span>
                          </div>
                        </div>
                        <div className="menu-structure-td" style={{ flex: 1 }}>
                          <span className="menu-structure-dish-price">{Number(dish.price).toFixed(2)} MAD</span>
                        </div>
                        <div className="menu-structure-td" style={{ flex: 1 }}>
                          {dish.is_active ? (
                            <Badge variant="success" showDot={false} style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block', marginRight: '4px' }}></span>
                              Disponible
                            </Badge>
                          ) : (
                            <Badge variant="warning" showDot={false} style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block', marginRight: '4px' }}></span>
                              Indisponible
                            </Badge>
                          )}
                        </div>
                        <div className="menu-structure-td menu-structure-td--actions" style={{ flex: 1 }}>
                          <select
                            className="menu-structure-category-select"
                            title="Déplacer vers une catégorie"
                            value={dish.category_id || ''}
                            onChange={(e) => handleMoveDish(dish, e.target.value)}
                          >
                            {categories.map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.icon || '🍴'} {cat.name}</option>
                            ))}
                          </select>
                          <button className="menu-structure-action-btn" title="Modifier" onClick={() => navigate(`/menu/edit/${dish.id}${restaurantId ? `?restaurant=${restaurantId}` : ''}`)}>{EditIcon}</button>
                          <button className="menu-structure-action-btn menu-structure-action-btn--danger" title="Supprimer" onClick={() => { setDishToDelete(dish); setDeleteDishModalOpen(true); }}>{TrashIcon}</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Category Add/Edit Modal */}
      <Modal isOpen={categoryModalOpen} onClose={() => setCategoryModalOpen(false)} className="menu-structure-modal">
        <h2 className="menu-structure-modal-title">
          {editingCategory ? 'Modifier la catégorie' : 'Ajouter une nouvelle catégorie'}
        </h2>
        <div className="menu-structure-form-group">
          <Input
            label="Nom de la catégorie *"
            placeholder="Ex: Plats Principaux"
            value={categoryForm.name}
            onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
          />
        </div>
        <div className="menu-structure-form-group">
          <Input
            label="Icône (Emoji)"
            placeholder="Ex: 🍝"
            value={categoryForm.icon}
            onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
          />
        </div>
        <div className="menu-structure-modal-actions">
          <Button variant="outline" onClick={() => setCategoryModalOpen(false)} disabled={submitting}>Annuler</Button>
          <Button variant="primary" onClick={handleCategorySubmit} disabled={submitting}>
            {submitting && <Loader size="sm" color="#ffffff" />}
            {submitting ? 'Enregistrement...' : (editingCategory ? 'Enregistrer' : 'Ajouter')}
          </Button>
        </div>
      </Modal>

      {/* Delete Category Modal */}
      <Modal isOpen={deleteCategoryModalOpen} onClose={() => setDeleteCategoryModalOpen(false)} hideCloseButton={true}>
        <div style={{ textAlign: 'center', padding: 'var(--spacing-6) var(--spacing-4)' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            backgroundColor: 'var(--error-bg)', color: 'var(--error-text)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto var(--spacing-4)'
          }}>
            {TrashIcon}
          </div>
          <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-xl)', margin: '0 0 var(--spacing-2) 0', color: 'var(--text-primary)' }}>
            Confirmer la suppression
          </h2>
          <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-6)', lineHeight: '1.5' }}>
            Êtes-vous sûr de vouloir supprimer la catégorie <strong>"{categoryToDelete?.name}"</strong> ?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-4)' }}>
            <Button variant="outline" onClick={() => setDeleteCategoryModalOpen(false)} disabled={deletingCategory}>Annuler</Button>
            <Button variant="primary" style={{ backgroundColor: 'var(--error-text)' }} onClick={handleDeleteCategory} disabled={deletingCategory}>
              {deletingCategory && <Loader size="sm" color="#ffffff" />}
              {deletingCategory ? 'Suppression...' : 'Supprimer'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Dish Modal */}
      <Modal isOpen={deleteDishModalOpen} onClose={() => setDeleteDishModalOpen(false)} hideCloseButton={true}>
        <div style={{ textAlign: 'center', padding: 'var(--spacing-6) var(--spacing-4)' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            backgroundColor: 'var(--error-bg)', color: 'var(--error-text)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto var(--spacing-4)'
          }}>
            {TrashIcon}
          </div>
          <h2 style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-xl)', margin: '0 0 var(--spacing-2) 0', color: 'var(--text-primary)' }}>
            Confirmer la suppression
          </h2>
          <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-6)', lineHeight: '1.5' }}>
            Êtes-vous sûr de vouloir supprimer le plat <strong>"{dishToDelete?.name}"</strong> ?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-4)' }}>
            <Button variant="outline" onClick={() => setDeleteDishModalOpen(false)} disabled={deletingDish}>Annuler</Button>
            <Button variant="primary" style={{ backgroundColor: 'var(--error-text)' }} onClick={handleDeleteDish} disabled={deletingDish}>
              {deletingDish && <Loader size="sm" color="#ffffff" />}
              {deletingDish ? 'Suppression...' : 'Supprimer'}
            </Button>
          </div>
        </div>
      </Modal>

      <SuccessModal isOpen={successModalOpen} onClose={() => setSuccessModalOpen(false)} message={modalMessage} />
      <ErrorModal isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} message={modalMessage} />
    </div>
  );
};

export default MenuStructure;
