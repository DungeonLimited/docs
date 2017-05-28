import Vue from 'vue'
import VueMaterial from 'vue-material'

export default {

  /**
   * Set up material plugin and theme
   */
  setUp() {
    Vue.use(VueMaterial)

    // Theme
    Vue.material.registerTheme(
      'darl', {
        accent: 'teal',
        background: 'white',
        primary: {
          color: 'cyan',
          hue: 500
        },
        secondary: 'cyan',
        warn: 'deep-orange'
      }
    )
    Vue.material.setCurrentTheme('darl')
  }
}