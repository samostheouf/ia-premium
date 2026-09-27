'use client'

// Composant FAQ accordéon réutilisable — thème sombre premium.
//
// Accessibilité :
//  - <button> avec aria-expanded + aria-controls
//  - panneau avec role="region" + aria-labelledby
//  - navigation clavier au clavier (Tab / Entrée / Espace natifs)
//  - l'accordéon n'est pas un <details> : on contrôle l'ouverture en JS pour
//    garder l'animation, tout en gardant la sémantique ARIA correcte.

import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FAQQuestion {
  question: string
  /** Réponse — texte simple ou HTML/React hypé. */
  answer: string
}

export interface FAQProps {
  questions: readonly FAQQuestion[]
  /** Titre de section. */
  title?: string
  /** Sous-titre sous le titre. */
  subtitle?: string
  /** Variante visuelle. */
  variant?: 'dark' | 'light'
  /** Plusieurs réponses ouvertes simultanément. */
  allowMultiple?: boolean
  /** Nombre de réponses ouvertes au départ (-1 = toutes fermées). */
  defaultOpenCount?: number
  /** Ajoute le JSON-LD schema.org/FAQPage. */
  withStructuredData?: boolean
  className?: string
}

interface AccordionItemProps {
  item: FAQQuestion
  index: number
  isOpen: boolean
  onToggle: () => void
  variant: 'dark' | 'light'
  reactId: string
}

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
  variant,
  reactId,
}: AccordionItemProps) {
  const isDark = variant === 'dark'
  const buttonId = `${reactId}-question-${index}`
  const panelId = `${reactId}-answer-${index}`

  return (
    <div
      className={`rounded-xl border transition-all duration-300 ${
        isDark
          ? isOpen
            ? 'border-indigo-500/30 bg-indigo-900/30 shadow-lg shadow-indigo-500/5'
            : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]'
          : isOpen
            ? 'border-indigo-500/40 bg-indigo-50/50 shadow-lg shadow-indigo-500/5'
            : 'border-white/10 bg-white/5 hover:border-white/20'
      }`}
    >
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 p-5 text-left"
        >
          <span
            className={`pr-4 font-medium ${isDark ? 'text-white' : 'text-indigo-900'}`}
          >
            {item.question}
          </span>
          <ChevronDown
            className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            } ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`}
            aria-hidden="true"
          />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        // L'ID reste présent quand le panneau est fermé : aria-controls pointe
        // toujours vers un élément existant dans le DOM.
        hidden={!isOpen}
        className={`border-t px-5 pb-5 pt-4 text-sm leading-relaxed ${
          isDark ? 'border-white/5 text-indigo-300' : 'border-white/10 text-slate-600'
        }`}
      >
        {item.answer}
      </div>
    </div>
  )
}

export default function FAQ({
  questions,
  title,
  subtitle,
  variant = 'dark',
  allowMultiple = false,
  defaultOpenCount = 0,
  withStructuredData = true,
  className = '',
}: FAQProps) {
  const reactId = useId()
  const isDark = variant === 'dark'
  const [openIndexes, setOpenIndexes] = useState<number[]>(() =>
    questions.slice(0, Math.max(0, defaultOpenCount)).map((_, index) => index),
  )

  function handleToggle(index: number) {
    setOpenIndexes((current) => {
      const isOpen = current.includes(index)
      if (allowMultiple) {
        return isOpen ? current.filter((value) => value !== index) : [...current, index]
      }
      return isOpen ? [] : [index]
    })
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const content = (
    <div className={className}>
      {title ? (
        <div className="mb-8 text-center">
          <h2 className={`text-3xl font-bold sm:text-4xl ${isDark ? 'text-white' : 'text-indigo-900'}`}>
            {title}
          </h2>
          {subtitle ? (
            <p className={`mt-3 ${isDark ? 'text-indigo-300/80' : 'text-slate-500'}`}>{subtitle}</p>
          ) : null}
        </div>
      ) : null}

      <div className="space-y-3">
        {questions.map((item, index) => (
          <AccordionItem
            key={item.question}
            item={item}
            index={index}
            isOpen={openIndexes.includes(index)}
            onToggle={() => handleToggle(index)}
            variant={variant}
            reactId={reactId}
          />
        ))}
      </div>
    </div>
  )

  if (!withStructuredData) return content

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
      />
      {content}
    </>
  )
}
