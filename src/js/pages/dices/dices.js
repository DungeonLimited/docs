import Dice, { DiceFace } from 'js/gameMechanism/dice'
import DicesStat from 'js/pages/dices/dicesStat/dicesStat.vue'

export default {
  name: 'Dices',

  components: {DicesStat},

  data () {
    return {
      dices: [],
      neutralDice: new Dice(
        [new DiceFace(-1, 1), new DiceFace(0, 4), new DiceFace(1, 1)],
      ),
      groupDice: new Dice(
        [new DiceFace(1, 1), new DiceFace(0, 5)],
      ),
      dungeonDice: new Dice(
        [new DiceFace(-1, 1), new DiceFace(0, 5)],
      ),
      merge: Dice.merge,
      greenDices: {
        d4: new Dice(4),
        d6: new Dice(6),
        d8: new Dice(8),
        d12: new Dice(12),
        d20: new Dice(20),
      },
      redDices: {
        rd4: new Dice(-4),
        rd6: new Dice(-6),
        rd8: new Dice(-8),
        rd12: new Dice(-12),
        rd20: new Dice(-20),
      },
    }
  },

  methods: {
    /**
     * Combines dices
     * @param {Number} group
     * @param {Number} dungeon
     * @param {Number} neutral
     * @return {Dice}1
     */
    combine (group, dungeon, neutral) {
      let dice = this.neutralDice
      for (let i = 1; i < neutral; i++) {
        dice = Dice.merge(dice, this.neutralDice)
      }
      for (let i = 0; i < group; i++) {
        dice = Dice.merge(dice, this.groupDice)
      }
      for (let i = 0; i < dungeon; i++) {
        dice = Dice.merge(dice, this.dungeonDice)
      }
      return dice
    },
  },
}
