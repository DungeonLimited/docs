import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './locales/en'
import fr from './locales/fr.js'

const DEFAULT = 'en'

export default {

  langs: {
    'en': {
      name: 'English',
      locale: en,
      flag: 'gb',
    },
    'fr': {
      name: 'Français',
      locale: fr,
      flag: 'fr',
    },
  },

  /**
   * Set up i18n configuration
   */
  setUp () {
    Vue.use(VueI18n)
    this.change(this.getLang())
    Object.entries(this.langs)
      .forEach(([lang, obj]) => Vue.locale(lang, obj.locale))
  },

  /**
   * Chooses language
   * @param lang
   */
  change (lang) {
    if (!this.langs[lang]) {
      console.warn('[i18n]', 'Not found lang', lang)
      lang = DEFAULT
    }
    Vue.config.lang = lang
    console.log('[i18n]', 'Changing language', lang)
  },

  /**
   * Returns browser language
   * @returns {*}
   */
  getLang () {
    let lang
    if (navigator && navigator.userAgent && (
        lang = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i)
      )) {
      lang = lang[1]
    }

    if (!lang && navigator) {
      if (navigator.language) {
        lang = navigator.language
      } else if (navigator.browserLanguage) {
        lang = navigator.browserLanguage
      } else if (navigator.systemLanguage) {
        lang = navigator.systemLanguage
      } else if (navigator.userLanguage) {
        lang = navigator.userLanguage
      }
      lang = lang.substr(0, 2)
    }
    return lang
  },
}
