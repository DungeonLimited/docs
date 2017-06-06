import Roles from 'js/gameMechanism/roles.js'
import Group from 'js/gameMechanism/group'
import Origins from 'js/gameMechanism/origins'

export default {
  name: 'Group',

  data () {
    return {
      origins: Origins,
      roles: Roles,
      groupSize: 4,
      group: new Group(4),
    }
  },

  methods: {
    newGroup () {
      let gSize = parseInt(this.groupSize)
      if (!gSize) gSize = 1
      this.group = new Group(gSize)
    },
  },
}
