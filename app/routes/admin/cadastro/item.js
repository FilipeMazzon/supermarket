const cadastroItem = require('../../../controllers/admin/cadastro/item.js');
module.exports = function (application) {
    application.get('/cadastro_item', function (req, res) {
        if (req.session.admin) {
            cadastroItem.cadastro_item(application, req, res);
        }
        else if (req.session.autorizado) {
            res.redirect('/home');
        }
        else {
            res.redirect('/');
        }
    });
    application.post('/salvar_item', function (req, res) {
        if (req.session.admin) {
            cadastroItem.item_salvar(application, req, res);
        }
        else if (req.session.autorizado) {
            res.redirect('/home');
        }
        else {
            res.redirect('/');
        }

    });
};
