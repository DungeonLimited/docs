import * as Roles from 'js/gameMechanism/roles.js'
import Group from 'js/gameMechanism/group'
export default {
  name: 'Group',

  data(){
    return {
      roles: Roles,
      groupSize: 4,
      group: new Group(4)
    }
  },

  methods: {
    newGroup()
    {
      let size = parseInt(this.groupSize);
      if (!size) size = 1;
      this.group = new Group(size);
    }
  }
}