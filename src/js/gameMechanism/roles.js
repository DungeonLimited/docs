class Role {
  constructor (id, name, icon) {
    this._id = id
    this._name = name
    this._icon = icon
  }

  get id () { return this._id }

  get name () { return this._name }

  get icon () { return this._icon }
}

const Roles = {
  tank: new Role('tank', 'Tank', 'ra ra-helmet'),
  melee: new Role('melee', 'Melee', 'ra ra-battered-axe'),
  range: new Role('range', 'Range', 'ra ra-archer'),
  cunning: new Role('cunning', 'Cunning', 'ra ra-dripping-knife'),
  magic: new Role('magic', 'Magic', 'ra ra-barrier'),
}
export default Roles

export class WithRole {
  constructor () {
    this.reset()
  }

  reset () {
    this.stats = {
      tank: 0,
      melee: 0,
      range: 0,
      cunning: 0,
      magic: 0,
    }
  }

  /**
   * Adds one or more roles
   * @param roles Role|Role[]
   */
  add (roles) {
    if (roles) {
      if (!Array.isArray(roles)) {
        roles = [roles]
      }
      roles.forEach(role => this.stats[role.id]++)
    }
  }

  /**
   * Merges with another same class
   * @param withRole WithRole
   */
  merge (withRole) {
    if (withRole) {
      for (let stat in withRole.stats) {
        this.stats[stat] += withRole.stats[stat]
      }
    }
  }

  get orderedStats () {
    return Object.entries(this.stats)
      .map(([id, nb]) => ({role: Roles[id], nb}))
      .filter(stat => stat.nb)
      .sort((a, b) => b.nb - a.nb)
  }
}
