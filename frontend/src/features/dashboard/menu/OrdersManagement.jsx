import Card from '../../../components/ui/Card';
import './OrdersManagement.css';

const OrdersManagement = () => {
  return (
    <div className="orders-page">
      <div className="orders-header">
        <div>
          <h1 className="orders-title">Gestion des Commandes</h1>
          <p className="orders-subtitle">Consultez et gérez les commandes en cours de votre restaurant.</p>
        </div>
      </div>

      <Card className="orders-empty-card">
        <div className="orders-empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
        <h2 className="orders-empty-title">Aucune commande pour le moment</h2>
        <p className="orders-empty-text">
          Lorsque vos clients passeront des commandes, elles apparaîtront ici pour être
          consultées et traitées en temps réel.
        </p>
        <div className="orders-empty-note">
          <span className="orders-empty-badge">En cours de développement</span>
        </div>
      </Card>
    </div>
  );
};

export default OrdersManagement;
