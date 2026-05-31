// src/app/pokemon/[name]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import TypeBadge from '@/components/TypeBadge/TypeBadge';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import styles from './page.module.css';

export default function PokemonDetailPage() {
  const { name } = useParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pokemonRes, speciesRes] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${name}`),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`),
        ]);
        const pokemonData = await pokemonRes.json();
        const speciesData = await speciesRes.json();
        setPokemon(pokemonData);
        setSpecies(speciesData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  const getDescription = () => {
    if (!species) return '';
    const ptEntry = species.flavor_text_entries.find(
      (e) => e.language.name === 'pt-BR' || e.language.name === 'pt'
    );
    const enEntry = species.flavor_text_entries.find(
      (e) => e.language.name === 'en'
    );
    const entry = ptEntry || enEntry;
    return entry ? entry.flavor_text.replace(/\f|\n/g, ' ') : '';
  };

  const formatStat = (value) => String(value).padStart(3, '0');
  const maxStatValue = 255;

  const statLabels = {
    hp: 'HP',
    attack: 'Ataque',
    defense: 'Defesa',
    'special-attack': 'Sp. Ataque',
    'special-defense': 'Sp. Defesa',
    speed: 'Velocidade',
  };

  const spriteUrl =
    pokemon?.sprites?.other?.['official-artwork']?.front_default ||
    pokemon?.sprites?.front_default;

  if (loading) {
    return (
      <div className={styles.centered}>
        <LoadingSpinner />
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className={styles.centered}>
        <p>Pokémon não encontrado.</p>
      </div>
    );
  }

  const mainType = pokemon.types[0].type.name;

  return (
    <div className={styles.page} data-type={mainType}>
      <button className={styles.backBtn} onClick={() => router.back()}>
        ← Voltar
      </button>

      <div className={styles.container}>
        {/* Left panel */}
        <div className={styles.leftPanel}>
          <span className={styles.number}>#{String(pokemon.id).padStart(3, '0')}</span>
          <div className={styles.spriteWrapper}>
            {spriteUrl && (
              <Image
                src={spriteUrl}
                alt={pokemon.name}
                width={300}
                height={300}
                priority
                className={styles.sprite}
              />
            )}
          </div>
          <h1 className={styles.name}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h1>
          <div className={styles.types}>
            {pokemon.types.map(({ type }) => (
              <TypeBadge key={type.name} type={type.name} large />
            ))}
          </div>
          {species && (
            <p className={styles.genus}>
              {species.genera.find((g) => g.language.name === 'en')?.genus}
            </p>
          )}
          <p className={styles.description}>{getDescription()}</p>
        </div>

        {/* Right panel */}
        <div className={styles.rightPanel}>
          {/* Info grid */}
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Altura</span>
              <span className={styles.infoValue}>{(pokemon.height / 10).toFixed(1)} m</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Peso</span>
              <span className={styles.infoValue}>{(pokemon.weight / 10).toFixed(1)} kg</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Exp. Base</span>
              <span className={styles.infoValue}>{pokemon.base_experience ?? '—'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Geração</span>
              <span className={styles.infoValue}>
                {species?.generation?.name.replace('generation-', '').toUpperCase() ?? '—'}
              </span>
            </div>
          </div>

          {/* Habilidades */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Habilidades</h2>
            <div className={styles.abilities}>
              {pokemon.abilities.map(({ ability, is_hidden }) => (
                <span
                  key={ability.name}
                  className={`${styles.ability} ${is_hidden ? styles.hidden : ''}`}
                >
                  {ability.name.replace('-', ' ')}
                  {is_hidden && <em> (oculta)</em>}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Status Base</h2>
            <div className={styles.stats}>
              {pokemon.stats.map(({ stat, base_stat }) => (
                <div key={stat.name} className={styles.statRow}>
                  <span className={styles.statLabel}>
                    {statLabels[stat.name] || stat.name}
                  </span>
                  <span className={styles.statValue}>{formatStat(base_stat)}</span>
                  <div className={styles.statBarTrack}>
                    <div
                      className={styles.statBar}
                      style={{ width: `${(base_stat / maxStatValue) * 100}%` }}
                      data-type={mainType}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
