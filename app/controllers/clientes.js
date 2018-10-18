const listar_clientes = function (application, req, res) {
    var connection = application.config.dbConnection;
    var clientesDAO = new application.app.models.ClienteDAO(connection);
    var dataUser = {
        "nome": req.session.nome,
        "user": req.session.user,
        "credito": req.session.saldo
    };
    clientesDAO.getClientes(req, res, "listar", dataUser);
};

const listar_cliente = function (application, req, res) {
    var cliente = req.query;
    var connection = application.config.dbConnection;
    var clientesDAO = new application.app.models.ClienteDAO(connection);
    var dataUser = {
        "nome": req.session.nome,
        "user": req.session.user,
        "credito": req.session.saldo
    };
    clientesDAO.getCliente(cliente, req, res, "listar", dataUser);
};

exports =module.exports ={
    listar_clientes:listar_clientes,
    listar_cliente:listar_cliente
}