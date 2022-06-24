const {SUSPICIOUS_TIME_RANGE} = require('../configuration')
const moment = require('moment-timezone')


class PushCodeHandler {

    static #checkSuspiciousPushTime = (time) => {
        var start = moment(SUSPICIOUS_TIME_RANGE.start, "HH:mm a");
        var end = moment(SUSPICIOUS_TIME_RANGE.end, "HH:mm a");
        return time.isBetween(start , end)   
    }

    static handleEvent = (payload) => {
        let time = moment.unix(payload.repository.pushed_at).tz("Asia/Jerusalem")
        if(this.#checkSuspiciousPushTime(time)){
            console.log('***SUSPICIOUS CODE PUSH***')
            console.log(`
                In organization ${payload.repository.owner.login},
                the user ${payload.pusher.name}
                push code to repository ${payload.repository.full_name}
                in time ${time.format('YYYY-MM-DD HH:mm:ss')} which is between forbidden time range.
            `)
        }

    }
}

module.exports = PushCodeHandler;
