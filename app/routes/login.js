module.exports = function (application) {
    application.get('/', function (req, res) {
        application.app.controllers.login.login(application, req, res);
    });
    application.post('/autentificar', function (req, res) {
        application.app.controllers.login.check(application, req, res);
    });
};
