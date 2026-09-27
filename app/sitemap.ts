import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

import { BASE_URL } from '@/lib/seo'

/**
 * ia-premium — sitemap.xml
 * ─────────────────────────────────────────────────────────────────────────────
 * Les routes statiques déclarées ci-dessous ne sont émises que si le dossier
 * correspondant existe réellement sur le disque (avec un page.tsx). Cela évite
 * d'annoncer des URL renvoyant une 404 tant que les pages ne sont pas
 * livrées, et permet d'ajouter une page sans toucher à ce fichier.
 */

const APP_DIR = path.join(process.cwd(), 'app')

/** Fréquence de rafraîchissement et priorité par route. */
const STATIC_ROUTES: {
  route: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}[] = [
  { route: 'pricing', changeFrequency: 'weekly', priority: 0.9 },
  { route: 'cgv', changeFrequency: 'monthly', priority: 0.3 },
  { route: 'mentions-legales', changeFrequency: 'monthly', priority: 0.3 },
  { route: 'politique-confidentialite', changeFrequency: 'monthly', priority: 0.3 },
  { route: 'faq', changeFrequency: 'monthly', priority: 0.8 },
  { route: 'blog', changeFrequency: 'weekly', priority: 0.8 },
  { route: 'a-propos', changeFrequency: 'monthly', priority: 0.7 },
  { route: 'contact', changeFrequency: 'monthly', priority: 0.6 },
]

/** Date de dernière modification du fichier page.tsx d'une route, si elle existe. */
function getLastModified(route: string, now: Date): Date {
  try {
    const stat = fs.statSync(path.join(APP_DIR, route, 'page.tsx'))
    return stat.mtime > now ? now : stat.mtime
  } catch {
    return now
  }
}

/** Une route n'est listée que si son dossier ET son page.tsx existent réellement. */
function routeExists(route: string): boolean {
  try {
    return fs.existsSync(path.join(APP_DIR, route, 'page.tsx'))
  } catch {
    return false
  }
}

/** Slugs d'articles de blog détectés sur le disque (nouveaux articles pris en compte au build). */
function getBlogSlugs(): string[] {
  try {
    const blogDir = path.join(APP_DIR, 'blog')
    return fs
      .readdirSync(blogDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .filter((entry) => fs.existsSync(path.join(blogDir, entry.name, 'page.tsx')))
      .map((entry) => entry.name)
      .sort()
  } catch {
    return []
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: getLastModified('', now),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ]

  for (const { route, changeFrequency, priority } of STATIC_ROUTES) {
    if (!routeExists(route)) continue
    entries.push({
      url: `${BASE_URL}/${route}`,
      lastModified: getLastModified(route, now),
      changeFrequency,
      priority,
    })
  }

  if (routeExists('blog')) {
    for (const slug of getBlogSlugs()) {
      entries.push({
        url: `${BASE_URL}/blog/${slug}`,
        lastModified: getLastModified(path.join('blog', slug), now),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return entries
}
