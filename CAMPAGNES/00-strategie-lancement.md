# 00 — Stratégie de lancement

**Produit :** ia-premium — moteur de génération de contenu
**Site :** https://ia-premium-chi.vercel.app
**Tarifs :** 49,90 € (unitaire) · 199,90 € (Pack 5) · 499,90 € (coffret à vie)
**État au [date de rédaction] :** 0 vente, 0 paiement, tunnel d'achat fonctionnel (HTTP 200, sessions `cs_live_` créées)

---

## ⚠️ Avertissement préalable — à lire avant toute publication

J'ai audité le site et le code avant d'écrire cette stratégie. **Le problème n'est pas le trafic.** Envoyer du trafic aujourd'hui serait de l'argent brûlé. Il y a trois blocages techniques et juridiques qui rendent toute campagne risquée. Ils sont documentés ci-dessous avec les preuves.

**Je livre quand même le kit complet** (fichiers 01 à 04), parce que le contenu se prépare pendant que l'équipe corrige. Mais **aucun post ne doit être publié tant que le Point 0 n'est pas traité.**

### Ce que j'ai vérifié (et ce que j'ai trouvé)

| # | Constat | Preuve | Conséquence |
|---|---|---|---|
| **B1** | **L'endpoint de génération est entièrement ouvert.** N'importe qui obtient du contenu illimité sans payer. | `curl -X POST /api/generate` sans aucun cookie ni token → `{"success":true, ...}` avec le contenu complet. Le middleware ne limite que le débit (5 req/min), pas l'accès. | **On vend une porte ouverte.** Le produit est gratuit, donc 0 vente est la conséquence logique, pas un problème d'acquisition. |
| **B2** | **Le moteur n'appelle aucun modèle de langage.** C'est un simulateur à templates. | `lib/generator.ts` : les « modèles » (`openers`, `problèmes`, `ctas`) sont des tableaux de chaînes, choisis par `Math.random()`. Le commentaire du fichier est explicite : *« En production, ce serait un appel à un LLM […] Ici, le simulateur produit du contenu de qualité »*. Test réel : le brief « page de vente pour un consultant en stratégie » a renvoyé « On parle souvent de page de vente pour un consultant en strategie, mais on oublie le point de départ : ». | La FAQ en ligne affirme déjà « un modèle de langage de dernière génération affiné ». **C'est faux.** C'est le risque juridique n°1 du projet. |
| **B3** | **L'identité légale de l'éditeur est vide.** | `lib/site.ts` : `raisonSociale`, `siren`, `siret`, `rcs`, `tva`, `adresseSiege`, `email`, `directeurPublication` sont tous à `[À COMPLÉTER]`. Le flag `LEGAL_PLACEHOLDERS_REMAINING = true`. | Vendre à des particuliers en France sans identité légale publiée =/nullité potentielle du contrat, exposition sur le retraitement des données de carte. **Bloquant pour encaisser.** |

**Ce que j'ai aussi constaté, sans gravité :**

- **Grille tarifaire incohérente.** L'accès unitaire à 49,90 € annonce « génération illimitée ». Le Pack 5 à 199,90 € n'offre que 5 crédits. Le tiers cher est donc *objectivement moins intéressant* que le premier. Personne n'achètera les 199,90 €. À corriger avant deitterser sur les tarifs.
- **Aucun dispositif de collecte d'e-mail** sur le site : pas de formulaire newsletter, pas de liste d'attente, pas de prestataire d'envoi. Le fichier `02-emails-lancement.md` est donc **prêt à publier mais pas déployable** tant que ce maillon manque.
- **Aucune preuve client n'existe** (0 vente). C'est pourquoi le post « avant/après » du fichier 01 est écrit sur une démonstration réelle et vérifiable par le lecteur, et non sur un témoignage fabriqué.

### Point 0 — les trois correctifs à faire AVANT de publier

1. **Fermer la porte.** Ajouter une vérification d'entitlement sur `/api/generate` : le generation refuse de s'exécuter sans session authentifiée liée à un paiement Stripe validé. C'est le correctif le plus rentable du projet — il transforme chaque visiteur gratuit en occasion de vente.
2. **Brancher un vrai LLM** (ou reformuler le positionnement). Deux voies, exclusives :
   - *Brancher le modèle* → le produit tient la promesse de la FAQ, le prix de 49,90 € se défend.
   - *Assumer le simulateur* → il faut réécrire la FAQ, la page d'accueil et l'accroche. Mais un moteur à templates ne peut pas se vendre 49,90 €, car il produit moins qu'un abonnement ChatGPT existant. **Dans ce cas, la stratégie commerciale change complètement et ce kit n'est plus le bon.**
3. **Compléter les mentions légales** (raison sociale, SIREN/SIRET, RCS, TVA, adresse, email, directeur de publication) et vérifier la conformité de la politique de remboursement.

**En résumé :** la stratégie ci-dessous est solide, mais elle part de la position « produit Correctif 1 + 2 + 3 livré ». Si le correctif 2 n'est pas retenu, ne pas lancer. Lire la section « Plan de repli » en fin de document.

---

## 1. Quel segment cibler en priorité

### Le choix : **les freelances et consultants indépendants qui rédigent du contenu pour des clients.**

C'est le seul segment qui coche les cinq cases à la fois.

| Critère | Freelances / consultants | Petites agences | E-commerçants | Grands comptes |
|---|---|---|---|---|
| Budget 49,90 € + | ✅ paid | ⚠️ souvent delegation | ❌ ROI trop long à justifier | ✅ mais cycle long |
| Douleur réelle et urgente | ✅ le brief client arrive demain | ⚠️ diluée | ❌ leur problème = trafic, pas texte | ✅ mais gate technique |
| Trouve le produit seul | ✅ LinkedIn, X, Discord | ❌ décideur caché | ⚠️ community noisy | ❌committee |
| Boîte mail joignable | ✅ | ✅ | ⚠️ | ❌ |
| Cycle de décision | ✅ immédiat | ⚠️ 2–6 semaines | ⚠️ | ❌ 3–12 mois |

**Pourquoi eux d'abord, en une phrase :** c'est le seul segment dont la douleur (« j'ai un brief client à rendre cet après-midi et je perds deux heures à partir de zéro ») est à la fois immédiate, chiffrable en euros, et résolue par exactement ce que le produit fait.

**Pourquoi pas les autres maintenant :**

- **E-commerçants** — leur problème n°1 est le trafic et la fiche produit, pas la rédaction. Ils ont déjà Shopify avec des plugins IA. Il faudra une offre « fiches produit + descriptions » dédiée, pas le produit générique.
- **Petites agences** — meilleur panier potentiel (Pack 5, puis 499,90 €), mais le cycle de décision à 199,90 € demande une preuve sociale. **On y va en phase 2**, une fois les premiers témoignages réels recueillis.
- **Grands comptes** — hors périmètre. Un moteur à 49,90 € n'existe pas dans leur grille d'achat.

### Le persona précis (à utiliser dans tous les posts)

> Freelance ou consultant·e de 28–45 ans, 2 à 8 ans d'expérience, facture 350–800 €/jour. Écrit 5 à 20 textes par semaine pour 2 à 5 clients. Utilise déjà ChatGPT ou Claude, mais résultat « correct sans plus ». N'a pas le temps de devenir un expert du prompt. Décideur et prescripteur en une seule personne.

---

## 2. Par où commencer, dans quel ordre

L'ordre n'est pas négociable. Chaque phase dépend de la précédente.

### Phase 0 — Corriger (semaine 0)
Les trois correctifs du Point 0. **Aucune publication avant.**

### Phase 1 — Acter la preuve (semaine 1)
Avant de demander une seule vente, il faut pouvoir montrer le produit. Concert :
- Enregistrer 3 démonstrations réelles (écran, sans montage) : copywriting, email, landing page.
- Les publier en accès libre. **Elles font office de preuve** tant qu'aucun témoignage client n'existe.
- C'est le contenu le plus rentable du lancement : une démo vidéo est réutilisable partout (X, LinkedIn, Discord, groupes, emails).

### Phase 2 — Présence et contenu (semaine 1–2)
Objectif : être trouvable et crédible, pas vendre. 10 posts (fichier 01), 3 articles de blog déjà en ligne, profil LinkedIn complété.

### Phase 3 — Contenu en distribution (semaine 2–4)
Objectif : toucher des communautés existantes. C'est là que le lancement se joue — un produit sans audience propre ne vend pas, il Harveste de l'attention existante.

### Phase 4 — Conversion (semaine 3–5)
Emails (séquences du fichier 02), récupération des paniers abandonnés, offres de lancement.

### Phase 5 — Boucle de preuve (à partir de la semaine 5)
Le premier client réel est un actif stratégique. **Le missionner** : 20 minutes d'échange, son accord écrit pour être cité, son témoignage. Sans cela, le marketing reste plafonné.

---

## 3. Les 5 canaux

Estimations honnêtes : effort en heures sur 4 semaines, coût réel, et résultat **plafonné** (jamais de promesse chiffrée sur du trafic neuf).

### Canal 1 — LinkedIn organique (le canal n°1)

| | |
|---|---|
| **Pourquoi** | C'est là que vivent exactement les freelances qui écrivent du contenu pour des clients. Coconcentration parfaite offre / audience. Et l'algorithme donne encore une portée organic à un compte sans audience si le contenu est commenté. |
| **Effort** | 6 h (dont 3 h 6 h de réponse aux commentaires — c'est là que se fait la portée) |
| **Coût** | 0 € |
| **Fréquence** | 5 posts/semaine pendant 4 semaines |
| **Résultat attendu** | 300 à 1 000 vues cumulées sur la période. 2 à 6 conversations privées qualifiées. **Estimation, pas un engagement** — le premier mois sert à établir une base, pas à vendre. |
| **Ce qu'on mesure** | Nombre de visites site issues de LinkedIn (via UTM) + demandes de contact. |

### Canal 2 — X / Twitter, fil de conversation

| | |
|---|---|
| **Pourquoi** | Le terrain de référence des rédacteurs, SEO et freelances tech. Les conversations y sont plus rapides et moins polies qu'ailleurs — donc moins de contenu vide à gaspiller. |
| **Effort** | 8 h |
| **Coût** | 0 € |
| **Fréquence** | 1 à 2 posts/jour + 1 fil de conversation par semaine |
| **Résultat attendu** | Une notoriété naissante, quelques Signalements directs. Faible conversion directe, forte valeur de crédibilité quand quelqu'un demande « c'est qui, ce site ? ». |
| **Ce qu'on mesure** | Visites avec UTM, mentions, demandes entrantes. |

### Canal 3 — Communautés (Reddit, Discord, groupes Facebook, forums)

| | |
|---|---|
| **Pourquoi** | C'est le canal à plus fort rendement en marketing produit. On accède à des communautéshighlyx pertinentes, à condition d'apparaître comme un pair et non comme un commercial. Fichier 03. |
| **Effort** | 12 h (la valeur est dans les réponses dans le fil, pas dans la publication) |
| **Coût** | 0 € |
| **Fréquence** | 5 à 8 interventions utiles par semaine, 1 message de fond par mois max |
| **Résultat attendu** | 1 à 3 échanges de fond par semaine. Une poignée de visiteurs récurrents. Presque aucune vente directe — **c'est un canal de crédibilité**, pas de closing. |
| **Ce qu'on mesure** | Réponses reçues, clics profil, inscriptions. |
| **Règle absolue** | Jamais de lien de checkout dans un post de communauté. Jamais deux fois le même message. |

### Canal 4 — Partenariats micro-influenceurs (fichier 04)

| | |
|---|---|
| **Pourquoi** | Un creator de 5 000 abonnés Très ciblés (rédaction, freelancing, SEO)ocenttrustedprès de son audience d'une façon qu'aucune pub n'achète. |
| **Effort** | 10 h |
| **Coût** | 150 à 400 € en produit offert + rémunération modeste, voir fichier 04 |
| **Fréquence** | 3 à 5 contacts par mois |
| **Résultat attribué** | 1 à 2 collaborations sur 4 semaines. Audience cumulée de l'ordre de quelques milliers. |
| **Ce qu'on mesure** | Clics avec code unique par créateur (impératif : un code par influencer, sinon impossible d'attribuer). |

### Canal 5 — Email (séquences du fichier 02)

| | |
|---|---|
| **Pourquoi** | Le seul canal qui transforme un visiteur en revenu sans coût d'acquisition. Mais c'est aussi le plus long à construire. |
| **Effort** | 8 h de rédaction + 4 h de mise en place technique |
| **Coût** | 0 à 30 €/mois (prestation d'envoi) |
| **Fréquence** | Séquence welcoming + relance + réactivation |
| **Résultat attendu** | Aucun chiffre de revenus ne peut être honnêtement avancé avant d'avoir une liste. **Le résultat mesurable à 4 semaines, c'est la taille de la liste et le taux d'ouverture.** |
| **Prérequis** | ⚠️ **Le site n'a aujourd'hui aucun formulaire de collecte d'e-mail.** Ce canal n'est pas déployable tant que ce manque n'est pas comblé. |

### Ce qui est délibérément exclu

| Écarté | Pourquoi |
|---|---|
| Google Ads | Un mot-clé générique coûte 3 à 8 € le clic. À 49,90 € de marge et un taux de conversion inconnu, le seuil de rentabilité n'est pas atteint avant d'avoir optimisé le taux de conversion. réinvestir les premières données. |
| TikTok / Reels | Excellent reach, mais audience grand public ≠ intention d'achat premium. À revoir quand la preuve sociale existera. |
| Newsletter sponsorisée | Pas d'audience pour_FRAME_REDAC un rate acceptable. |
| Influenceurs > 50 000 | Hors budget. |

---

## 4. Séquence de lancement — 30 jours

| Semaine | Livrables |
|---|---|
| **S0** | Correctifs B1 (paywall), B2 (vrai moteur), B3 (mentions légales). Démos enregistrées. |
| **S1** | Post 1 (démonstration) et Post 8 (annonce) publiés. Profil LinkedIn et X complétés. 1 démo publiée. |
| **S2** | Posts 2, 3, 4. Première intervention dans 2 communautés. |
| **S3** | Posts 5, 6, 7. Séquence email welcoming activée (si collecte en place). |
| **S4** | Posts 9, 10. Offre de lancement. Premiers contacts micro-influenceurs. |
| **S5+** | Premier témoignage client recueilli. Boucle : témoignage → post → communauté → email. |

---

## 5. Offre de lancement — comment la formuler sans mentir

Le site active `allow_promotion_codes: true` sur Stripe. Un code de réduction est donc techniquement possible.

**Formulation autorisée :**
> « Réduction de lancement : -[X] % avec le code [CODE], jusqu'au [date]. »

**Formulation interdite :** « Offre limitée dans le temps » sans date, « les 50 premiers », « plus que quelques places » — à moins d'un compteur réel. **Toute urgence non vérifiable est une promesse en l'air.**

**La meilleure offre de lancement pour ce produit n'est pas une remise :** c'est un accès gratuit d'une génération, ou une garantie prolongation. Une remise sur 49,90 € dégrade la perception de la valeur ; un essai gratuit n'expose rien. Recommandation : **essai d'une génération offerte** (à condition que le paywall B1 soit en place, sinon c'est déjà gratuit).

---

## 6. Positionnement — ce que le produit dit vraiment

Le brief d'origine décrit « un produit numérique de génération de contenu par IA ». Le code fait autre chose. Il faut choisir avant d'écrire la moindre accroche.

| Option | Accroche | Prix défendable | Effort |
|---|---|---|---|
| **A. Moteur réel branché** | « Votre copilote rédaction, calibré sur votre ton » | 49,90 € défendable | Élevé — brancher le LLM |
| **B. Simulateur assumé** | « Des structures de rédaction prêtes à remplir » | 9,90 € maximum | Faible, mais le marché ne paie plus pour ça |

**Recommandation : option A.** Unscriber à un modèle générique coûte déjà plus que 49,90 €. Le seul créneau possible est **le calibrage** : un moteur qui produit un texte conforme à votre charte de ton, dans le bon format, sans structuration manuelle. C'est là que se trouve la valeur — et c'est exactement ce que les six catégories du moteur promettent.

---

## 7. Plan de repli

Si l'option B est retenue (pas de LLM), ce kit n'est pas adapté. Dans ce cas :

1. Ne pas lancer la campagne de fichiers 01–04 en l'état.
2. Repositionner sur un produit **livrable** (ex. : un kit de structures rédactionnelles documenté) à prix bas, vendu en paiement unique.
3. Le canal n°1 devient le contenu organique long (SEO), pas la communauté.
4. Réécrire la FAQ et l'accueil avant toute communication.

---

## 8. Les 3 choses à mesurer

Sans données, ce document n'est qu'une opinion. À instrumenter dès la Semaine 1 :

| Métrique | Cible de référence | Où |
|---|---|---|
| **Taux de clic checkout → paiement** | À établir — c'est la métrique reine | Dashboard Stripe |
| **Trafic qualifié par canal** | UTM par canal | Analytics |
| **Liste d'e-mails collectés** | Le vrai actif de l'année | Outil d'emailing |

**Si le taux de clic vers paiement est faible alors que le trafic arrive, le problème n'est pas l'acquisition : c'est la page d'accueil ou le prix.** Vérifier dans cet ordre avant de produire du contenu supplémentaire.

---

## Fichiers liés

- `01-posts-lancement.md` — 10 posts prêts à publier
- `02-emails-lancement.md` — 3 séquences email
- `03-communautes.md` — 8 messages de communauté
- `04-partenariats-influenceurs.md` — 5 profils de micro-influenceurs

---

**Règle absolue de ce projet, rappelée ici :** zéro chiffre de vente, zéro témoignage inventé, zéro nom d'entreprise réelle utilisé en exemple. Tout ce qui n'est pas vérifiable est écrit `[À REMPLIR AVEC UNE VRAIE PREUVE]` et doit rester tel quel tant que la preuve n'existe pas.
