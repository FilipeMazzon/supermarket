module.exports = function (application) {
    application.get('/home', function (req, res) {
        if (req.session.autorizado) {
            application.app.controllers.home.index(application, req, res);
        }
        else {
            res.redirect('/');
        }
    });
};
