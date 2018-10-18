const cadastroCliente = require('../../../controllers/admin/cadastro/cliente.js');
module.exports = function (application) {
    application.get('/cadastro_cliente', function (req, res) {
        if (req.session.admin) {
            cadastroCliente.cadastro_cliente(application, req, res);
        }
        else if (req.session.autorizado) {
            res.redirect('/home');
        }
        else {
            res.redirect('/');
        }
    });
    application.post('/salvar_cliente', function (req, res) {
        if (req.session.admin) {
            cadastroCliente.cliente_salvar(application, req, res);
        }
        else if (req.session.autorizado) {
            res.redirect('/home');
        }
        else {
            res.redirect('/');
        }
    });
};
