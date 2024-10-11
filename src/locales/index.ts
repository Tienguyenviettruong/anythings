import { createI18n } from "vue-i18n";

import en from './en.json'
import vi from './vi.json'

const messages = {
  en,
  vi
}

export default createI18n({
  locale: "en",
  fallbackLocale: "vi",
  legacy: false,
  globalInjection: true,
  messages,
});