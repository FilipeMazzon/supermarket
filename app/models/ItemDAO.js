function ItemDAO(connection) {
    this._connection = connection();
}

ItemDAO.prototype.salvarItem = function (item) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("itens", function (err, collection) {
            collection.insert(item);
            mongoclient.close();
        });
    });
};
ItemDAO.prototype.updateItem = function (itemNome, req, res, item) {
    this._connection.open(function (err, mongocliente) {
        mongocliente.collection("itens", function (err, collection) {
            console.log(itemNome);
            collection.update(itemNome, item, {upsert: true});
            mongocliente.close();
        });
    });
};
ItemDAO.prototype.dropItem = function (itemList, req, res) {
    this._connection.open(function (err, mongocliente) {
        mongocliente.collection("itens", function (err, collection) {
            collection.remove(itemList, 1);
            mongocliente.close();
            res.redirect('/listar_itens');
        });
    });
};


ItemDAO.prototype.getItens = function (req, res, where, dataUser) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("itens", function (err, collection) {
            collection.find().toArray(function (mongoError, result) {

                if (where === "delete") {
                    res.render("admin/delete/item", {validacao: {}, item: result, user: dataUser});
                }
                else if (where === "listar") {
                    res.render("listar/item/itens", {item: result, user: dataUser});
                }
                else if (where === "edit") {
                    res.render("admin/edit/item", {itens: result, item: {}, user: dataUser});
                }

            });
            mongoclient.close();
        });
    });
};
ItemDAO.prototype.getItem = function (id_item, req, res, where, dataUser) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("itens", function (err, collection) {
            collection.find(id_item).toArray(function (mongoError, result) {
                if (where === "edit") {
                    res.render("admin/edit/item", {itens: {}, item: result, user: dataUser});
                }
                else if (where === "listar") {
                    res.render("listar/item/item", {item: result, user: dataUser});
                }
            });
            mongoclient.close();
        });
    });
};


ItemDAO.prototype.get5UltimosItens = function (req, res, dataUser) {
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("itens", function (err, collection) {
            collection.find().limit(5).toArray(function (mongoError, result) {
                res.render("home/index", {user: dataUser, item: result});
            });
            mongoclient.close();
        });
    });
};
module.exports = function () {
    return ItemDAO;
};
