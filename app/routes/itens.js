module.exports = function (application) {
    application.get('/listar_itens', function (req, res) {
        if (req.session.autorizado) {
            application.app.controllers.itens.listar_itens(application, req, res);
        }
        else {
            res.redirect('/');
        }
    });
    application.get('/item', function (req, res) {
        if (req.session.autorizado) {
            application.app.controllers.itens.item(application, req, res);
        }
        else {
            res.redirect('/');
        }
    });
};

