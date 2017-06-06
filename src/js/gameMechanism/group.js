import Origins from 'js/gameMechanism/origins'
import Adventurer from './adventurer'
import { WithRole } from './roles'

export default class Group extends WithRole {
  constructor (groupSize) {
    super()
    this.members = {}

    if (groupSize) {
      let iteration = 0
      while (this.size < groupSize && iteration < 1000) {
        iteration++
        this.add(new Adventurer())
      }
    }
  }

  /**
   * Adds an adventurer to the group
   * @param adventurer
   */
  add (adventurer) {
    this.members[adventurer.name] = adventurer
    if (this.validGroup()) {
      this.merge(adventurer)
    } else {
      console.debug('Not valid group')
      delete this.members[adventurer.name]
    }
  }

  /**
   * Gets group size
   * @returns {Number}
   */
  get size () {
    return Object.values(this.members).length
  }

  /**
   * Returns true if group is valid
   * @return {boolean}
   */
  validGroup () {
    for (let rule in rules) {
      if (!rules[rule](this)) {
        return false
      }
    }
    return true
  }

  numberOf (origin) {
    return Object.values(this.members).reduce(
      (total, member) => total + (member.origin.id === origin.id | 0), 0)
  }

  numberOfElves () {
    return Object.values(this.members).reduce(
      (total, member) => total +
      (member.origin.id === Origins.darkElf.id | 0) +
      (member.origin.id === Origins.highElf.id | 0) +
      (member.origin.id === Origins.woodElf.id | 0)
      , 0)
  }
}

const rules = [
  // No orcs with elves
  (group) => !(group.numberOf(Origins.orc) && group.numberOfElves()),
  // No orcs with gnomes
  (group) => !(group.numberOf(Origins.orc) && group.numberOf(Origins.gnome)),
  // No more dwarves than elves (and
  (group) => !group.numberOf(Origins.dwarf) || !group.numberOfElves() ||
  group.numberOf(Origins.dwarf) === group.numberOfElves(),
]
