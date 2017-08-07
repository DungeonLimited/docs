import Adventurer from 'js/pages/adventurer/adventurer.vue'
import Dices from 'js/pages/dices/dices.vue'
import Group from 'js/pages/group/group.vue'
import Roles from 'js/pages/roles/roles.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

const router = new VueRouter(
  {
    mode: 'hash',
    routes: [
      {path: '/', name: 'home', redirect: {name: 'group'}},
      {path: '/adventurer', name: 'adventurer', component: Adventurer},
      {path: '/dices', name: 'dices', component: Dices},
      {path: '/group', name: 'group', component: Group},
      {path: '/roles', name: 'roles', component: Roles},
      {path: '*', redirect: {name: 'home'}},
    ],
  },
)

export default {

  /**
   * Set up router plugin
   */
  setUp () {
    Vue.use(VueRouter)
  },

  router,
}
