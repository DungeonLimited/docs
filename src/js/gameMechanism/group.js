import Adventurer from './adventurer'
import * as Roles from './roles'

export default class Group {
  constructor (size) {
    this.members = {}
    this.stats = {
      tank: 0,
      melee: 0,
      range: 0,
      cunning: 0,
      magic: 0
    }
    if (size) {
      for (let i = 0; i < size; i++) {
        this.add(new Adventurer())
      }
    }
  }

  /**
   * Adds an adventurer to the group
   * @param adventurer
   */
  add (adventurer) {
    this.members[ adventurer.name ] = adventurer
    Object.entries(adventurer.stats).forEach(([ id, nb ]) => this.stats[ id ] += nb)
  }

  /**
   * Gets group size
   * @returns {Number}
   */
  get size () {
    return Object.values(this.members).length
  }

  get orderedStats () {
    return Object.entries(this.stats)
      .map(([ id, nb ]) => ({ role: Roles[ id ], nb }))
      .filter(stat => stat.nb)
      .sort((a, b) => b.nb - a.nb)
  }
}
