/* eslint-disable import/no-webpack-loader-syntax */
/* global require */
import Roles, { WithRole } from './roles'

export const DICTIONARIES = {
  human: require(
    'exports-loader?generator$real$quebecois!fantasy-names/generators/real/quebecois.min'),
  halfElf: require(
    'exports-loader?generator$fantasy$half_elfs!fantasy-names/generators/fantasy/half_elfs.min'),
  dwarf: require(
    'exports-loader?generator$fantasy$dwarfs!fantasy-names/generators/fantasy/dwarfs.min'),
  orc: require(
    'exports-loader?generator$warhammer_40k$orks!fantasy-names/generators/warhammer_40k/orks.min'),
  barbarian: require(
    'exports-loader?generator$real$vikings!fantasy-names/generators/real/vikings.min'),
  ogre: require(
    'exports-loader?generator$real$catalans!fantasy-names/generators/real/catalans.min'),
  woodElf: require(
    'exports-loader?generator$real$greeks!fantasy-names/generators/real/greeks.min'),
  goblin: require(
    'exports-loader?generator$warhammer$goblins!fantasy-names/generators/warhammer/goblins.min'),
  gnome: require(
    'exports-loader?generator$real$aztecs!fantasy-names/generators/real/aztecs.min'),
  highElf: require(
    'exports-loader?generator$warhammer_40k$eldars!fantasy-names/generators/warhammer_40k/eldars.min'),
  darkElf: require(
    'exports-loader?generator$warhammer_40k$dark_eldars!fantasy-names/generators/warhammer_40k/dark_eldars.min'),
}

class Origin extends WithRole {
  /**
   * @param init Object
   */
  constructor (init) {
    super()
    this._id = init.id
    this._name = init.name
    this.add(init.role)
    this._weight = init.weight ? init.weight : 1
    this.groupRules = []
  }

  get id () { return this._id }

  get name () { return this._name }

  dict (gender) { return DICTIONARIES[this.id](gender) }

  /**
   * @param role
   * @return Boolean
   */
  is (role) {
    return this.role.id === role || this.role.id === role.id
  }
}

/**
 * Lists of origins
 * @type {{human: Origin, halfElf: Origin, dwarf: Origin, orc: Origin, barbarian: Origin, ogre: Origin, woodElf: Origin, goblin: Origin, gnome: Origin, highElf: Origin, darkElf: Origin}}
 */
const Origins = {
  barbarian: new Origin({
    id: 'barbarian',
    name: 'Barbarian',
    role: Roles.melee,
    weight: 2,
  }),
  darkElf: new Origin({
    id: 'darkElf',
    name: 'Dark-Elf',
    role: Roles.magic,
  }),
  dwarf: new Origin({
    id: 'dwarf',
    name: 'Dwarf',
    role: Roles.tank,
    weight: 2,
  }),
  halfElf: new Origin(
    {
      id: 'halfElf',
      name: 'Half-Elf',
      weight: 2,
    }),
  highElf: new Origin({
    id: 'highElf',
    name: 'High-Elf',
    role: Roles.magic,
  }),
  human: new Origin({
    id: 'human',
    name: 'Human',
    weight: 4,
  }),
  gnome: new Origin({
    id: 'gnome',
    name: 'Gnome',
    role: Roles.cunning,
  }),
  goblin: new Origin({
    id: 'goblin',
    name: 'Goblin',
    role: Roles.cunning,
  }),
  ogre: new Origin({
    id: 'ogre',
    name: 'Ogre',
    role: Roles.melee,
  }),
  orc: new Origin({
    id: 'orc',
    name: 'Orc',
    role: Roles.tank,
  }),
  woodElf: new Origin({
    id: 'woodElf',
    name: 'Wood Elf',
    role: Roles.range,
  }),
}
export default Origins

const weightedOrigins = Object.values(Origins).reduce((array, origin) => {
  for (let i = 0; i < origin._weight; i++) array.push(origin.id)
  return array
}, [])

console.debug('[Origins]', 'WeightedOrigins', weightedOrigins)

/**
 * Get a random Origin id from the stack
 * @return {String}
 */
export function randOrigin () {
  return weightedOrigins[Math.floor(Math.random() * weightedOrigins.length)]
}
