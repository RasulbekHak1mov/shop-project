const moment = require("moment/moment")

module.exports = {
    ifequal(a, b, options) {
        if (a == b) {
            return options.fn(this)
        }


        return options.inverse(this)
    },
    getFullNameFirstChar(firstName, lastName) {
        return firstName.charAt(0) + lastName.charAt(0)
    },
    formatDate(date) {
        return moment(date).format('DD MMM, YYYY')
    }
}