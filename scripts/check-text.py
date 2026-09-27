#!/usr/bin/env python3
"""Scanne les fichiers .tsx/.ts pour détecter du texte corrompu.

Contexte : de longs passages de prose française générés puis réécrits peuvent
être Introducing silencieusement des caractères来自 une autre écriture, des
ligatures parasites, ou des mots français soudés (« lefacteur », « voixle »).

Contrôles effectués :
  1. Caractères d'une écriture étrangère (CJK, kana, hangul, cyrillique…).
  2. Caractère de remplacement U+FFFD.
  3. Ligatures typographiques parasites (ﬁ, ﬂ).
  4. Espaces insécables (U+00A0) collées au texte.
  5. Mots français soudés — uniquement dans la PROSE.
  6. Marqueurs de template non résolus (TODO, FIXME, lorem ipsum).

Point 5 : la détection des mots soudés est volontairement restreinte à la prose
(texte JSX + chaînes littérales contenant des espaces). Sans cette restriction,
chaque identifiant CamelCase du code (ArticleSection, useState…) déclencherait
un faux positif et le contrôle deviendrait inutilisable.

Code de sortie : 1 si au moins un problème est trouvé, 0 sinon.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGETS = sorted(
    list((ROOT / "app").rglob("*.tsx"))
    + list((ROOT / "app").rglob("*.ts"))
    + list((ROOT / "lib").rglob("*.ts"))
)

FOREIGN_SCRIPT = re.compile(r"[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af\uf900-\ufaff]")
OTHER_ALPHABET = re.compile(r"[\u0250-\u02af\u0400-\u04ff\u0530-\u058f\u0900-\u097f]")
REPLACEMENT = "\ufffd"
LIGATURES = re.compile(r"[\ufb00-\ufb06]")
NBSP = "\u00a0"
PLACEHOLDER_LEAK = re.compile(r"\b(TODO|FIXME|lorem ipsum)\b", re.IGNORECASE)

FR = "àâäéèêëîïôöùûüçÀÂÉÈÊËÎÏÔÖÙÛÜÇ"
# « lefacteur » : 3+ minuscules (avec accents) puis une majuscule puis 1+ lettres.
# Le (?<![A-Za-z]) évite de matcher un fragment à l'intérieur d'un identifiant
# existant : sans lui, « LinkedIn » serait signalé comme « inkedIn ».
FUSED_WORD = re.compile(rf"(?<![A-Za-z])[a-z{FR}]{{3,}}[A-ZÀ-Ý][a-zà-ÿ{FR}]{{1,}}")

# Segments de prose : texte JSX (entre > et <) et littéraux de chaîne.
# Les ATTRIBUTS JSX sont exclus : className="..." contient des classes Tailwind,
# pas de la prose, et produit un bruit considerable.
JSX_TEXT = re.compile(r">([^<>{}]+)<")
QUOTED = re.compile(r"[\"']([^\"'\n]*[ ][^\"'\n]*)[\"']")
JSX_ATTRIBUTE = re.compile(r"\s[A-Za-z][\w-]*=(?:\"[^\"]*\"|\'[^\']*\'|\{[^}]*\})")

# Identifiants CamelCase du code qui peuvent apparaître dans un littéral de
# chaîne. Ils ne sont pas des mots français soudés.
CODE_IDENTIFIERS = {
    "className", "viewBox", "strokeWidth", "strokeLinejoin", "stopWords",
    "serverError", "changeFrequency", "reviewCount", "headerValue",
    "useState", "setState", "setError", "setMessage", "setStatus",
    "setErrors", "setServer", "validateOptions", "hasDegraded",
    "withStructured", "linkedIn", "backgroundColor", "currentIndex",
    "linkedIn", "sonLd", "sonCharset", "datePublished", "dateModified",
    "contentUrl", "imageUrl", "sameAs", "knowsAbout", "mainEntity",
}

# Placeholder légitime : autorisé, pas signalé comme défaut.
ALLOWED_PLACEHOLDER = "[À COMPLÉTER]"


def prose_segments(source: str) -> list[str]:
    # Retire les attributs JSX avant d'extraire le texte visible.
    cleaned = JSX_ATTRIBUTE.sub(" ", source)
    segments = [m.group(1) for m in JSX_TEXT.finditer(cleaned)]
    segments += [m.group(1) for m in QUOTED.finditer(cleaned)]
    return segments


def scan(path: Path) -> list[str]:
    issues: list[str] = []
    source = path.read_text(encoding="utf-8")
    rel = path.relative_to(ROOT)

    for lineno, line in enumerate(source.splitlines(), start=1):
        snippet = line.strip()[:100]
        if FOREIGN_SCRIPT.search(line):
            issues.append(f"{rel}:{lineno} écriture étrangère (CJK/kana/hangul) : {snippet}")
        if OTHER_ALPHABET.search(line):
            issues.append(f"{rel}:{lineno} alphabet non Latin/Cyrillique inattendu : {snippet}")
        if REPLACEMENT in line:
            issues.append(f"{rel}:{lineno} caractère de remplacement U+FFFD : {snippet}")
        if LIGATURES.search(line):
            issues.append(f"{rel}:{lineno} ligature typographique parasite : {snippet}")
        if NBSP in line:
            issues.append(f"{rel}:{lineno} espace insécable : {snippet}")
        match = PLACEHOLDER_LEAK.search(line)
        if match:
            issues.append(f"{rel}:{lineno} marqueur non résolu « {match.group(0)} »")

    seen: set[str] = set()
    for segment in prose_segments(source):
        for match in FUSED_WORD.finditer(segment):
            word = match.group(0)
            if word in seen or word in CODE_IDENTIFIERS:
                continue
            seen.add(word)
            issues.append(f"{rel} mot français soudé « {word} »")

    return issues


def main() -> int:
    all_issues: list[str] = []
    for path in TARGETS:
        all_issues.extend(scan(path))

    if all_issues:
        print(f"✗ {len(all_issues)} problème(s) de texte détecté(s) :\n")
        for issue in all_issues:
            print(f"  - {issue}")
        return 1

    print(f"✓ {len(TARGETS)} fichiers analysés — aucun texte corrompu détecté.")
    print(f"  (placeholder autorisé : {ALLOWED_PLACEHOLDER})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
