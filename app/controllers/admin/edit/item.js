module.exports.editar_item = function (application, req, res) {
    var connection = application.config.dbConnection;
    var itemDAO = new application.app.models.ItemDAO(connection);
    var dataUser = {
        "nome": req.session.nome,
        "user": req.session.user,
        "credito": req.session.saldo
    };
    itemDAO.getItens(req, res, "edit", dataUser);

};
module.exports.chargeItem = function (application, req, res) {
    var itemToChange = req.body;
    var connection = application.config.dbConnection;
    var itemDAO = new application.app.models.ItemDAO(connection);

    var dataUser = {
        "nome": req.session.nome,
        "user": req.session.user,
        "credito": req.session.saldo
    };
    itemDAO.getItem(itemToChange, req, res, "edit", dataUser);
};
module.exports.changeItem = function (application, req, res) {

    var itemToChange = req.body;
    var item = {
        "nome": itemToChange.nome
    };

    var connection = application.config.dbConnection;
    var itemDAO = new application.app.models.ItemDAO(connection);

    itemDAO.updateItem(item, req, res, itemToChange);
    res.redirect('/listar_itens');
};

