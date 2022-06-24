const {SUSPICIOUS_PREFIX} = require('../configuration')
const moment = require('moment-timezone')

class TeamCreatedHandler {


    static #checkSuspiciousPrefix = (teamName) => {
        let pattern = new RegExp('^' + SUSPICIOUS_PREFIX);
        return pattern.test(teamName);
    }

    static handleEvent = (payload) => {
        if(payload.action === 'created'){
            let name = payload.team.name;
            if(this.#checkSuspiciousPrefix(name)){
                console.log('***SUSPICIOUS TEAM***');
                console.log(`
                    In organization: ${payload.organization.login},
                    a team named ${payload.team.name} with the prefix ${SUSPICIOUS_PREFIX},
                    was created by the user ${payload.sender.login}
                    in time - ${moment().tz("Asia/Jerusalem").format('YYYY-MM-DD HH:mm:ss')}
                `)
            }
        }
    }
}

module.exports = TeamCreatedHandler;
