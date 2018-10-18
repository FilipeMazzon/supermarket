module.exports.editar_cliente = function (application, req, res) {
    var connection = application.config.dbConnection;
    var clienteDAO = new application.app.models.ClienteDAO(connection);
    var dataUser = {
        "nome": req.session.nome,
        "user": req.session.user,
        "credito": req.session.saldo
    };
    clienteDAO.getClientes(req, res, "edit", dataUser);
};
module.exports.chargeCliente = function (application, req, res) {
    var clienteToChange = req.body;

    var connection = application.config.dbConnection;
    var dataUser = {
        "nome": req.session.nome,
        "user": req.session.user,
        "credito": req.session.saldo
    };
    var clienteDAO = new application.app.models.ClienteDAO(connection);
    clienteDAO.getCliente(clienteToChange, req, res, "edit", dataUser);
};
module.exports.changeCliente = function (application, req, res) {
    var theChange = req.body;
    var clienteToChange = {
        "user": theChange.user
    };
    console.log(theChange);
    console.log(clienteToChange);
    var connection = application.config.dbConnection;
    var clienteDAO = new application.app.models.ClienteDAO(connection);
    clienteDAO.updateCliente(clienteToChange, req, res, theChange);
    res.redirect("/listar_clientes");
};
