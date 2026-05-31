// src/app/layout.js
import './globals.css';

export const metadata = {
  title: 'Pokédex - ATV02 DW React',
  description: 'Pokédex criada com Next.js consumindo a PokéAPI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
