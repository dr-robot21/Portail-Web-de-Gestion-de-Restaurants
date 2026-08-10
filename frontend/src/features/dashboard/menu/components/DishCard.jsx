import Badge from '../../../../components/ui/Badge';
import './DishCard.css';

const DishCard = ({ dish, onEdit, onView, onDelete }) => {
  const { name, price, description, image, image_url, is_active } = dish;
  const dishImage = image_url || image || 'https://via.placeholder.com/300x200';

  const EditIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  );

  const ViewIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const DeleteIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  );

  return (
    <div className="dish-card">
      <div className="dish-card-image-container">
        <img src={dishImage} alt={name} className="dish-card-image" />
        <div className="dish-card-status">
          <Badge variant={is_active ? 'success' : 'default'}>
            {is_active ? 'Actif' : 'Inactif'}
          </Badge>
        </div>
      </div>
      
      <div className="dish-card-content">
        <div className="dish-card-header">
          <h3 className="dish-card-title">{name}</h3>
          <span className="dish-card-price">{Number(price).toFixed(2)} €</span>
        </div>
        
        <p className="dish-card-description">{description}</p>
        
        <div className="dish-card-actions">
          <div className="dish-card-actions-left">
            <button className="dish-card-action-btn" onClick={() => onEdit(dish)} title="Modifier">
              {EditIcon}
            </button>
            <button className="dish-card-action-btn" onClick={() => onView(dish)} title="Voir">
              {ViewIcon}
            </button>
          </div>
          <button className="dish-card-action-btn dish-card-action-btn--delete" onClick={() => onDelete(dish)} title="Supprimer">
            {DeleteIcon}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
