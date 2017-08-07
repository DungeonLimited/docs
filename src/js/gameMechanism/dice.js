export class DiceFace {
  constructor (value, weight) {
    this.value = value
    this.weight = weight || 1
  }
}

export default class Dice {
  /**
   * @param {Array|int} faces
   */
  constructor (faces) {
    if (Number.isInteger(faces)) {
      this._faces = []
      let seed = faces < 0 ? -1 : 1
      for (let i = seed; i * i <= faces * faces; i += seed) {
        this._faces.push(new DiceFace(i, 1))
      }
    } else {
      this._faces = faces || {}
    }
  }

  /**
   * Total of possibilities
   * @returns {Number}
   */
  get total () {
    if (!this._total) {
      this._total = this._faces.reduce((tot, face) => tot + face.weight, 0)
    }
    return this._total
  }

  /**
   * @return {Array}
   */
  get faces () { return this._faces }

  /**
   * @param {Array} faces
   */
  set faces (faces) {
    delete this._total
    this._faces = faces
    this._faces = this._faces.map(face => {
      face.probability = face.weight / this.total
      return face
    })
  }

  /**
   * Sums up stats
   * @return {object}
   */
  sumUp () {
    let sum = this.faces.reduce((sum, face) => {
      if (face.value === 0) sum.draw += face.weight
      if (face.value < 0) sum.win += face.weight
      if (face.value > 0) sum.loss += face.weight
      return sum
    }, {win: 0, draw: 0, loss: 0})

    sum.win /= this.total
    sum.loss /= this.total
    sum.draw /= this.total
    return sum
  }

  /**
   * Merges dice into this
   * @param {Dice} dice1
   * @param {Dice} dice2
   */
  static merge (dice1, dice2) {
    let faces = {}
    dice1.faces.forEach(face => {
      dice2.faces.forEach(otherDiceFace => {
        let value = face.value + otherDiceFace.value
        let weight = face.weight * otherDiceFace.weight
        if (Number.isNaN(value)) {
          console.warn('NaN', dice1.faces, dice2.faces)
        }
        if (faces[value]) {
          faces[value].weight += weight
        } else {
          faces[value] = new DiceFace(value, weight)
        }
      })
    })
    return new Dice(Object.values(faces))
  }
}
