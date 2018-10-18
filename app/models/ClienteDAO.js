function ClienteDAO(connection) {
    this._connection = connection();
}

ClienteDAO.prototype.salvarCliente = function (cliente) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("clientes", function (err, collection) {
            collection.insert(cliente);
            mongoclient.close();
        });
    });
};
ClienteDAO.prototype.updateCliente = function (user, req, res, cliente) {
    this._connection.open(function (err, mongocliente) {
        mongocliente.collection("clientes", function (err, collection) {
            collection.update(user, cliente, {upsert: true});
        });
    });
    req.session.saldo = cliente.credito;
};
ClienteDAO.prototype.dropCliente = function (cliente) {
    console.log(cliente);
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("clientes", function (err, collection) {
            collection.remove(cliente, 1);
            mongoclient.close();
        })
    })
};
ClienteDAO.prototype.getClientes = function (req, res, where, userData) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("clientes", function (err, collection) {
            collection.find().toArray(function (mongoError, result) {
                if (where === "listar") {
                    res.render("listar/cliente/clientes", {clientes: result, user: userData});
                }
                else if (where === "delete") {
                    res.render("admin/delete/cliente", {cliente: result, validacao: {}, user: userData});
                }
                else if (where === "edit") {
                    res.render("admin/edit/cliente", {clientes: result, cliente: {}, dados: {}, user: userData});
                }
            });
            mongoclient.close();
        });
    });
};
ClienteDAO.prototype.getCliente = function (cliente, req, res, where, userData) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("clientes", function (err, collection) {
            collection.find(cliente).toArray(function (mongoError, result) {
                if (where === "listar") {
                    res.render("listar/cliente/cliente", {clientes: result, user: userData});
                }
                if (where === "edit") {
                    res.render("admin/edit/cliente", {clientes: {}, cliente: result, dados: {}, user: userData});
                }
            });
            mongoclient.close();
        });
    });
};
ClienteDAO.prototype.autentificar = function (dados, req, res) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("clientes", function (err, collection) {
            collection.find(dados).toArray(function (mongoError, result) {
                if (result.length === 0) {
                    res.render("login/login", {
                        validacao: [{
                            "msg": "login ou senha invalidade",
                            "param": {},
                            "value": {},
                            "location": {},
                            "nestedErrors": {}
                        }], login: {}
                    });
                }
                else {
                    if (result[0].user === "admin") {
                        req.session.admin = true;
                    }
                    req.session.autorizado = true;
                    req.session.user = result[0].user;
                    req.session.nome = result[0].nome;
                    req.session.saldo = result[0].credito;
                }
                if (req.session.autorizado) {
                    res.redirect("/home");
                }
            });
            mongoclient.close();
        });
    });
};

ClienteDAO.prototype.comprar = function (item, req, res, dataUser) {
    this._connection.open(function (err, mongocliente) {
        mongocliente.collection("clientes", function (err, collection) {
            collection.find(dataUser).toArray(function (mongoError, result) {
                var aux = {
                    user: result[0].user,
                    password: result[0].password,
                    nome: result[0].nome,
                    telefone: result[0].telefone,
                    credito: result[0].credito
                };

                aux.credito = aux.credito - item.preco;
                console.log();
                if (aux.credito > 0) {
                    req.session.saldo = aux.credito;
                    collection.update(dataUser, aux, {upsert: true});
                    res.render("compras/efetuada", {item: item, user: aux});
                }
                else {
                    res.render("compras/negada", {user: dataUser});
                }
                mongocliente.close();
            });
        });
    });
};
module.exports = function () {
    return ClienteDAO;
};
