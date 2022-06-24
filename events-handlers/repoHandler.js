const moment = require('moment-timezone')
const {SUSPICIOUS_REPO_TIME} = require('../configuration')

class RepoHandler {

    static #checkSuspiciousRepoTime = (createdTime) => {
        let deletedTime = moment().tz("Asia/Jerusalem");
        let duration = moment.duration(deletedTime.diff(createdTime));
        let minutes = duration.asMinutes();
        return minutes < SUSPICIOUS_REPO_TIME;
    }

    static handleEvent = (payload) => {
        if(payload.action === "deleted"){
            let createdTime = moment(payload.repository.created_at).tz("Asia/Jerusalem");
            if(this.#checkSuspiciousRepoTime(createdTime)){
                console.log('***SUSPICIOUS REPO DELETION***')
                console.log(`
                    In organization: ${payload.repository.owner.login},
                    a repository named: ${payload.repository.full_name},
                    was created at: ${createdTime.format('YYYY-MM-DD HH:mm:ss')}
                    and deleted at: ${moment().tz("Asia/Jerusalem").format('YYYY-MM-DD HH:mm:ss')}
                    after less the 10 minutes, 
                    by ${payload.sender.login}
                `)
            }
        }
    }
}

module.exports = RepoHandler;
