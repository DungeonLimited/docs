import Jobs, { randJob } from './jobs'
import Origins, { randOrigin } from './origins'
import { WithRole } from './roles'

export default class Adventurer extends WithRole {
  constructor (name, originId, jobId) {
    super()
    this.origin = Origins[originId || randOrigin()]
    this.job = Jobs[jobId || randJob(this.origin)]

    this.name = name || this.origin.dict(Math.random() >= 0.5)
    console.log('[Adventurer]', this.name)
  }

  get origin () { return this._origin }

  set origin (value) {
    this._origin = value
    this.reset()
    this.merge(this.origin)
    this.merge(this._job)
  }

  get job () {
    return this._job
  }

  set job (value) {
    this._job = value
    this.reset()
    this.merge(this.origin)
    this.merge(this._job)
  }
}
