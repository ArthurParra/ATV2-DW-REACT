// src/app/page.js
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import PokemonCard from '@/components/PokemonCard/PokemonCard';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import styles from './page.module.css';

const LIMIT = 20;

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');

  const fetchPokemons = async (currentOffset, append = false) => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${currentOffset}`
      );
      const data = await res.json();

      if (data.next === null) setHasMore(false);

      // Fetch detalhes básicos de cada pokemon (para pegar tipos e sprite)
      const detailed = await Promise.all(
        data.results.map(async (p) => {
          const detailRes = await fetch(p.url);
          return detailRes.json();
        })
      );

      if (append) {
        setPokemons((prev) => [...prev, ...detailed]);
      } else {
        setPokemons(detailed);
      }
    } catch (error) {
      console.error('Erro ao buscar pokémons:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPokemons(0);
  }, []);

  const handleLoadMore = () => {
    const newOffset = offset + LIMIT;
    setOffset(newOffset);
    setLoadingMore(true);
    fetchPokemons(newOffset, true);
  };

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <Header search={search} onSearch={setSearch} />

      <main className={styles.main}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className={styles.grid}>
              {filtered.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className={styles.notFound}>
                Nenhum Pokémon encontrado para "{search}"
              </p>
            )}

            {!search && hasMore && (
              <div className={styles.loadMoreWrapper}>
                {loadingMore ? (
                  <LoadingSpinner small />
                ) : (
                  <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
                    Carregar mais
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
