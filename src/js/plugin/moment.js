import Moment from 'moment'
import i18n from './i18n'

export default {

  /**
   * Set Up for Moment library
   */
  setUp () {
    Moment.locale(i18n.getLang())

    Moment.relativeTimeThreshold('M', 12)
    Moment.relativeTimeThreshold('d', 30)
    Moment.relativeTimeThreshold('h', 23)
    Moment.relativeTimeThreshold('m', 59)
    Moment.relativeTimeThreshold('s', 59)
    Moment.relativeTimeThreshold('ss', 5)
  },
}
