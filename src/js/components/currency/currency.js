export default {
  name: 'DarlCurrency',

  computed: {
    round () {
      return Math.round(Number(this.value) * Math.pow(10, this.decimal)) /
        Math.pow(10, this.decimal)
    },
  },

  props: {
    symbol: {
      type: String,
      default: '🜚',
    },
    suffix: {
      type: String,
      default: 'tax.ex',
    },
    decimal: {
      type: Number,
      default: 2,
    },
    value: [String, Number],
  },
}
