const compra = require('../controllers/compra.js')
module.exports = function (application) {
    application.post('/buyitem', function (req, res) {
        if (req.session.autorizado) {
            application.app.controllers.compra.finalizarCompra(application, req, res);
        }
        else {
            res.redirect('/');
        }
    });
};
