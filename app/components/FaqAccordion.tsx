'use client'

// Accordéon FAQ réutilisable. Client-safe : l'état d'ouverture vit dans ce
// composant, jamais dans les pages qui l'utilisent.

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FaqItem {
  question: string
  answer: string
}

export default function FaqAccordion({
  items,
  idPrefix,
}: {
  items: readonly FaqItem[]
  idPrefix: string
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const buttonId = `${idPrefix}-question-${index}`
        const panelId = `${idPrefix}-answer-${index}`

        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors duration-200 hover:border-indigo-200"
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
              >
                <span className="text-base font-bold" style={{ color: '#1e1b4b' }}>
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-indigo-500 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            {isOpen ? (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="border-t border-gray-100 px-5 py-5 text-[15px] leading-relaxed text-gray-600 sm:px-6"
              >
                {item.answer}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
