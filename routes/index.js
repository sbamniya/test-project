const routes = require('express').Router();
const login = require('./login');
const overview = require('./overview');
const users = require('./users');

routes.get('/check-login', login.checkLoginStatus);
routes.get('/login', login.login);
routes.get('/logout', login.logout);
routes.post('/send-forget-link', login.sendForgetLink);
routes.post('/verify-link', login.verfiyLink);
routes.post('/save-password', login.savePassword)

routes.get('/get-overview', overview.getOverview);
routes.put('/set-overview-task', overview.setOverviewTasks);
routes.get('/get-task', overview.getTasks)

routes.get('/get-users', users.geActiveUsers);

module.exports = routes;