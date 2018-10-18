const login = require('../controllers/login.js');
module.exports = function (application) {
    application.get('/', function (req, res) {
        login.login(application, req, res);
    });
    application.post('/autentificar', function (req, res) {
        login.check(application, req, res);
    });
};
