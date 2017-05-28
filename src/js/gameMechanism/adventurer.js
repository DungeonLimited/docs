import * as Roles from './roles'

const DEFAULT_ROLES = 2;

export default class Adventurer {

  constructor (name, roles) {
    this.name = name ? name : 'Noname the rng' + Math.floor(Math.random() * 89999 + 10000);
    if (!roles) {
      roles = []
      for (let i = 0; i < DEFAULT_ROLES; i++) {
        let random = Math.floor(Math.random() * 5);
        roles.push(Object.values(Roles)[ random ])
      }
    }
    this.roles = []
    this.stats = {
      tank: 0,
      melee: 0,
      range: 0,
      cunning: 0,
      magic: 0
    }
    console.debug(roles)
    roles.forEach(role => this.addRole(role))
  }

  /**
   * Add a role to the adventurer
   * @param role
   */
  addRole (role) {
    this.roles.push(role)
    console.log('[Adv]', 'addRole', this)
    role.strength.forEach(role => this.stats[ role.id ]++)
    role.weakness.forEach(role => this.stats[ role.id ]--)
  }

  get orderedStats () {
    return Object.entries(this.stats)
      .map(([ id, nb ]) => ({ role: Roles[ id ], nb }))
      .filter(stat => stat.nb)
      .sort((a, b) => b.nb - a.nb)
  }
}