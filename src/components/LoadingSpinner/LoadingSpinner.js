// src/components/LoadingSpinner/LoadingSpinner.js
import styles from './LoadingSpinner.module.css';

// Recebe small (boolean) via props para variação de tamanho
export default function LoadingSpinner({ small = false }) {
  return (
    <div className={`${styles.wrapper} ${small ? styles.small : ''}`}>
      <div className={styles.pokeball}>
        <div className={styles.top} />
        <div className={styles.divider} />
        <div className={styles.bottom} />
        <div className={styles.center} />
      </div>
      {!small && <p className={styles.text}>Carregando...</p>}
    </div>
  );
}
