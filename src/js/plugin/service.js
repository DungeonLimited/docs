import * as OfflinePluginRuntime from 'offline-plugin/runtime'

// Load assets for webpack
/* global require */
require('manifest.json')

export default {
  state: {
    refreshing: false,
    online: navigator.onLine,
  },

  /**
   * If production environment, add service worker
   */
  registerServiceWorker () {
    /* global process */
    if (process.env.SW) {
      console.log('[SW] Register service worker')
      OfflinePluginRuntime.install({
        onUpdateReady () {
          console.log('SW Event:', 'onUpdateReady')
          // Tells to new SW to take control immediately
          OfflinePluginRuntime.applyUpdate()
        },

        onUpdated () {
          return window.location.reload()
        },

        onUpdateFailed () {
          console.warn('[SW] Fail update app')
        },
      })
    } else {
      console.warn('[SW] Do not register service worker')
    }
  },

  /**
   * Sets up service wworker
   */
  async setUp () {
    this.registerServiceWorker()
  },
}
