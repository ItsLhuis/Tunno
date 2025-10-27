import { danish } from "./locales/da"
import { german } from "./locales/de"
import { english } from "./locales/en"
import { spanish } from "./locales/es"
import { finnish } from "./locales/fi"
import { french } from "./locales/fr"
import { hindi } from "./locales/hi"
import { italian } from "./locales/it"
import { japanese } from "./locales/ja"
import { korean } from "./locales/ko"
import { dutch } from "./locales/nl"
import { norwegian } from "./locales/no"
import { polish } from "./locales/pl"
import { portuguese } from "./locales/pt"
import { russian } from "./locales/ru"
import { swedish } from "./locales/sv"
import { turkish } from "./locales/tr"
import { ukrainian } from "./locales/uk"
import { vietnamese } from "./locales/vi"
import { chinese } from "./locales/zh"

import { type ChangelogMap, type LocaleCode } from "./types"

import type { ChangelogVersionKeys } from "./versions"

export const Changelogs: Record<LocaleCode, ChangelogMap<ChangelogVersionKeys>> = {
  da: danish,
  de: german,
  en: english,
  es: spanish,
  fi: finnish,
  fr: french,
  hi: hindi,
  it: italian,
  ja: japanese,
  ko: korean,
  nl: dutch,
  no: norwegian,
  pl: polish,
  pt: portuguese,
  ru: russian,
  sv: swedish,
  tr: turkish,
  uk: ukrainian,
  vi: vietnamese,
  zh: chinese
}

export const getChangelogs = (locale: LocaleCode): ChangelogMap<ChangelogVersionKeys> => {
  return Changelogs[locale] || Changelogs.en
}
