const logout = require('../controllers/logout.js');
module.exports = function (application) {
    application.get('/logout', function (req, res) {
        logout.out(application, req, res);
    });
};
