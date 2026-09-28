# Stratégie de positionnement — ia-premium

**Date :** 28 septembre 2026
**Base :** `00-audit-concurrents.md` (15 acteurs, prix vérifiés)
**Contrainte structurante :** `lib/generator.ts` est un moteur de rendu par templates, pas un appel à un LLM. Voir §0.

---

## 0. Garde-fou éditorial — à lire avant d'écrire un seul texte

Ce document n'est exploitable que si la règle qui suit est appliquée sans exception.

**Ce que le produit fait réellement :**
- rend du contenu structuré à partir de templates premium, par cadrage explicite (`ContentCategory`, `tone`, `personality`, `targetAudience`, `lengthWords`) ;
- produit 6 catégories (copywriting, social-media, email, landing-page, storytelling, idéoque) ;
- sort 3 formats (texte brut, Markdown, JSON structuré) ;
- applique 5 registres de personnalité (creative, direct, luxury, analytical, persuasive) ;
- délivre immédiatement après paiement, sans abonnement.

**Ce que le produit ne fait pas — et ne revendiquera jamais :**
- ❌ « propulsé par GPT-4 / Claude / Gemini » ou tout nom de modèle — **interdit**, le code ne le fait pas ;
- ❌ « résultats supérieurs à ChatGPT » ou toute comparaison de qualité — **interdit**, non mesuré ;
- ❌ « qualité supérieure », « indétectable par les détecteurs d'IA », « optimisé SEO » sans démonstration — **interdit**, non prouvé ;
- ❌ toute statistique (« 10 000 utilisateurs », « 4,9/5 », « +37 % de conversion ») — **interdit**, aucune donnée.

**Conséquence stratégique :** on ne peut pas gagner un duel de qualité technique. Le seul terrain où ia-premium est **objectivement, vérifiablement** en avance est celui du **modèle commercial et de la forme du livrable** — paiement unique, vente à l'unité, sortie structurée. Tout le document ci-dessous est bâti là-dessus, et nulle part ailleurs.

---

## 1. Positionnement recommandé

### 1.1 Le positionnement

> **ia-premium est un service de rédaction qui livre un texte professionnel prêt à publier, payé une seule fois.**
> Ce n'est pas un abonnement à un quota de mots. C'est une commande, avec un livrable et un format de sortie choisi.

### 1.2 Le client cible primaire

| Critère | Cible retenue | Raison |
|---------|----------------|--------|
| Métier | Freelance, consultant, petite agence,*e-commerce* | Dort déjà avec 3-5 outils payants, connaît la facture récurrente |
| Taille | 1 à 5 personnes | N'a ni budget ni besoin d'une plateforme à 100 €/mois |
| Besoin réel | « J'ai une landing page / une séquence email à écrire avant vendredi » | Besoin ponctuel, pas un flux continu |
| Budget | 50 € à 500 € l'année pour ce poste | Couvre exactement les 3 formules |
| Trigger d'achat | Deadline courte (lancement, campagne, refonte) | Rend l'achat à l'unité naturel |

### 1.3 Le client cible secondaire

**Agences et consultants qui revendent de la production éditoriale.** Ils ont besoin du format JSON pour brancher leur chaîne, et du paiement à l'unité pour facturer au projet plutôt que de s'abonner à un seat par siège.

### 1.4 Le concurrent de référence (le seul qu'on nomme)

**ChatGPT Plus ($20/mois)**, et non Jasper ou Copy.ai. Raison : c'est le vrai point de comparaison du client français, il est le moins cher de l'échantillon, et le seul argument qui le bat est **structurel** — pas de dollar par mois, un livrable daté, et pas de ligne à surveiller dans 3 mois.

### 1.5 Ce qu'on ne fait pas

| ❌ On ne dit pas | ✅ On dit à la place |
|-----------------|-------------------|
| « La meilleure IA de rédaction » | « Le seul paiement unique du marché » |
| « Textes 100 % humanoïdes » | « Textes en 5 registres, du luxueux au persuasif » |
| « Illimité » sans précision | « Générations illimitées » (formulation déjà sur `/pricing`) |
| « SEO garanti » | « Sortie JSON et Markdown, prête à brancher » |

---

## 2. Les trois variantes de message

---

### Variante A — « Zéro abonnement »

**Angle :** le prix. On attaque l'abonnement comme catégorie, pas un outil.

**Accroche :**
> « Vous avez payé à ChatGPT, à Jasper, à Notion. Cette année ? Vous ne payez que quand vous avez besoin. »

**Promesse :** accès complet au moteur premium pour 49,90 €, payé une fois. Pas de reconduction, pas de prélèvement automatique, pas de « renewal failed » en janvier.

**Preuve à apporter :**
1. ✅ **Acquis** — les 3 formules sont en paiement unique via Stripe, sans abonnement ([lib/pricing.ts](../lib/pricing.ts)).
2. ✅ **Acquis** — une page `/conditions-remboursement` explicite les cas de remboursement, y compris décevant sur le fond ([app/conditions-remboursement](../app/conditions-remboursement/page.tsx)).
3. 🔨 **À produire** — un comparatif « coût réel sur 12 mois » sur `/pricing`, chiffres tirés de `00-audit-concurrents.md` avec URLs. Exemple vérifiable : ChatGPT Plus $20/mois × 12 = $240/an, Against ia-premium 49,90 € + 199,90 € = 249,80 € d'achat unique. *Le taux de change n'est pas relevé dans l'audit → afficher « selon le taux en vigueur », ne pas convertir en dur.*
4. 🔨 **À produire** — capture du tunnel Stripe montrant l'absence de case « abonnement ».

**CTA :** « Voir les 3 formules — paiement unique »

**Quand l'utiliser :** trafic froid, pages tarifaires, support.google ads sur « alternative ChatGPT pas cher ». C'est l'angle le plus fort en.databind et le plus facile à prouver.

**Risque :** purely sur le prix, la marge de négociation reste forte contre 49,90 €. Assumer : la promesse porte sur la **structure de coût**, pas sur la qualité.

---

### Variante B — « La brique qui se branche »

**Angle :** le livrable. On parle à la technique, à l'agence, à celui qui a déjà un CMS.

**Accroche :**
> « ChatGPT vous donne du texte à copier. On vous donne du JSON à brancher. »

**Promesse :** chaque génération sort en texte brut, Markdown ou JSON structuré, avec les métadonnées (ton, public cible, intention, mots-clés extraits, temps de lecture) incluses dans la sortie.

**Preuve à apporter :**
1. ✅ **Acquis** — les 3 formats sont implémentés dans le moteur (`OutputFormat: "plain" | "markdown" | "json"`), et `GenerationMetadata` porte ton, audience, intention, temps de lecture, usages suggérés, mots-clés ([lib/generator.ts](../lib/generator.ts)).
2. ✅ **Acquis, vérifiable en direct** — l'audit montre qu'**aucun des 15 concurrents** ne vend d'export JSON structuré comme fonctionnalité centrale. C'est le point le plus défendable du dossier.
3. 🔨 **À produire** — un exemple de sortie JSON réelle affiché dans un article du blog. Capture d'écran ou bloc de code, chiffré sur un besoin réel.
4. 🔨 **À produire** — 2 à 3 recipes : « brancher sur Webflow », « injecter dans un CRM », « publier en Markdown sur un site statique ». *À vérifier techniquement* : les exemples doivent être testés, pas imaginés.

**CTA :** « Voir un exemple de sortie JSON »

**Quand l'utiliser :** trafic de consideration, articles de fond, audience agence/développeur. Moins de trafic, mais meilleur panier sur le Coffret à 499,90 €.

**Risque :** c'est un angle de **produit technique**, pas de marketing. Il ne suffit pas seul à vendre l'Accès unitaire à 49,90 €.

---

### Variante C — « La trace »

**Angle :** la conformité. On parle au responsable marketing, au juriste, à l'agence qui doit justifier l'origine de ses contenus.

**Accroche :**
> « Depuis le 2 août 2026, l'article 50 de l'AI Act impose la transparence sur les contenus générés. La plupart des outils ne vous donnent rien pour le prouver. »

**Promesse :** une chaîne de traçabilité par génération — horodatage, version du moteur, contenu exporté, format livré — stockable et présentable en cas de contrôle.

**Preuve à apporter :**
1. ✅ **Acquis (juridique)** — l'applicabilité de l'article 50 aux déployeurs depuis le 2 août 2026 est documentée par l'ARPP et la Commission européenne ([ARPP](https://www.arpp.org/wp-content/uploads/2026/08/030826-FICHE-PRATIQUE-ETIQUETAGE-IA-V), [Commission européenne — code de pratique](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content)).
2. 🔴 **À vérifier impérativement** — le texte exact de l'obligation, son champ d'application réel pour un service de rédaction B2B, et ce qui est exigé vs recommandé. **Ne pas publier d'article sur ce thème avant validation juridique.** L'angle est fort mais le risque réglementaire est élevé.
3. 🔴 **À construire** — la fonctionnalité de traçabilité **n'existe pas** aujourd'hui dans `lib/generator.ts`. Le moteur produit un `id` et un `createdAt` ([lib/generator.ts](../lib/generator.ts)) : c'est une base, pas une fonctionnalité. Ne pas annoncer ce qui n'est pas livré.
4. ✅ **Acquis** — la politique de confidentialité RGPD existe ([app/politique-confidentialite](../app/politique-confidentialite/page.tsx)).

**CTA :** « Lire notre politique de confidentialité »

**Quand l'utiliser :** **en attendant la construction de la fonctionnalité.** En l'état, cet angle ne peut pas être vendu — il peut seulement être *préparé* (un article informatif, sans promesse produit).

**Risque :** le plus élevé des trois. Une fausse interprétation de l'AI Act se retourne contre l'éditeur et contre le client. **Statut : à ne pas activer en message commercial avant validation juridique + développement produit.**

---

## 3. Recommandation d'arbitrage

| | Variante A | Variante B | Variante C |
|---|---|---|---|
| Preuve déjà disponible | ✅ Oui | ✅ Oui | 🔴 Non |
| Différenciation réelle | ✅ Élevée | ✅ Élevée | ⚠️ Spéculative |
| Audience | Large | Agence/dev | Entreprise |
| Panier visé | 49,90 € | 499,90 € | Enterprise |
| Risque juridique | Faible | Faible | **Élevé** |
| Facilité de démonstration | Moyenne | **Élevée** | Nulle |

### Recommandation

**A en message principal, B en message de preuve.**

- **A porte l'acquisition** : c'est le seul angle défendable immédiatement, et il répond à la douleur financière réelle d'un public qui paie déjà 4 à 5 abonnements.
- **B porte la différenciation** : c'est le seul point techniquement vérifiable face aux 15 concurrents. Il se démontre en 30 secondes, ce qu'aucun argument qualité ne permet.
- **C est mis en sommeil** : l'opportunité est réelle et datée, mais elle exige un travail juridique et un développement produit. La préparer en article de blog informatif est prudent ; la vendre en message ne l'est pas tant que la fonctionnalité n'existe pas.

**Formulation de homepage recommandée :**
> « Contenu premium par IA. Paiement unique, pas d'abonnement. Textes en 6 catégories, exportables en JSON, Markdown ou texte brut. »

**Preuve sous le titre :** les 3 formules et le prix. Pas de mention de modèle, pas de superlatif.

---

## 4. Ce qu'il faut corriger avant de lancer la machine de contenu

| Point | Constat | Action |
|-------|---------|--------|
| Placeholders légaux | `COMPANY` contient des champs `[À COMPLÉTER]` (SIREN, SIRET, RCS, TVA, adresse, email) et `LEGAL_PLACEHOLDERS_REMAINING = true` ([lib/site.ts](../lib/site.ts)) | **Bloquant pour une vente commerciale en France.** Renseigner avant tout achat réel. |
| ROI non affichable | Les factures d_POSITION concurrentes sont en USD ; aucun taux de change n'a été relevé | Ne jamais convertir en dur. Écrire « selon le taux en vigueur » ou travailler en euros avec la source. |
| Produit vs promesse | Le moteur est un simulateur de templates | Toute mention de « modèle IA » dans les pages futures doit rester **vraie**. Le plus sûr : « moteur de génération de contenu », formulation déjà présente dans la FAQ. |
| Traçabilité | Non implémentée | Ne pas annoncer avant développement. |
| Comparatif ChatGPT | `$240/an` est vérifiable sur la source OpenAI ; l'équivalent en euros ne l'est pas | Présenter le comparatif en devise, avec la date de relevé. |

---

## 5. Idées d'angles à ne pas utiliser (et pourquoi)

| Idée | Raison du refus |
|------|-----------------|
| « On utilise les derniers modèles IA » | Faux. `lib/generator.ts` est un moteur à templates. |
| « Contenu indétectable par les détecteurs d'IA » | Non mesuré, et juridiquement sensible. |
| « Classé n° 1 des outils de rédaction FR » | Aucune source ne l'établit. |
| « +200 % de conversion » | Aucune donnée. |
| « 2 300 clients comme Wisewand » | Chiffre d'un concurrent, pas le nôtre. |
| « Le meilleur rapport qualité-prix » | Superlatif non démontré. |

---

*Document bâti sur des faits vérifiés le 28 septembre 2026. Les éléments marqués 🔴 ou « à vérifier » sont des chantiers ouverts, pas des acquis.*
