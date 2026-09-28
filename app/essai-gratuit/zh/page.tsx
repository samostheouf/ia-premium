'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import LanguageSwitcher from '@/app/components/LanguageSwitcher'
const LOCALES = [
  { code: 'FR', label: 'Français', flag: '🇫🇷', href: '/essai-gratuit' },
  { code: 'EN', label: 'English', flag: '🇬🇧', href: '/essai-gratuit/en' },
  { code: 'ES', label: 'Español', flag: '🇪🇸', href: '/essai-gratuit/es' },
  { code: 'DE', label: 'Deutsch', flag: '🇩🇪', href: '/essai-gratuit/de' },
  { code: 'IT', label: 'Italiano', flag: '🇮🇹', href: '/essai-gratuit/it' },
  { code: 'PT', label: 'Português', flag: '🇵🇹', href: '/essai-gratuit/pt' },
  { code: 'ZH', label: '中文', flag: '🇨🇳', href: '/essai-gratuit/zh' },
] as const

const CODE = 'ZH'


// ─── Page d'essai gratuit ────────────────────────────────────────────────────
// Levier de conversion principal : le visiteur obtient un vrai contenu généré
// sans créer de compte et sans entrer de carte bancaire.

interface Categorie {
  id: string
  label: string
  aide: string
}

const CATEGORIES: Categorie[] = [
  { id: 'copywriting', label: '文案', aide: '销售页、转化文案' },
  { id: 'social-media', label: '社交媒体', aide: 'LinkedIn、Instagram、X' },
  { id: 'email', label: '邮件营销', aide: '序列与活动' },
  { id: 'landing-page', label: '落地页', aide: '完整结构与文案' },
  { id: 'storytelling', label: '故事叙述', aide: '品牌故事' },
  { id: 'ideoque', label: '内容创意', aide: '角度与编辑计划' },
]

const TON = [
  { id: 'direct', label: '直接' },
  { id: 'luxury', label: '高端' },
  { id: 'analytical', label: '分析' },
  { id: 'persuasive', label: '有说服力' },
  { id: 'creative', label: '创意' },
]

interface Resultat {
  content: string
  category: string
  mots: number
  id: string
}

export default function EssaiGratuitZh() {
  const [categorie, setCategorie] = useState('copywriting')
  const [ton, setTon] = useState('direct')
  const [sujet, setSujet] = useState('')
  const [chargement, setChargement] = useState(false)
  const [resultat, setResultat] = useState<Resultat | null>(null)
  const [erreur, setErreur] = useState<string | null>(null)

  async function lancerEssai(e: React.FormEvent) {
    e.preventDefault()
    if (!sujet.trim()) {
      setErreur('Indiquez un sujet pour générer un contenu.')
      return
    }

    setChargement(true)
    setErreur(null)
    setResultat(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: categorie,
          prompt: sujet.trim(),
          tone: [ton],
          lengthWords: 220,
        }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'La génération a échoué.')
      }

      setResultat({
        content: data.result.content,
        category: data.result.category,
        mots: data.result.content.trim().split(/\s+/).length,
        id: data.result.id,
      })
    } catch (err) {
      setErreur(err instanceof Error ? err.message : 'Une erreur est survenue.')
    } finally {
      setChargement(false)
    }
  }

  function copier() {
    if (!resultat) return
    navigator.clipboard.writeText(resultat.content)
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header locales={LOCALES} currentLocale={CODE} />

      <main className="flex-1">
        {/* ACCROCHE */}
        <section className="bg-premium-gradient relative overflow-hidden px-4 pb-12 pt-28 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-indigo-200">
              免费试用 — 无需银行卡
            </span>
            <div className="mt-5 flex justify-center">
              <LanguageSwitcher locales={LOCALES} current={CODE} />
            </div>
            <h1 className="mt-5 text-3xl font-black leading-tight text-white sm:text-5xl">
              立即生成
              <br />
              真实内容
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-indigo-100/90 sm:text-lg">
              Choisissez votre format, décrivez votre sujet, obtenez un contenu exploitable
              immédiatement. Aucune inscription, aucun paiement pour cet essai.
            </p>
          </div>
        </section>

        {/* FORMULAIRE */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <form onSubmit={lancerEssai} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <fieldset>
                <legend className="text-sm font-bold" style={{ color: '#1e1b4b' }}>
                  1. 选择格式
                </legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategorie(cat.id)}
                      className={`rounded-xl border-2 p-3 text-left transition-all ${
                        categorie === cat.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 bg-white hover:border-indigo-300'
                      }`}
                    >
                      <span className="block text-sm font-semibold" style={{ color: '#1e1b4b' }}>
                        {cat.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-gray-500">{cat.aide}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-6">
                <legend className="text-sm font-bold" style={{ color: '#1e1b4b' }}>
                  2. 选择语气
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TON.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTon(t.id)}
                      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                        ton === t.id
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-gray-300 bg-white text-gray-600 hover:border-indigo-400'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-6">
                <legend className="text-sm font-bold" style={{ color: '#1e1b4b' }}>
                  3. 你的主题
                </legend>
                <textarea
                  value={sujet}
                  onChange={(e) => setSujet(e.target.value)}
                  rows={3}
                  maxLength={300}
                  placeholder="例：面向手工艺者的记账软件，3000 名客户"
                  className="mt-3 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                <p className="mt-1 text-right text-xs text-gray-400">{sujet.length}/300</p>
              </fieldset>

              {erreur && (
                <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                  {erreur}
                </p>
              )}

              <button
                type="submit"
                disabled={chargement}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-base font-bold text-white transition-all hover:from-indigo-500 hover:to-purple-500 disabled:opacity-60"
              >
                {chargement ? '正在生成…' : '生成我的免费试用'}
              </button>
            </form>

            {/* RÉSULTAT */}
            {resultat && (
              <div className="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50/40 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-black" style={{ color: '#1e1b4b' }}>
                    {`生成内容（${resultat.mots} 字）`}
                  </h2>
                  <button
                    type="button"
                    onClick={copier}
                    className="rounded-lg border border-indigo-300 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-50"
                  >
                    复制文本
                  </button>
                </div>
                <div className="mt-4 whitespace-pre-wrap rounded-xl border border-gray-200 bg-white p-5 text-sm leading-relaxed text-gray-700">
                  {resultat.content}
                </div>
                <p className="mt-3 text-xs text-gray-500">Référence : {resultat.id}</p>
              </div>
            )}

            {/* CONVERSION */}
            <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
              <h2 className="text-xl font-black" style={{ color: '#1e1b4b' }}>
                需要比试用更多？
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600">
                无限使用引擎，六大内容类别，三种输出格式。一次付费，无订阅。
              </p>
              <Link
                href="/pricing"
                className="mt-5 inline-block rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-3.5 text-base font-bold text-white transition-all hover:from-indigo-500 hover:to-purple-500"
              >
                查看价格
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
