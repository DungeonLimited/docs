import Origins from 'js/gameMechanism/origins'
import Jobs from 'js/gameMechanism/jobs'
import Adventurer from '../../gameMechanism/adventurer'

export default {
  name: 'Adventurer',

  data () {
    return {
      origins: Origins,
      jobs: Jobs,
    }
  },

  methods: {
    stats (origin, job) {
      console.log('[Page/Adventurer]', 'stats', origin, job)
      return new Adventurer(null, origin.id, job.id)
    },
  },
}
