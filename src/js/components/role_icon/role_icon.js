import Roles from 'js/gameMechanism/roles.js'

export default {
  name: 'RoleIcon',

  computed: {
    role () {
      return Roles[this.roleId]
    },
  },

  props: {
    roleId: String,
  },
}
