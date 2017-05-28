import Vue from 'vue'
import VueRouter from 'vue-router'
import Group from 'js/pages/group/group.vue'
const router = new VueRouter(
  {
    mode: 'hash',
    routes: [
      { path: '/', name: 'root', redirect: { name: 'group' } },
      { path: '/group', name: 'group', component: Group },
      { path: '*', redirect: { name: 'root' } },
    ]
  }
)

export default {

  /**
   * Set up router plugin
   */
  setUp(){
    Vue.use(VueRouter)
  },

  router
}