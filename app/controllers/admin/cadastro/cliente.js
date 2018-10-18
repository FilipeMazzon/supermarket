module.exports.cadastro_cliente = function (application, req, res) {
    var dataUser = {
        "nome": req.session.nome,
        "user": req.session.user,
        "credito": req.session.saldo
    };
    res.render("admin/cadastro/cliente", {validacao: {}, cliente: {}, user: dataUser});
};
module.exports.cliente_salvar = function (application, req, res) {

    var cliente = req.body;
    req.assert('user', 'user é obrigatório').notEmpty();
    req.assert('password', 'Password é obrigatório').notEmpty();
    req.assert('password', 'password precisa ter entre 6 a 20 caracteres').isLength({min: 6, max: 20});
    req.assert('nome', 'nome é obrigatório').notEmpty();
    req.assert('nome', 'nome não pode conter Numeros e caracteres especiais').isAlpha();
    req.assert('telefone', 'telefone é obrigatório').notEmpty();
    req.assert('telefone', 'telefone precisa ser inteiro e positivo').isInt({min: 0});
    req.assert('credito', 'credito é obrigatório').notEmpty();
    req.assert('credito', 'credito precisa ser Numerico e positivo').isFloat({min: 0});
    var erros = req.validationErrors();
    var dataUser = {
        "nome": req.session.nome,
        "user": req.session.user,
        "credito": req.session.saldo
    };
    if (erros) {
        res.render('admin/cadastro/cliente', {validacao: erros, cliente: cliente, user: dataUser});
        return;
    }
    var connection = application.config.dbConnection;
    var clienteDAO = new application.app.models.ClienteDAO(connection);
    clienteDAO.salvarCliente(cliente, dataUser);
    res.redirect("/listar_clientes");
};
