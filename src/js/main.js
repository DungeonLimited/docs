import 'babel-polyfill'
import App from 'js/app/app.vue'
import Currency from 'js/components/currency/currency.vue'
import Locales from 'js/plugin/i18n'
import Moment from 'js/plugin/moment'
import Router from 'js/plugin/router'
import Service from 'js/plugin/service'
import Theme from 'js/plugin/theme'
import Vue from 'vue'

// Plugin
Locales.setUp()
Moment.setUp()
Router.setUp()
Service.setUp()
Theme.setUp()

// Global Components
Vue.component('darl-currency', Currency)

new Vue(
  {
    el: '#app',
    router: Router.router,
    render: h => h(App)
  }
)