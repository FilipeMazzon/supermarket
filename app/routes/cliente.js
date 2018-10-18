module.exports = function (application) {

    application.get('/listar_clientes', function (req, res) {
        if (req.session.admin) {
            application.app.controllers.clientes.listar_clientes(application, req, res);
        }
        else if (req.session.autorizado) {
            res.redirect('/home');
        }
        else {
            res.redirect('/');
        }
    });
    application.get('/cliente', function (req, res) {
        if (req.session.admin) {
            application.app.controllers.clientes.listar_cliente(application, req, res);
        }
        else if (req.session.autorizado) {
            res.redirect('/home');
        }
        else {
            res.redirect('/');
        }
    });

};
