// Génère les variantes linguistiques de /essai-gratuit à partir du modèle FR.
// L'utilisateur demande les 7 langues les plus courantes. On garde le moteur de
// génération et la structure identiques : seul le texte d'interface change.

import fs from 'node:fs'
import path from 'node:path'

const BASE = '/data/data/com.termux/files/home/ia-premium/app/essai-gratuit/page.tsx'
const source = fs.readFileSync(BASE, 'utf8')

// Les 6 autres languesdemandées (le FR est déjà la page source).
const LANGUES = {
  en: {
    dir: 'en',
    hreflang: 'en',
    badge: 'Free trial — no credit card',
    h1a: 'Generate real content',
    h1b: 'right now',
    intro:
      'Choose your format, describe your topic, get usable content immediately. No sign-up, no payment for this trial.',
    step1: '1. Which format?',
    step2: '2. Which tone?',
    step3: '3. Your topic',
    placeholder: 'e.g. invoicing software for artisans, 3,000 customers',
    cta: 'Generate my free trial',
    loading: 'Generating…',
    resultTitle: (n) => `Your content (${n} words)`,
    copy: 'Copy text',
    ref: 'Reference:',
    convH: 'Need more than a trial?',
    convP:
      'Unlimited access to the engine, six content categories, three output formats. One-time payment, no subscription.',
    convCta: 'See pricing',
    cats: [
      ['Copywriting', 'Sales pages, conversion copy'],
      ['Social media', 'LinkedIn, Instagram, X'],
      ['Email marketing', 'Sequences and campaigns'],
      ['Landing page', 'Full structure and copy'],
      ['Storytelling', 'Brand narratives'],
      ['Content ideas', 'Angles and editorial plans'],
    ],
    tones: [['direct', 'Direct'], ['luxury', 'Luxury'], ['analytical', 'Analytical'], ['persuasive', 'Persuasive'], ['creative', 'Creative']],
  },
  es: {
    dir: 'es',
    hreflang: 'es',
    badge: 'Prueba gratis — sin tarjeta bancaria',
    h1a: 'Genera contenido real',
    h1b: 'ahora mismo',
    intro:
      'Elige tu formato, describe tu tema, obtén contenido listo para usar de inmediato. Sin registro, sin pago para esta prueba.',
    step1: '1. ¿Qué formato?',
    step2: '2. ¿Qué tono?',
    step3: '3. Tu tema',
    placeholder: 'ej. software de facturación para artesanos, 3.000 clientes',
    cta: 'Generar mi prueba gratis',
    loading: 'Generando…',
    resultTitle: (n) => `Tu contenido (${n} palabras)`,
    copy: 'Copiar texto',
    ref: 'Referencia:',
    convH: '¿Necesitas más que una prueba?',
    convP:
      'Acceso ilimitado al motor, seis categorías de contenido, tres formatos de salida. Pago único, sin suscripción.',
    convCta: 'Ver precios',
    cats: [
      ['Copywriting', 'Páginas de venta, textos de conversión'],
      ['Redes sociales', 'LinkedIn, Instagram, X'],
      ['Email marketing', 'Sequencias y campañas'],
      ['Landing page', 'Estructura y copy completos'],
      ['Storytelling', 'Relatos de marca'],
      ['Ideas de contenido', 'Ángulos y planes editoriales'],
    ],
    tones: [['direct', 'Directo'], ['luxury', 'Lujoso'], ['analytical', 'Analítico'], ['persuasive', 'Persuasivo'], ['creative', 'Creativo']],
  },
  de: {
    dir: 'de',
    hreflang: 'de',
    badge: 'Kostenlos testen — ohne Kreditkarte',
    h1a: 'Erstellen Sie echten',
    h1b: 'Inhalt sofort',
    intro:
      'Wählen Sie Ihr Format, beschreiben Sie Ihr Thema, erhalten Sie sofort verwendbaren Inhalt. Ohne Anmeldung, ohne Zahlung für diesen Test.',
    step1: '1. Welches Format?',
    step2: '2. Welcher Ton?',
    step3: '3. Ihr Thema',
    placeholder: 'z. B. Rechnungssoftware für Handwerker, 3.000 Kunden',
    cta: 'Kostenlosen Test starten',
    loading: 'Wird erstellt…',
    resultTitle: (n) => `Ihr Inhalt (${n} Wörter)`,
    copy: 'Text kopieren',
    ref: 'Referenz:',
    convH: 'Mehr als ein Test nötig?',
    convP:
      'Unbegrenzter Zugang zur Engine, sechs Inhaltskategorien, drei Ausgabeformate. Einmalzahlung, kein Abonnement.',
    convCta: 'Preise ansehen',
    cats: [
      ['Copywriting', 'Verkaufsseiten, Conversion-Texte'],
      ['Social Media', 'LinkedIn, Instagram, X'],
      ['E-Mail-Marketing', 'Sequenzen und Kampagnen'],
      ['Landingpage', 'Struktur und Copy komplett'],
      ['Storytelling', 'Markenerzählungen'],
      ['Content-Ideen', 'Winkel und Redaktionspläne'],
    ],
    tones: [['direct', 'Direkt'], ['luxury', 'Luxus'], ['analytical', 'Analytisch'], ['persuasive', 'Überzeugend'], ['creative', 'Kreativ']],
  },
  it: {
    dir: 'it',
    hreflang: 'it',
    badge: 'Prova gratuita — senza carta di credito',
    h1a: 'Genera contenuti reali',
    h1b: 'adesso',
    intro:
      'Scegli il formato, descrivi il tuo argomento, ottieni contenuti utilizzabili subito. Nessuna registrazione, nessun pagamento per questa prova.',
    step1: '1. Quale formato?',
    step2: '2. Quale tono?',
    step3: '3. Il tuo argomento',
    placeholder: 'es. software di fatturazione per artigiani, 3.000 clienti',
    cta: 'Genera la mia prova gratuita',
    loading: 'Generazione in corso…',
    resultTitle: (n) => `I tuoi contenuti (${n} parole)`,
    copy: 'Copia il testo',
    ref: 'Riferimento:',
    convH: 'Ti serve più di una prova?',
    convP:
      'Accesso illimitato al motore, sei categorie di contenuti, tre formati di output. Pagamento una tantum, nessun abbonamento.',
    convCta: 'Vedi i prezzi',
    cats: [
      ['Copywriting', 'Pagine di vendita, testi di conversione'],
      ['Social media', 'LinkedIn, Instagram, X'],
      ['Email marketing', 'Sequenze e campagne'],
      ['Landing page', 'Struttura e copy completi'],
      ['Storytelling', 'Racconti di brand'],
      ['Idee di contenuto', 'Angoli e piani editoriali'],
    ],
    tones: [['direct', ' Diretto'], ['luxury', 'Lussuoso'], ['analytical', 'Analitico'], ['persuasive', 'Persuasivo'], ['creative', 'Creativo']],
  },
  pt: {
    dir: 'pt',
    hreflang: 'pt',
    badge: 'Teste grátis — sem cartão bancário',
    h1a: 'Gere conteúdo real',
    h1b: 'agora mesmo',
    intro:
      'Escolha o formato, descreva seu tema, obtenha conteúdo pronto para usar imediatamente. Sem cadastro, sem pagamento nesta experiência.',
    step1: '1. Qual formato?',
    step2: '2. Qual tom?',
    step3: '3. Seu tema',
    placeholder: 'ex.: software de faturamento para artesãos, 3.000 clientes',
    cta: 'Gerar meu teste grátis',
    loading: 'Gerando…',
    resultTitle: (n) => `Seu conteúdo (${n} palavras)`,
    copy: 'Copiar texto',
    ref: 'Referência:',
    convH: 'Precisa de mais que um teste?',
    convP:
      'Acesso ilimitado ao motor, seis categorias de conteúdo, três formatos de saída. Pagamento único, sem assinatura.',
    convCta: 'Ver preços',
    cats: [
      ['Copywriting', 'Páginas de venda, textos de conversão'],
      ['Redes sociais', 'LinkedIn, Instagram, X'],
      ['E-mail marketing', 'Sequências e campanhas'],
      ['Landing page', 'Estrutura e copy completos'],
      ['Storytelling', 'Narrativas de marca'],
      ['Ideias de conteúdo', 'Ângulos e planos editoriais'],
    ],
    tones: [['direct', 'Direto'], ['luxury', 'Luxuoso'], ['analytical', 'Analítico'], ['persuasive', 'Persuasivo'], ['creative', 'Criativo']],
  },
  zh: {
    dir: 'zh',
    hreflang: 'zh-Hans',
    badge: '免费试用 — 无需银行卡',
    h1a: '立即生成',
    h1b: '真实内容',
    intro: '选择格式，描述主题，立即获得可直接使用的内容。无需注册，本次试用无需付费。',
    step1: '1. 选择格式',
    step2: '2. 选择语气',
    step3: '3. 你的主题',
    placeholder: '例：面向手工艺者的记账软件，3000 名客户',
    cta: '生成我的免费试用',
    loading: '正在生成…',
    resultTitle: (n) => `生成内容（${n} 字）`,
    copy: '复制文本',
    ref: '编号：',
    convH: '需要比试用更多？',
    convP: '无限使用引擎，六大内容类别，三种输出格式。一次付费，无订阅。',
    convCta: '查看价格',
    cats: [
      ['文案', '销售页、转化文案'],
      ['社交媒体', 'LinkedIn、Instagram、X'],
      ['邮件营销', '序列与活动'],
      ['落地页', '完整结构与文案'],
      ['故事叙述', '品牌故事'],
      ['内容创意', '角度与编辑计划'],
    ],
    tones: [['direct', '直接'], ['luxury', '高端'], ['analytical', '分析'], ['persuasive', '有说服力'], ['creative', '创意']],
  },
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

let total = 0
for (const [code, L] of Object.entries(LANGUES)) {
  const dir = path.join(path.dirname(BASE), L.dir)
  fs.mkdirSync(dir, { recursive: true })

  // On reprend la structure FR et on remplace les chaînes d'interface.
  let t = source

  // 1. Catégories
  const catsFR = [
    ['Copywriting', 'Pages de vente, textes de conversion'],
    ['Réseaux sociaux', 'LinkedIn, Instagram, X'],
    ['E-mail marketing', 'Séquences et campagnes'],
    ['Landing page', 'Structure et copy complets'],
    ['Storytelling', 'Récits de marque'],
    ['Idées de contenu', 'Angles et plans éditoriaux'],
  ]
  catsFR.forEach((fr, i) => {
    t = t.replace(`{ id: '${['copywriting','social-media','email','landing-page','storytelling','ideoque'][i]}', label: '${fr[0]}', aide: '${fr[1]}' }`,
      `{ id: '${['copywriting','social-media','email','landing-page','storytelling','ideoque'][i]}', label: '${L.cats[i][0]}', aide: '${L.cats[i][1]}' }`)
  })

  // 2. Tons
  const tonsFR = [['direct','Direct'],['luxury','Luxueux'],['analytical','Analytique'],['persuasive','Persuasif'],['creative','Créatif']]
  tonsFR.forEach((fr, i) => {
    t = t.replace(`{ id: '${fr[0]}', label: '${fr[1]}' }`, `{ id: '${fr[0]}', label: '${L.tones[i][1]}' }`)
  })

  // 3. Textes
  t = t.replace('Essai gratuit — sans carte bancaire', esc(L.badge))
  t = t.replace('Générez un vrai contenu maintenant', `${esc(L.h1a)}\n              <br />\n              ${esc(L.h1b)}`)
  t = t.replace(
    /Choisissez votre format, décrivez votre sujet, obtenez un contenu exploitable\n            immédiatement\. Aucune inscription, aucun paiement pour cet essai\./,
    esc(L.intro)
  )
  t = t.replace('1. Quel format ?', esc(L.step1))
  t = t.replace('2. Quel ton ?', esc(L.step2))
  t = t.replace('3. Votre sujet', esc(L.step3))
  t = t.replace('Ex. : logiciel de facturation pour artisans, 3 000 clients', esc(L.placeholder))
  t = t.replace("'Génération en cours…'", `'${L.loading}'`)
  t = t.replace("'Générer mon essai gratuit'", `'${L.cta}'`)
  // ATTENTION : jamais de variable du générateur dans le code produit.
  // Le titre doit être un template littéral résolu par React.
  const tpl = L.resultTitle('{resultat.mots}')
  t = t.replace(
    'Votre contenu ({resultat.mots} mots)',
    '{`' + tpl.replace('{resultat.mots}', '${resultat.mots}') + '`}'
  )
  t = t.replace('Copier le texte', esc(L.copy))
  t = t.replace('Référence: {resultat.id}', `${L.ref} {resultat.id}`)
  t = t.replace('Il vous faut plus qu’un essai ?', esc(L.convH))
  t = t.replace(
    /Accès illimité au moteur, six catégories de contenu, trois formules de sortie\.\n                Paiement unique, sans abonnement\./,
    esc(L.convP)
  )
  t = t.replace('Voir les formules', esc(L.convCta))
  t = t.replace('aria-label="Votre contenu', `aria-label="${L.dir}`)

  // 4. Nom de fonction unique
  const fnName = 'EssaiGratuit' + L.dir.charAt(0).toUpperCase() + L.dir.slice(1)
  t = t.replace('export default function EssaiGratuit()', `export default function ${fnName}()`)

  fs.writeFileSync(path.join(dir, 'page.tsx'), t, 'utf8')
  console.log(`créé : /essai-gratuit/${L.dir}`)
  total++
}

console.log(`\n${total} variantes linguistiques créées`)
