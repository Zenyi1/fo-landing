import type { Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";
import { ja } from "./dictionaries/ja";

const dictionaries: Record<Locale, Dictionary> = { en, ja };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary } from "./dictionaries/en";
