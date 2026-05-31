// src/components/TypeBadge/TypeBadge.js
import styles from './TypeBadge.module.css';

// Recebe type (string) e large (boolean) via props
export default function TypeBadge({ type, large = false }) {
  const typeTranslations = {
    fire: 'Fogo',
    water: 'Água',
    grass: 'Grama',
    electric: 'Elétrico',
    psychic: 'Psíquico',
    ice: 'Gelo',
    dragon: 'Dragão',
    dark: 'Sombrio',
    fairy: 'Fada',
    fighting: 'Lutador',
    flying: 'Voador',
    poison: 'Veneno',
    ground: 'Terra',
    rock: 'Pedra',
    bug: 'Inseto',
    ghost: 'Fantasma',
    steel: 'Aço',
    normal: 'Normal',
  };

  const label = typeTranslations[type] || type;

  return (
    <span
      className={`${styles.badge} ${large ? styles.large : ''}`}
      data-type={type}
    >
      {label}
    </span>
  );
}
