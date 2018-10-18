module.exports.deletar_cliente = function (application, req, res) {

    var connection = application.config.dbConnection;
    var clientesDAO = new application.app.models.ClienteDAO(connection);
    var dataUser = {
        "nome": req.session.nome,
        "user": req.session.user,
        "credito": req.session.saldo
    };
    clientesDAO.getClientes(req, res, "delete", dataUser);
};
module.exports.cliente_deletar = function (application, req, res) {
    var cliente = req.body;
    console.log(cliente);
    req.assert('user', 'Por favor selecionar algum item').notEmpty();
    var erros = req.validationErrors();

    var connection = application.config.dbConnection;
    var clienteDAO = new application.app.models.ClienteDAO(connection);
    var dataUser = {
        "nome": req.session.nome,
        "user": req.session.user,
        "credito": req.session.saldo
    };
    if (erros) {
        clienteDAO.getClientes(req, res, "delete", dataUser);
        return;
    }

    clienteDAO.dropCliente(cliente);
    res.redirect('/listar_clientes');

};
