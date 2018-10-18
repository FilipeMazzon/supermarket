module.exports.cadastro_item = function (application, req, res) {
    var dataUser = {
        "nome": req.session.nome,
        "user": req.session.user,
        "credito": req.session.saldo
    };
    res.render("admin/cadastro/item", {validacao: {}, item: {}, user: dataUser});
};
module.exports.item_salvar = function (application, req, res) {
    var item = req.body;
    req.assert('id', 'id é obrigatório').notEmpty();
    req.assert('id', 'id precisa ser um numero e maior do que 0').isInt({min: 0});
    req.assert('nome', 'nome é obrigatório').notEmpty();
    req.assert('preco', 'preço é obrigatório').notEmpty();
    req.assert('preco', 'preço precisa ser um numero e maior do que 0').isFloat({min: 0});
    req.assert('descricao', 'Descricao é obrigatório').notEmpty();

    var erros = req.validationErrors();
    var dataUser = {
        "nome": req.session.nome,
        "user": req.session.user,
        "credito": req.session.saldo
    };
    if (erros) {
        res.render('admin/cadastro/item', {validacao: erros, item: item, user: dataUser});
        return;
    }
    var connection = application.config.dbConnection;
    var itemDAO = new application.app.models.ItemDAO(connection);

    itemDAO.salvarItem(item);
    res.redirect('/listar_itens');

};
