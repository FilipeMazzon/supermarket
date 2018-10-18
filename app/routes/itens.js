const itens = require('../controllers/itens.js')
module.exports = function (application) {
    application.get('/listar_itens', function (req, res) {
        if (req.session.autorizado) {
            itens.listar_itens(application, req, res);
        }
        else {
            res.redirect('/');
        }
    });
    application.get('/item', function (req, res) {
        if (req.session.autorizado) {
            itens.look_one(application, req, res);
        }
        else {
            res.redirect('/');
        }
    });
};

