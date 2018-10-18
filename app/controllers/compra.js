const finalizarCompra = function (application, req, res) {
    var dataUser = {
        "nome": req.session.nome,
        "user": req.session.user,
        "credito": req.session.saldo
    };
    var precoItem = req.body;

    var connection = application.config.dbConnection;
    var clienteDAO = new application.app.models.ClienteDAO(connection);
    clienteDAO.comprar(precoItem, req, res, dataUser);
};

exports = module.exports = {
    finalizarCompra:finalizarCompra
}
