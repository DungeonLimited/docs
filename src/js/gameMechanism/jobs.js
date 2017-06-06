import Roles, { WithRole } from './roles'

class Job extends WithRole {
  constructor (id, name, role, compatibility, groupRules) {
    super()
    this._id = id
    this._name = name
    this.add(role)
    this._compatibility = Object.assign(
      {
        human: true,
        halfElf: true,
      },
      compatibility)
    this.groupRules = groupRules || []
  }

  get id () { return this._id }

  get name () { return this._name }

  get compatibility () { return this._compatibility }
}

/**
 * List of jobs
 * @type {{warrior: Job, thief: Job, mage: Job, ranger: Job, engineer: Job, paladin: Job}}
 */
const Jobs = {
  warrior: new Job('warrior', 'Warrior', Roles.melee,
    {
      dwarf: true,
      orc: true,
      barbarian: true,
      ogre: true,
      woodElf: true,
      goblin: true,
      darkElf: true,
      highElf: true,
    }),

  pirate: new Job('pirate', 'Pirate', Roles.melee,
    {
      orc: true,
      barbarian: true,
      goblin: true,
      darkElf: true,
    }),

  thief: new Job('thief', 'Thief', Roles.cunning,
    {
      dwarf: true,
      woodElf: true,
      goblin: true,
      gnome: true,
      darkElf: true,
    }),

  mage: new Job('mage', 'Mage', Roles.magic,
    {
      woodElf: true,
      darkElf: true,
      highElf: true,
    },
  ),

  ranger: new Job('ranger', 'Ranger', Roles.range,
    {
      barbarian: true,
      woodElf: true,
      halfElf: true,
      gnome: true,
      darkElf: true,
    },
  ),

  engineer: new Job('engineer', 'Engineer', Roles.range,
    {
      gnome: true,
      goblin: true,
    },
  ),

  paladin: new Job('paladin', 'Paladin', [Roles.tank, Roles.magic],
    {
      dwarf: true,
      highElf: true,
      darkElf: true,
    },
  ),

  bard: new Job('bard', 'Bard', [Roles.range],
    {
      highElf: true,
      gnome: true,
      ogre: true,
      woodElf: true,
    }),

  nobleman: new Job('nobleman', 'Nobleman', null,
    {
      barbarian: true,
      darkElf: true,
      dwarf: true,
      highElf: true,
      gnome: true,
      goblin: true,
      woodElf: true,
    }),

  merchant: new Job('merchant', 'Merchant', null,
    {
      barbarian: true,
      darkElf: true,
      dwarf: true,
      highElf: true,
      gnome: true,
      woodElf: true,
    }),
}

export default Jobs

const jobsPerOrigins = Object.values(Jobs).reduce((obj, job) => {
  for (let compat in job.compatibility) {
    if (obj[compat]) {
      obj[compat].push(job.id)
    } else {
      obj[compat] = [job.id]
    }
  }
  return obj
}, {})

console.debug('[Jobs]', 'PerOrigins', jobsPerOrigins)

/**
 * Returns a random compatible job
 * @param origin
 * @return Job
 */
export function randJob (origin) {
  let jobs = jobsPerOrigins[origin.id]
  console.debug('[Jobs]', '[randJob]', origin, 'compatible', jobs)
  return jobs[Math.floor(Math.random() * jobs.length)]
}
