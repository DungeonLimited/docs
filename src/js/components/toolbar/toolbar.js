/* global DATE, PKG */
import Assets from 'js/assets'
import moment from 'moment'
import i18n from 'js/plugin/i18n'
import Vue from 'vue'

export default {
  name: 'DarlToolbar',

  computed: {
    current () {
      return i18n.langs[Vue.config.lang].flag
    },
    update () {
      return moment(DATE).format('D MMMM kk:mm')
    },
  },

  data () {
    return {
      langs: i18n.langs,
      logo: Assets.logo.svg,
      title: PKG.title,
    }
  },

  methods: {
    /**
     * Changes app language
     */
    change: i18n.change,
  },
}
