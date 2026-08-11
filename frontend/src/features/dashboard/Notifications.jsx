import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from '../../store/slices/notificationsSlice';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import Loader from '../../components/ui/Loader';
import './Notifications.css';

const PER_PAGE = 10;

const Notifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: notifications, loading, hasMore, unreadCount } = useSelector(state => state.notifications);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const { user } = useSelector(state => state.auth);
  const pageRef = useRef(1);
  const sentinelRef = useRef(null);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    pageRef.current = 1;
    dispatch(fetchNotifications({ page: 1, per_page: PER_PAGE }));
  }, [dispatch]);

  const loadMore = useCallback(() => {
    if (isLoadingRef.current || !hasMore) return;
    isLoadingRef.current = true;
    const nextPage = pageRef.current + 1;
    pageRef.current = nextPage;
    dispatch(fetchNotifications({ page: nextPage, per_page: PER_PAGE })).finally(() => {
      isLoadingRef.current = false;
    });
  }, [dispatch, hasMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: '200px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  const entityPath = (notification) => {
    if (!notification.entity_type || !notification.entity_id) return null;
    switch (notification.entity_type) {
      case 'dish':
        return `/menu/edit/${notification.entity_id}`;
      case 'category':
        return '/menu/categories';
      case 'restaurant':
        return `/restaurants/${notification.entity_id}`;
      case 'user':
        return `/users/${notification.entity_id}`;
      default:
        return null;
    }
  };

  const handleItemClick = (notification) => {
    if (!notification.is_read) {
      dispatch(markNotificationRead(notification.id));
    }
    const path = entityPath(notification);
    if (path && notification.entity_action !== 'deleted') {
      navigate(path);
    }
  };

  const handleMarkAllRead = () => {
    if (unreadCount > 0) {
      dispatch(markAllNotificationsRead());
    }
  };

  const confirmDeleteNotification = async () => {
    if (!confirmDelete) return;
    await dispatch(deleteNotification(confirmDelete.id));
    setConfirmDelete(null);
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'À l\'instant';
    if (diffMin < 60) return `Il y a ${diffMin} min`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `Il y a ${diffH} h`;
    const diffD = Math.floor(diffH / 24);
    if (diffD === 1) return 'Hier';
    if (diffD < 7) return `Il y a ${diffD} jours`;
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const isToday = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const now = new Date();
    return date.toDateString() === now.toDateString();
  };

  const today = notifications.filter(n => isToday(n.created_at));
  const earlier = notifications.filter(n => !isToday(n.created_at));

  const iconForType = (type) => {
    switch (type) {
      case 'success': return 'var(--color-success, #22c55e)';
      case 'warning': return '#d97706';
      case 'error': return 'var(--error-text)';
      default: return 'var(--text-secondary)';
    }
  };

  const TrashIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  );

  const CheckIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  const BellIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  );

  const actionLabel = (action) => {
    switch (action) {
      case 'created': return 'ajouté';
      case 'updated': return 'modifié';
      case 'deleted': return 'supprimé';
      default: return '';
    }
  };

  const renderItem = (notification) => (
    <div
      key={notification.id}
      className={`notification-item${notification.is_read ? '' : ' notification-item--unread'}`}
      onClick={() => handleItemClick(notification)}
      style={{ cursor: entityPath(notification) && notification.entity_action !== 'deleted' ? 'pointer' : 'default' }}
    >
      <div className="notification-icon" style={{ backgroundColor: 'var(--background)', color: iconForType(notification.type) }}>
        {BellIcon}
      </div>
      <div className="notification-content">
        <h3 className="notification-item-title">{notification.title}</h3>
        <p className="notification-item-desc">{notification.message}</p>
        {notification.restaurant_id && user?.role === 'super_admin' && (
          <div className="notification-restaurant">
            <span className="notification-restaurant-badge">
              {(notification.restaurant && notification.restaurant.name) || 'Restaurant'}
            </span>
            {notification.entity_action && notification.entity_action !== 'deleted' && (
              <span className="notification-action-hint">
                Cliquez pour voir l'élément {actionLabel(notification.entity_action)}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="notification-meta">
        <span className="notification-time">{formatTime(notification.created_at)}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          {!notification.is_read && <span className="notification-unread-dot"></span>}
          <button
            className="notification-delete-btn"
            title="Supprimer"
            onClick={(e) => { e.stopPropagation(); setConfirmDelete(notification); }}
          >
            {TrashIcon}
          </button>
        </div>
      </div>
    </div>
  );

  const renderSection = (label, items) => (
    <div className="notifications-section">
      <h2 className="notifications-section-title">{label}</h2>
      {items.map(renderItem)}
    </div>
  );

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <div>
          <h1 className="notifications-title">Centre de notifications</h1>
          <p className="notifications-subtitle">Consultez les alertes et les mises à jour importantes de votre compte.</p>
        </div>
        <div className="notifications-header-actions">
          <Button variant="outline" className="notifications-btn-param" onClick={handleMarkAllRead} disabled={unreadCount === 0}>
            {CheckIcon} Tout marquer comme lu
          </Button>
        </div>
      </div>

      {loading && notifications.length === 0 ? (
        <Card className="notifications-card">
          <div style={{ padding: 'var(--spacing-10)', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Chargement des notifications...
          </div>
        </Card>
      ) : notifications.length === 0 ? (
        <Card className="notifications-card">
          <div style={{ padding: 'var(--spacing-12)', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <div style={{ marginBottom: 'var(--spacing-3)', opacity: 0.5 }}>{BellIcon}</div>
            Aucune notification pour le moment.
          </div>
        </Card>
      ) : (
        <Card className="notifications-card">
          {today.length > 0 && renderSection("Aujourd'hui", today)}
          {earlier.length > 0 && renderSection('Plus tôt', earlier)}

          <div ref={sentinelRef} />
          {loading && hasMore && (
            <div className="notifications-infinite-loader">
              <Loader size="sm" />
            </div>
          )}
        </Card>
      )}

      <Modal isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} hideCloseButton={true}>
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
            Êtes-vous sûr de vouloir supprimer cette notification ?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-4)' }}>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>Annuler</Button>
            <Button variant="primary" style={{ backgroundColor: 'var(--error-text)' }} onClick={confirmDeleteNotification}>Supprimer</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Notifications;
