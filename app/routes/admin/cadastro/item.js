module.exports = function (application) {
    application.get('/cadastro_item', function (req, res) {
        if (req.session.admin) {
            application.app.controllers.admin.cadastro.item.cadastro_item(application, req, res);
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
            application.app.controllers.admin.cadastro.item.item_salvar(application, req, res);
        }
        else if (req.session.autorizado) {
            res.redirect('/home');
        }
        else {
            res.redirect('/');
        }

    });
};
