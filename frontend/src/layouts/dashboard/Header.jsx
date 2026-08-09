import { useState, useEffect, useRef } from "react";
import styles from "./header.module.css";
import { MdOutlineSearch } from "react-icons/md";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotifications, markAllNotificationsRead } from "../../store/slices/notificationsSlice";
import api from "../../services/api";

function formatTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "À l'instant";
  if (diffMin < 60) return `Il y a ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `Il y a ${diffH} h`;
  const diffD = Math.floor(diffH / 24);
  if (diffD === 1) return "Hier";
  if (diffD < 7) return `Il y a ${diffD} jours`;
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    let active = true;
    const q = query.trim();
    const timer = setTimeout(async () => {
      if (!q) {
        if (active) {
          setResults([]);
          setOpen(false);
        }
        return;
      }
      try {
        const [rRes, dRes] = await Promise.all([
          api.get("/restaurants", { params: { search: q, per_page: 3 } }),
          api.get("/dishes", { params: { search: q, per_page: 3 } }),
        ]);
        if (!active) return;
        const restaurants = (rRes.data.data || rRes.data || []).map(r => ({ type: "restaurant", ...r }));
        const dishes = (dRes.data.data || dRes.data || []).map(d => ({ type: "dish", ...d }));
        setResults([...restaurants, ...dishes]);
        setOpen(true);
      } catch {
        if (active) setResults([]);
      }
    }, 250);
    return () => { active = false; clearTimeout(timer); };
  }, [query]);

  const handleSelect = (item) => {
    setOpen(false);
    setQuery("");
    if (item.type === "restaurant") navigate(`/restaurants/${item.id}`);
    else navigate(`/menu/edit/${item.id}`);
  };

  return (
    <div className={styles.searchBox} ref={boxRef}>
      <div className={styles.searchWrapper}>
        <label htmlFor="search">
          <MdOutlineSearch />
        </label>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Rechercher un restaurant ou un plat..."
          autoComplete="off"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(!!e.target.value.trim()); }}
          onFocus={() => setOpen(!!query.trim())}
        />
      </div>

      {open && (
        <div className={styles.searchRslts}>
          {results.length === 0 ? (
            <div className={styles.noResultMsg}>Aucun résultat trouvé.</div>
          ) : (
            results.map((item) => (
              <button
                key={`${item.type}-${item.id}`}
                className={styles.rslt}
                type="button"
                onClick={() => handleSelect(item)}
              >
                <MdOutlineSearch />
                <span className={styles.content}>
                  {item.type === "restaurant" ? "🏪 " : "🍽️ "}
                  {item.name}
                  {item.type === "restaurant" && item.city ? ` — ${item.city}` : ""}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function NotificationItem({ notification }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={`${styles.notification} ${notification.is_read ? "" : styles.new}`}
      onClick={() => navigate("/notifications")}
    >
      <div className={styles.status}></div>
      <div className={styles.infos}>
        <h3 className={styles.content}>{notification.title}</h3>
        <p className={styles.date}>{formatTime(notification.created_at)}</p>
      </div>
    </button>
  );
}

function NotificationDropDown() {
  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();
  const { list, unreadCount, loading } = useSelector(state => state.notifications);
  const ref = useRef(null);

  useEffect(() => {
    dispatch(fetchNotifications());
    const interval = setInterval(() => {
      dispatch(fetchNotifications());
    }, 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setActive(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    if (unreadCount > 0) dispatch(markAllNotificationsRead());
  };

  return (
    <div className={styles.notificationsDropDown} ref={ref}>
      <div className={styles.icon} onClick={() => setActive((prev) => !prev)}>
        <MdOutlineNotificationsNone />
        {unreadCount > 0 && (
          <span className={styles.badge}>{unreadCount}</span>
        )}
      </div>

      <div className={`${styles.dropDown} ${isActive ? styles.active : ""}`}>
        <div className={styles.heading}>
          <h3>Notifications</h3>
          <button onClick={handleMarkAllRead} disabled={unreadCount === 0}>
            Tout marquer comme lu
          </button>
        </div>

        <div className={styles.body}>
          {loading && list.length === 0 ? (
            <div className={styles.noResultMsg}>Chargement...</div>
          ) : list.length === 0 ? (
            <div className={styles.noResultMsg}>Aucune notification pour le moment.</div>
          ) : (
            list.slice(0, 4).map((n) => (
              <NotificationItem key={n.id} notification={n} />
            ))
          )}
        </div>

        <div className={styles.footer}>
          <Link to="/notifications">Voir toutes les notifications</Link>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const { user } = useSelector(state => state.auth);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerBrand}>
          <h2 className={styles.brandName}> Portail Web </h2>
        </div>

        <div className={styles.headerSearch}>
          <SearchBox />
        </div>

        <div className={styles.headerActions}>
          <NotificationDropDown />
          <div className={styles.devider}></div>
          <Link to="/settings" className={styles.profile}>
            <img src={user?.avatar_url || user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=b91c1c&color=fff`} alt="profile image" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
