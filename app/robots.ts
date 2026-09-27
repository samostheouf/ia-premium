import { MetadataRoute } from 'next'

import { BASE_URL } from '@/lib/seo'

/**
 * ia-premium — robots.txt
 * ─────────────────────────────────────────────────────────────────────────────
 * Autorise l'indexation complète du contenu public tout en excluant :
 *   - les routes API (sans valeur pour les moteurs de recherche),
 *   - la page de confirmation de paiement (contenu privé, sans valeur SEO),
 *   - un éventuel back-office.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/checkout/success', '/admin/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
