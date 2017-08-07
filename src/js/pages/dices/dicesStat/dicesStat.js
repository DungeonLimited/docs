import Dice from 'js/gameMechanism/dice'
export default {
  name: 'DicesStat',

  computed: {
    stats () {
      return Object.entries(this.dice.sumUp())
        .map(([type, number]) => ({type, number}))
        .sort((a, b) => b.number - a.number)
    },
  },

  data () {
    return {
      icons: {
        win: 'ra ra-muscle-up',
        draw: 'ra ra-cycle',
        loss: 'ra ra-skull',
      },
    }
  },

  props: {
    dice: Dice,
  },

  methods: {
    /**
     * Round with 2 decimals
     * @param n
     * @return {number}
     */
    round (n) {
      return Math.floor(n * 1000) / 10
    },
  },
}
