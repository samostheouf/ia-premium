# Audit des concurrents — Génération de contenu par IA

**Projet :** ia-premium · https://ia-premium-chi.vercel.app
**Date de collecte :** 28 septembre 2026
**Méthode :** pages de tarifs officielles de chaque éditeur (lecture directe) + pages d'aide officielles. Les agrégateurs tiers n'ont servi qu'à repérer des URLs, jamais de source de prix.

> ⚠️ **Règle de lecture.** Toute valeur chiffrée de ce document porte une URL. Si une donnée n'a pas pu être lue sur la page officielle, la case contient **« à vérifier »** plutôt qu'une estimation. Les prix sont relevés en USD ou EUR selon la devise de l'éditeur, hors taxes sauf mention contraire, et sont valables à la date de collecte uniquement.

---

## 1. Tableau comparatif — acteurs internationaux

| # | Acteur | Offre | Prix vérifié (source) | Cible | Points forts | Limites | Ce qu'il ne fait PAS |
|---|--------|-------|----------------------|-------|-------------|---------|----------------------|
| 1 | **ChatGPT** (OpenAI) | Assistant généraliste | Free $0 · **Plus $20/mois** ([help.openai.com/en/articles/6950777](https://help.openai.com/en/articles/6950777)) · **Go $8/mois** ([openai.com/index/introducing-chatgpt-go](https://openai.com/index/introducing-chatgpt-go/)) · **Pro $200/mois** et **Pro $100/mois** (5× et 20× l'usage de Plus) ([help.openai.com/.../9793128](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers)) · Business/Enterprise tarifés par utilisateur/mois, montant non extractible → **à vérifier** ([openai.com/chatgpt/pricing](https://openai.com/chatgpt/pricing/)) | Grand public, developers, PME | Modèles de pointe,mémoire, dépôt de fichiers, recherche approfondie | Abonnement uniquement ; pas de cadre éditorial métier ; pas de formats de sortie structurés | N'est pas un outil de rédaction marketing : pas de templates par canal, pas d'export JSON/Markdown, pas de ton de marque, pas de contrôle de conformité |
| 2 | **Jasper** | Plateforme marketing IA | **Pro $59/mois facturé annuellement** (1 siège) ; Business sur devis ([help.jasper.ai/hc/en-us/articles/18618709412123-Annual-Plans](https://help.jasper.ai/hc/en-us/articles/18618709412123-Annual-Plans)) · essai gratuit affiché sur [jasper.ai/pricing](https://www.jasper.ai/pricing) · modèle hybride : forfait plateforme + crédits à la consommation ([help.jasper.ai/.../46644376016923](https://help.jasper.ai/hc/en-us/articles/46644376016923-Credits-Based-Pricing)) | Marketers et entreprises | Agents métiers, Brand IQ / Style Guide, pipelines de contenu, Canvas, API, MCP, GEO | Prix Business sur devis, engagement annuel de 12 mois sur annuel, compteur de crédits | Pas de paiement unique ; l'interface est en anglais ; pas de version orientée francophonie |
| 3 | **Copy.ai** | Orchestration GTM | **Chat (5 sièges) $29/mois** ou **$24/mois facturé annuellement ($288/an)** · **Growth (75 sièges) $1 000/mois** ($12 000/an) · **Expansion (150 sièges) $2 000/mois** · **Scale (200 sièges) $3 000/mois** · Enterprise sur contact ([copy.ai/pricing](https://www.copy.ai/pricing)) | Grandes équipes sales/marketing | Mots illimités en chat, accès OpenAI/Anthropic/Gemini, crédits de workflow, API et intégrations | Palier d'entrée déjà à 5 sièges et $29/mois ; les paliers supérieurs démarrent à $1 000/mois | Pas d'offre unitaire ; pas de version française ; oriented workflow entreprise, pas production de texte rapide |
| 4 | **Writesonic** | Contenu SEO + agents | **$79/mois** (annuel, « Save $240/year »), **$199/mois** (annuel), **$399/mois** (annuel), Enterprise sur devis ; quotas **15 / 25 / 50 articles IA par mois** ([writesonic.com/pricing](https://writesonic.com/pricing)) | Équipes SEO, agences | SEO on-page, agents, Action Center | Tarifs mensuels non repris sur la page lue → **à vérifier** ; plafonds d'articles mensuels | Pas de paiement unique ; pas de rédaction de texte de vente (copy) ni d'email marketing ; pas de sortie JSON |
| 5 | **Notion AI** | IA intégrée à l'espace de travail | **Free $0/membre/mois** et **Plus $10/membre/mois** incluent un *essai* de Notion AI ; **Business $20/membre/mois** (Notion Agent, AI Meeting Notes, Enterprise Search) ; Enterprise sur devis ; **Custom Agents** : essai gratuit puis **$10 / 1 000 crédits Notion mensuels** ([notion.com/pricing](https://www.notion.com/pricing)) | Équipes déjà dans Notion | IA intégrée au lieu de travail, agents autonomes, SSO, sécurité | IA complète réservée au plan Business ; crédits agents en supplément | Ne génère pas de contenu marketing structuré : pas de templates par canal, pas de gestion de charte éditoriale, pas d'export |
| 6 | **Rytr** | Assistant de rédaction | **Free $0/mois** (sans CB) · **Unlimited $7,50/mois** · **Premium $24,16/mois** ; 10 000 caractères/mois en Free, illimité en payants ; vérif anti-plagiat : aucune / 50 / 100 par mois ([rytr.me/pricing](https://rytr.me/pricing)) | Freelances, indépendants | Prix d'entrée bas, large choix de rytrs, vérification de plagiat | Devise USD avec taux appliqué par Stripe ; engagement 12 mois sur le plan annuel (20 % de remise) | Pas de paiement unique ; pas de memory brand structurée ; pas de JSON ; pas de cible B2BFR |
| 7 | **Lex** | Éditeur de texte avec IA | **À vérifier** — la page officielle [lex.page/pricing](https://lex.page/pricing) a été lue mais le tarif n'y est pas rendu dans le contenu extrait. Sources tierces en désaccord : $12/mois ([toolify.ai](https://www.toolify.ai/tool/lex/)) vs $14,99/mois ([hellostack.io](https://hellostack.io/writing/lex)) | Auteurs, rédacteurs, newsletters | Éditeur focalisé sur l'écriture, accès GPT + Claude, confidentialité via API entreprise | Prix non confirmé à la source ; surface éditoriale en anglais uniquement | Pas de texte de vente, pas de landing page, pas de formats structurés, pas de paiement unique |
| 8 | **Frase** | Plateforme SEO + rédaction | **Starter $39/mois** (annuel) / **$49/mois** (mensuel), 10 articles + 50 pages d'audit par mois · **Professional $103/mois** (annuel) / **$129/mois** (mensuel), 3 sièges, sièges supplémentaires $29/mois · **Scale $239/mois** (annuel) / **$299/mois** (mensuel), 5 sièges · essai gratuit 7 jours, sans carte bancaire ([frase.io/pricing](https://www.frase.io/pricing)) | SEO, agences | Briefs, analyse SERP, audit de contenu, limites mensuelles claires | Modèle sous contrat annuel ; geared SEO d'abord ; pas de copy de vente ni d'emails | Pas de paiement unique ; pas de format JSON/Markdown ; pas de sortie multi-canal (réseaux, email) |
| 9 | **Simplified** | Agents marketing | **Starter $79/mois** — comparatif officiel : « Simplified Starter $79/mo · Jasper $59/mo · ChatGPT Plus $20/mo · HubSpot Marketing Hub $800/mo » ([simplified.com/pricing](https://simplified.com/pricing)). Détail des paliers Pro/Business : **à vérifier** (source tierce : $119/mois Pro, $239/mois Business) | PME, e-commerçants | Campagnes complètes (copy, design, vidéo, planification) | Positionnement très « full-stack marketing » ; la copie n'est qu'une brique | Pas de paiement unique ; pas de production de texte isolé à la demande ; pas de sortie structurée |
| 10 | **Anyword** | Copie optimisée à la performance | **Starter $49/mois** · **Data-Driven $99/mois** · Business et Enterprise (montants **à vérifier**) ; la page affiche également $39/mois et $79/mois selon le sélecteur de facturation — à confirmer ([anyword.com/pricing](https://www.anyword.com/pricing)) | Équipes marketing et performance | Copie « data-driven », scores de prédiction, training sur les campagnes passées | Modèle conceptually anglophone ; le prix affiché varie selon la bascule de facturation | Pas de paiement unique ; pas de formats structurés ; orientation campagnesPlus que production à la demande |

---

## 2. Tableau complémentaire — acteurs francophones

Ce sont les concurrents les plus dangereux pour ia-premium : mêmes clients, même langue, mêmes canaux.

| # | Acteur | Offre | Prix vérifié (source) | Cible | Points forts | Limites | Ce qu'il ne fait PAS |
|---|--------|-------|----------------------|-------|-------------|---------|----------------------|
| 11 | **neuroflash** | Plateforme contenu + « Digital Twins » | **Essential 42 €/mois** (facturation annuelle, + TVA) · **Pro 84 €/mois par utilisateur** (annuel) · Enterprise sur devis ; essai gratuit 7 jours ([neuroflash.com/new-pricing-draft-2026](https://neuroflash.com/new-pricing-draft-2026/), confirmé sur la page DE [neuroflash.com/de/preisplaene](https://neuroflash.com/de/preisplaene/)) — *la page tarifaire principale est rendue en JS, montant non extractible → **à vérifier*** | Agences, marketing B2B, performance | « Digital Twins » (simulation de réaction de cibles réelles), validation avant mise en ligne, serveur en Allemagne, ISO/IEC 27001:2022, API/MCP | **1 200 €/mois minimum** (42 € + 84 €) pour un usage Pro ; interface DE/EN, FR partielle ; modèle€/mois | Pas de paiement unique ; pas de sortie JSON/Markdown ; pas de copywriting email/ventes court |
| 12 | **NOMO IA** | Workflow éditorial multi-agents | **Foundation 100 €/mois** (13 agents, 500 crédits/mois) · **Momentum 500 €/mois** (3 000 crédits) · **Authority sur devis** ; page publiée le 04/01/2026 ([nomo-ia.com/tarifs](https://www.nomo-ia.com/tarifs/)) | Équipes marketing B2B | Chaîne éditoriale en 8 étapes, Schema.org JSON-LD auto, optimisation GEO, on-premise en Authority | **Minimum 100 €/mois** ; orienté équipe, pas individuel ; *incohérence à signaler : la page FR annonce 13 agents, la page EN 11 — **à vérifier*** | Pas de paiement unique ; pas d'accès individuel grand public ; pas de copy court (hook, headline) isolé |
| 13 | **AutoKopy** | Suite copywriting IA FR | **0 € puis 99 €/mois** après un essai gratuit de 3 jours ; page mentions légales listant 99 / 299 / 499 / 799 / 999 € par mois HT ([autokopy.ai/pricing](https://www.autokopy.ai/pricing), [autokopy.ai/legal](https://www.autokopy.ai/legal)) | Marketers et entrepreneurs FR | 12 outils de copie, scripts VSL, communauté, contact fondateur | Modèle abonnement avec facturation reconduction automatique | Pas de paiement unique ; pas de sortie structurée ; pas de couverture multilingue |
| 14 | **Alchie** | Générateur de posts LinkedIn | **19 € HT/mois** (jusqu'à 4 posts + 12 retouches) · **49 € HT/mois** (jusqu'à 10 posts + 30 retouches) · essai 7 jours + 2 posts offerts ([alchie.fr/pricing](https://www.alchie.fr/pricing)) | Consultants, coachs, indépendants | Ciblé LinkedIn pur, retouches à la demande, dictée vocale | Mono-canal (LinkedIn) ; volumes très faibles ; pas de copy longue | Ne fait ni landing page, ni email, ni storytelling, ni sortie structurée |
| 15 | **CoreProse** | Contenu sourcé et vérifié | **Free 0 €** · **Starter 39 €** · **Pro 149 €** · **Business 299 €** ([coreprose.com/fr/pricing](https://www.coreprose.com/fr/pricing)) | SEO, éditeurs, experts | Fact-checking + 5 à 10 sources vérifiées, entity linking, GEO, localisations 13 langues | Modèle abonnement ; le tarif affiché n'indique pas si la facturation est mensuelle → **à vérifier** | Ne fait pas de copy de vente ni d'email marketing ; pas de paiement unique |

---

## 3. Ce que révèle le marché — synthèse factuelle

**3.1 — Aucun acteur du marché n'a de paiement unique.**
Sur les 15 acteurs relevés, la totalité des offres tarifées repose sur l'abonnement mensuel ou annuel. Seuls les niveaux « free » ou « essai gratuit » (3 à 7 jours) sont gratuits. C'est le point le plus constant de l'audit.

**3.2 — La fourchette de prix se lit en trois étages.**

| Étage | Acteurs | Prix relevés |
|-------|---------|--------------|
| Entrée gratuit / freemium | ChatGPT Free, Notion Free, Rytr Free, CoreProse Free, ChatGPT Go | $0 à $8/mois |
| Abonnement individuel | ChatGPT Plus, Rytr, Lex, AutoKopy, Alchie, neuroflash Essential, Frase Starter | $20/mois à ~42 €/mois |
| Abonnement équipe / plateforme | Jasper Business, Copy.ai Growth+, NOMO IA Foundation, neuroflash Pro, Frase Professional, Simplified, Writesonic, Anyword Data-Driven | ~60 €/mois à 1 000 $/mois |

ia-premium se place, lui, **hors de cette grille** : 49,90 € / 199,90 € / 499,90 € en paiement unique ([lib/pricing.ts](../lib/pricing.ts)).

**3.3 — La granularité « un besoin, un prix » n'existe pas.**
Alchie vend 4 posts par mois pour 19 € HT. Frase vend 10 articles par mois pour $39. rytr vend 10 000 caractères par mois pour $0. Les unités de vente sont des *quotas mensuels* qui se rétrécissent quand on baisse le prix. Un produit qui vend *à l'unité* n'a pas été identifié sur l'ensemble de l'échantillon.

**3.4 — Le français est traité comme un bonus, pas comme un marché.**
neuroflash, NOMO IA, AutoKopy et Alchie sont francophones ou localisés. En revanche les leaders (Jasper, Copy.ai, Frase, Writesonic, Anyword, Lex, Simplified) ont une interface et une documentation en anglais. C'est un espace réel, et il est déjà occupé par 4 acteurs — la différenciation ne peut donc pas reposer sur le seul français.

**3.5 — La conformité à l'AI Act devient un argument commercial, et personne ne le porte bien.**
L'article 50 du règlement européen (UE) 2024/1689 (AI Act) impose des obligations de transparence aux déployeurs à compter du **2 août 2026** ([ARPP, fiche pratique](https://www.arpp.org/wp-content/uploads/2026/08/030826-FICHE-PRATIQUE-ETIQUETAGE-IA-V)). Le sujet apparaît déjà dans les requêtes FR (« étiquetage contenu IA AI Act »). Aucun des 15 acteurs ne propose de fonctionnalité de marquage ou de preuve de conformité.

---

## 4. Espace blanc — où ia-premium peut se différencier

### 4.1 Contrainte produit à connaître avant toute promesse

> 🔴 **Point de vérité interne.** `lib/generator.ts` (950 lignes) est un **moteur de rendu par templates**, pas un appel à un modèle de langage. Le commentaire du fichier le dit explicitement : « Modèle client premium […] Ici, le simulateur produit du contenu de qualité ». Les métadonnées d'usage (`GenerationUsage`) sont documentées comme « simulées ».
>
> Conséquence directe et non négociable : **ia-premium ne peut pas revendiquer l'usage d'un LLM frontier, ni citer un nom de modèle, ni quantifier un gain de qualité, ni se comparer en précision à ChatGPT ou Claude.** Toute promesse formulée sur cette base serait fausse — donc interdite. Le document de stratégie (`01-strategy-positionnement.md`) est construit en conséquence.

### 4.2 Les quatre espaces blancs identifiés

| Espace blanc | Constat vérifiable | Opportunité pour ia-premium |
|---------------|--------------------|------------------------------|
| **E1 — Le paiement unique** | 15/15 acteurs en abonnement (cf. 3.1) | Le seul axe où ia-premium est aujourd'hui objectivement seul. Position défendable tant que le tunnel fonctionne. |
| **E2 — Le livrable, pas l'outil** | Le marché vend des *quotas* (4 posts, 10 articles, 10 000 caractères). Le client veut un *texte fini* | Vendre un résultat unitaire : « une landing page prête à publier », pas « 200 mots/mois » |
| **E3 — La sortie structurée** | Sur les 15 acteurs, **aucun** ne propose d'export JSON structuré ou Markdown documenté comme fonctionnalité centrale. C'est la première qui le fait explicitement ([lib/generator.ts](../lib/generator.ts), formats `plain` / `markdown` / `json`) | Angle « la brique qui se branche sur votre CMS / CRM / outil d'emailing ». Vérifiable par le client en 30 secondes. |
| **E4 — La preuve de conformité** | Article 50 applicable depuis le 02/08/2026, et aucun acteur ne l'adresse ([ARPP](https://www.arpp.org/wp-content/uploads/2026/08/030826-FICHE-PRATIQUE-ETIQUETAGE-IA-V)) | Fournir une trace : horodatage, version du moteur, export du contenu, mention d'usage IA. *Attention : à construire côté produit, ce n'est pas acquis.* |

### 4.3 Les espaces déjà pris — à ne pas attaquer de front

- **Automatisation de publication** : auto-post.io, IATOLL Blogbuster, Creati.ai dominent la requête « automatiser contenu blog IA ».
- **Volume SEO illimité** : Frase, Writesonic, CoreProse.
- **LinkedIn** : Alchie (19 €/mois, très bien positionné sur « outil rédaction IA »).
- **Orchestration d'entreprise** : Copy.ai, NOMO IA, neuroflash.
- **Comparatifs et directories** : BDM, Shopify, Codeur, Zapier, lacreme.ai occupent massivement les requêtes « meilleur outil / alternative ChatGPT ». Y entrer suppose un budget de production de contenu que le site n'a pas aujourd'hui.

### 4.4 La différenciation soutenable, formulée en une phrase

> **ia-premium ne vend pas un outil de génération : il vend un texte professionnel prêt à publier, payé une fois, livrable en JSON, avec une trace de conformité — là où les 15 concurrents vendent un abonnement à un quota de mots.**

Cette phrase est défendable au sens où **chaque élément est vérifiable aujourd'hui** : paiement unique (Stripe LIVE, 3 formules), 6 catégories de contenu, 3 formats de sortie, politique de remboursement écrite ([app/conditions-remboursement](../app/conditions-remboursement/page.tsx)). Elle ne dépend d'aucune promesse de qualité non mesurée.

---

## 5. Données manquantes — à vérifier

| Donnée | Pourquoi | Comment vérifier |
|--------|----------|-------------------|
| Tarifs mensuels Writesonic (hors annuel) | Page officielle tronquée | javascript sur writesonic.com/pricing |
| Tarifs Lex Pro | Non rendus sur la page officielle | Widget de paiement sur lex.page/pricing |
| Paliers Pro/Business de Simplified | Absents du contenu extrait | Page officielle rendue |
| Tarifs Business/Enterprise ChatGPT | Non extractibles | Page officielle ou centre d'aide |
| Prix d'entrée neuroflash (page principale) | Page rendue en JS | neuroflash.com/pricing rendu |
| Cohérence 11 vs 13 agents NOMO IA | Incohérence FR/EN constatée | Contacter l'éditeur ou signaler |
| Périodicité de facturation CoreProse (mensuel ?) | Non précisée sur la page | Page officielle / CGV |
| Volumes de recherche réels des mots-clés | Aucun outil SEO branché | Google Search Console, ou Ahrefs/Semrush (payants) — le fichier `02-mots-cles.md` ne donne que des estimations **qualitatives** |

---

*Sources : pages de tarifs et d'aide officielles citées ci-dessus, collectées le 28 septembre 2026. Aucun chiffre de ce document n'est estimé.*
