// src/components/Header/Header.js
import styles from './Header.module.css';

// Props: search (string), onSearch (function)
export default function Header({ search, onSearch }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.pokeball}>⬤</span>
          <h1 className={styles.title}>Pokédex</h1>
        </div>

        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar pokémon..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
          {search && (
            <button className={styles.clearBtn} onClick={() => onSearch('')}>
              ✕
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
