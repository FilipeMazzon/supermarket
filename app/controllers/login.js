let login = function (application, req, res) {
    res.render("login/login", {validacao: {}, login: {}});
};
let check = function (application, req, res) {
    var dados = req.body;

    req.assert('user', 'usuario não pode ser vazio').notEmpty();
    req.assert('password', 'senha não pode estar vazia').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        res.render("login/login", {validacao: erros, login: dados});
        return;
    }
    var connection = application.config.dbConnection;
    var clienteDAO = new application.app.models.ClienteDAO(connection);

    clienteDAO.autentificar(dados, req, res);

};

exports = module.exports = {
    login:login,
    check:check
}
