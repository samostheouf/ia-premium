'use client'

// Formulaire de contact. Client-safe : toute la logique (états, validation,
// soumission) est confinée à ce composant.

import { useState } from 'react'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

interface FormState {
  nom: string
  email: string
  sujet: string
  message: string
}

const EMPTY: FormState = { nom: '', email: '', sujet: 'Question sur le service', message: '' }

const SUJETS = [
  'Question sur le service',
  'Problème technique',
  'Facturation et paiement',
  'Demande de remboursement',
  'Partenariat / presse',
  'Autre demande',
]

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [serverError, setServerError] = useState<string | null>(null)

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (form.nom.trim().length < 2) next.nom = 'Indiquez votre nom (2 caractères minimum).'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      next.email = 'Indiquez une adresse e-mail valide.'
    }
    if (form.message.trim().length < 20) {
      next.message = 'Décrivez votre demande en 20 caractères minimum.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validate()) return

    setStatus('sending')
    setServerError(null)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok) throw new Error('send_failed')
      setStatus('sent')
      setForm(EMPTY)
    } catch {
      setStatus('idle')
      setServerError(
        'Votre message n’a pas pu être transmis. Réessayez dans un instant ou écrivez-nous directement par e-mail.',
      )
    }
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" aria-hidden="true" />
        <h2 className="mt-4 text-lg font-bold" style={{ color: '#1e1b4b' }}>
          Message envoyé
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          Merci {form.nom ? 'pour votre message' : ''}. Nous répondons sous 48 h ouvrées, du lundi
          au vendredi. Vérifiez aussi votre dossier de courriers indésirables : une réponse
          automatique de confirmation vous a été adressée.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-50"
        >
          Écrire un nouveau message
        </button>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {serverError ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-nom" className="mb-1.5 block text-sm font-semibold" style={{ color: '#1e1b4b' }}>
            Nom et prénom <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-nom"
            name="nom"
            type="text"
            autoComplete="name"
            value={form.nom}
            onChange={(event) => update('nom', event.target.value)}
            aria-invalid={Boolean(errors.nom)}
            aria-describedby={errors.nom ? 'contact-nom-error' : undefined}
            placeholder="Camille Dupont"
            className={`${inputClass} ${errors.nom ? 'border-red-300' : 'border-gray-200 focus:border-indigo-500'}`}
          />
          {errors.nom ? (
            <p id="contact-nom-error" className="mt-1.5 text-xs text-red-600">
              {errors.nom}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold" style={{ color: '#1e1b4b' }}>
            Adresse e-mail <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            placeholder="camille@entreprise.fr"
            className={`${inputClass} ${errors.email ? 'border-red-300' : 'border-gray-200 focus:border-indigo-500'}`}
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-1.5 text-xs text-red-600">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="contact-sujet" className="mb-1.5 block text-sm font-semibold" style={{ color: '#1e1b4b' }}>
          Objet de la demande
        </label>
        <select
          id="contact-sujet"
          name="sujet"
          value={form.sujet}
          onChange={(event) => update('sujet', event.target.value)}
          className={`${inputClass} border-gray-200 focus:border-indigo-500`}
        >
          {SUJETS.map((sujet) => (
            <option key={sujet} value={sujet}>
              {sujet}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold" style={{ color: '#1e1b4b' }}>
          Votre message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={7}
          value={form.message}
          onChange={(event) => update('message', event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          placeholder="Décrivez votre besoin, votre contexte et, le cas échéant, le numéro de commande (format ia-premium-XXXX)."
          className={`${inputClass} resize-y ${errors.message ? 'border-red-300' : 'border-gray-200 focus:border-indigo-500'}`}
        />
        {errors.message ? (
          <p id="contact-message-error" className="mt-1.5 text-xs text-red-600">
            {errors.message}
          </p>
        ) : (
          <p className="mt-1.5 text-xs text-gray-400">
            {form.message.trim().length} caractère(s) — 20 minimum.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-gray-400">
          Les champs marqués d’un astérisque sont obligatoires. Vos données sont utilisées
          uniquement pour répondre à votre demande — voir notre{' '}
          <a href="/politique-confidentialite" className="text-indigo-600 underline">
            politique de confidentialité
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)' }}
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Envoi en cours…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Envoyer le message
            </>
          )}
        </button>
      </div>
    </form>
  )
}
