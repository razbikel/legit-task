const {Router} = require('express');
const TeamCreatedHandler = require('../events-handlers/teamCreatedHandler');
const RepoHandler = require('../events-handlers/repoHandler');
const PushCodeHandler = require('../events-handlers/pushCodeHandler');

const router = new Router();


router.post('/team-created', (req, res, next) => {
    TeamCreatedHandler.handleEvent(req.body);
    res.json({ message: 'ok' });
})


router.post('/code-push', (req, res, next) => {
    PushCodeHandler.handleEvent(req.body)
    res.json({ message: 'ok' });
})


router.post('/repo', (req, res, next) => {
    RepoHandler.handleEvent(req.body)
    res.json({ message: 'ok' });
})


module.exports = router;
