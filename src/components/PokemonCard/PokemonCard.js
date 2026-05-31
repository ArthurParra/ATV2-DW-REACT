// src/components/PokemonCard/PokemonCard.js
import Link from 'next/link';
import Image from 'next/image';
import TypeBadge from '@/components/TypeBadge/TypeBadge';
import styles from './PokemonCard.module.css';

// Recebe pokemon via props
export default function PokemonCard({ pokemon }) {
  const spriteUrl =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default;

  const formattedId = String(pokemon.id).padStart(3, '0');
  const mainType = pokemon.types[0].type.name;

  return (
    <Link href={`/pokemon/${pokemon.name}`} className={styles.card} data-type={mainType}>
      <span className={styles.number}>#{formattedId}</span>

      <div className={styles.imageWrapper}>
        {spriteUrl && (
          <Image
            src={spriteUrl}
            alt={pokemon.name}
            width={120}
            height={120}
            className={styles.image}
          />
        )}
        <div className={styles.glow} />
      </div>

      <h2 className={styles.name}>
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </h2>

      <div className={styles.types}>
        {pokemon.types.map(({ type }) => (
          <TypeBadge key={type.name} type={type.name} />
        ))}
      </div>
    </Link>
  );
}
