let index = function (application, req, res) {
    var connection = application.config.dbConnection;
    var itemDAO = new application.app.models.ItemDAO(connection, req);
    var dataUser = {
        "nome": req.session.nome,
        "user": req.session.user,
        "credito": req.session.saldo
    };
    itemDAO.get5UltimosItens(req, res, dataUser);
};

exports = module.exports = {
    index:index
}