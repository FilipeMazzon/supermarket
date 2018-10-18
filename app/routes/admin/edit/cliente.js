module.exports = function (application) {
    application.get('/editar_cliente', function (req, res) {
        if (req.session.admin) {
            application.app.controllers.admin.edit.cliente.editar_cliente(application, req, res);
        }
        else if (req.session.autorizado) {
            res.redirect('/home');
        }
        else {
            res.redirect('/');
        }
    });
    application.post('/editarClienteEspecifico', function (req, res) {
        if (req.session.admin) {
            application.app.controllers.admin.edit.cliente.chargeCliente(application, req, res);
        }
        else if (req.session.autorizado) {
            res.redirect('/home');
        }
        else {
            res.redirect('/');
        }
    });
    application.post('/editarClienteFinish', function (req, res) {
        if (req.session.admin) {
            application.app.controllers.admin.edit.cliente.changeCliente(application, req, res);
        }
        else if (req.session.autorizado) {
            res.redirect('/home');
        }
        else {
            res.redirect('/');
        }
    });
};
