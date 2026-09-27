'use client'

// Sélecteur de langue minimal et sans dépendance externe.
// Le site est francophone : le sélecteur n'apparaît que si l'appelant fournit
// plusieurs locales via la prop `locales`. Sans cette prop, il ne rend rien —
// ce qui évite d'afficher un sélecteur décoratif sur un site mono-langue.

import { useEffect, useRef, useState } from 'react'
import { Check, Globe } from 'lucide-react'

export interface LocaleOption {
  /** Code de locale court affiché ('FR', 'EN'). */
  code: string
  /** Nom de la langue dans cette langue ('Français'). */
  label: string
  /** Drapeau emoji (optionnel). */
  flag?: string
  /** Chemin de destination, ex. '/en/pricing'. */
  href: string
}

export interface LanguageSwitcherProps {
  locales: readonly LocaleOption[]
  /** Locale active. */
  current: string
  /** Bascule la locale active (géré par le parent). */
  onChange?: (code: string) => void
  className?: string
}

export default function LanguageSwitcher({
  locales,
  current,
  onChange,
  className = '',
}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Refermet le menu au clic extérieur
  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  if (locales.length < 2) return null

  const active = locales.find((locale) => locale.code === current) ?? locales[0]

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Choisir la langue du site"
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-indigo-200 transition-colors duration-200 hover:bg-white/10 hover:text-white active:scale-95"
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">
          {active.flag ? `${active.flag} ` : ''}
          {active.code.toUpperCase()}
        </span>
        <span className="sm:hidden" aria-hidden="true">
          {active.flag ?? active.code.toUpperCase()}
        </span>
      </button>

      <div
        role="listbox"
        aria-label="Langues disponibles"
        className={`absolute right-0 top-full z-50 mt-2 w-48 origin-top-right overflow-hidden rounded-xl border border-white/10 bg-indigo-950/95 shadow-2xl backdrop-blur-xl transition-all duration-200 ${
          open
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
        }`}
      >
        {locales.map((locale) => {
          const isActive = locale.code === active.code
          return (
            <button
              key={locale.code}
              type="button"
              role="option"
              aria-selected={isActive}
              onClick={() => {
                onChange?.(locale.code)
                setOpen(false)
              }}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-150 ${
                isActive
                  ? 'bg-indigo-600/30 text-white'
                  : 'text-indigo-200 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span aria-hidden="true">{locale.flag ?? '🌐'}</span>
              <span>{locale.label}</span>
              {isActive && (
                <Check className="ml-auto h-3.5 w-3.5 text-indigo-300" aria-hidden="true" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
