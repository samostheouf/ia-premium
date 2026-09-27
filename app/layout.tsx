import './globals.css';

export const metadata = {
  title: 'ia-premium — Contenu Premium par Intelligence Artificielle',
  description: 'Accédez à un moteur de génération de contenu premium. Copywriting, réseaux sociaux, emails, landing pages, storytelling. Qualité professionnelle, résultats exploitables.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="font-sans bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
