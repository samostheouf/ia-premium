// Injection de données structurées JSON-LD (schema.org).
//
// Composant volontairement SANS 'use client' : il n'utilise ni état ni hook, il
// peut donc être rendu depuis un Server Component comme depuis un Client
// Component. Aucun import de Stripe.
//
// La sérialisation neutralise `<`, `>` et `&` : sans cela, une chaîne
// contenant `</script>` dans les données Allow terminates the script element.

export type JsonLdData = Record<string, unknown> | readonly Record<string, unknown>[]

export interface JSONLDProps {
  /** Un objet JSON-LD ou un tableau d'objets (@graph). */
  data: JsonLdData
  /** Identifiant du script, pratique pour le déréférencer en test. */
  id?: string
}

/**
 * Sérialise un objet JSON-LD de façon sûre pour une injection HTML.
 * Les caractères `<`, `>` et `&` sont échappés en séquences Unicode, ce qui
 * empêche toute fermeture prématurée de la balise `<script>`.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}

export default function JSONLD({ data, id }: JSONLDProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Contenu sérialisé par nos soins, jamais une entrée utilisateur brute.
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  )
}
