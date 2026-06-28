import { useState } from "react";
import styles from "./header.module.css";
import { MdOutlineSearch } from "react-icons/md";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { Link } from "react-router-dom";

function NoResultMsg({ content }) {
  return <p className={styles.noResultMsg}>{content}</p>;
}

function SearchBox() {
  const [search, setSearch] = useState("");
  const [isFocused, setFocused] = useState(false);

  return (
    <div className={styles.searchBox}>
      <form className={styles.searchWrapper}>
        <label htmlFor="search">
          <MdOutlineSearch />
        </label>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Rechercher..."
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </form>

      {isFocused && (
        <div className={styles.searchRslts}>
          <Link className={styles.rslt}>
            <MdOutlineSearch />
            <span className={styles.content}>search result 1</span>
          </Link>
          <Link className={styles.rslt}>
            <MdOutlineSearch />
            <span className={styles.content}>search result 2</span>
          </Link>
          <Link className={styles.rslt}>
            <MdOutlineSearch />
            <span className={styles.content}>search result 3</span>
          </Link>
        </div>
      )}
    </div>
  );
}

function NotificationDropDown() {
  const [isActive, setActive] = useState(false);

  function Notification({ isNew, content, date }) {
    return (
      <Link className={`${styles.notification} ${isNew ? styles.new : ""}`}>
        <div className={styles.status}></div>
        <div className={styles.infos}>
          <h3 className={styles.content}>{content}</h3>
          <p className={styles.date}>{date}</p>
        </div>
      </Link>
    );
  }

  const handleDropDown = () => {
    setActive((prev) => !prev);
  };

  return (
    <div className={styles.notificationsDropDown}>
      <div className={styles.icon} onClick={handleDropDown}>
        <MdOutlineNotificationsNone />
      </div>

      <div className={`${styles.dropDown} ${isActive ? styles.active : ""}`}>
        <div className={styles.heading}>
          <h3>Notifications</h3>
          <button>Tout marquer comme lu</button>
        </div>

        <div className={styles.body}>
          <Notification
            isNew={true}
            content="Nouveau restaurant : La Brasserie"
            date="Il ya 5 min"
          />
          <Notification
            isNew={false}
            content="Nouveau restaurant : La Brasserie"
            date="Il ya 5 min"
          />
          <Notification
            isNew={false}
            content="Nouveau restaurant : La Brasserie"
            date="Il ya 5 min"
          />

          <Notification
            isNew={false}
            content="Nouveau restaurant : La Brasserie"
            date="Il ya 5 min"
          />

          {/* <NoResultMsg content="Il n'y a pas de notifications pour le moment" /> */}
        </div>

        <div className={styles.footer}>
          <Link to="/notifications">Voir toutes les notifications</Link>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerBrand}>
          <h2 className={styles.brandName}> BrandName </h2>
        </div>

        <div className={styles.headerSearch}>
          <SearchBox />
        </div>

        <div className={styles.headerActions}>
          <NotificationDropDown />
          <div className={styles.devider}></div>
          <Link to="/profile" className={styles.profile}>
            <img src="https://picsum.photos/300/200" alt="profile image" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
