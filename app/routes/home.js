const home = require('../controllers/home.js');
module.exports = function (application) {
    application.get('/home', function (req, res) {
        if (req.session.autorizado) {
            home.index(application, req, res);
        }
        else {
            res.redirect('/');
        }
    });
};
