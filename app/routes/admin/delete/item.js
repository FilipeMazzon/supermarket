module.exports = function (application) {

    application.get('/deletar_item', function (req, res) {
        if (req.session.admin) {
            application.app.controllers.admin.delete.item.deletar_item(application, req, res);
        }
        else if (req.session.autorizado) {
            res.redirect('/home');
        }
        else {
            res.redirect('/');
        }
    });
    application.post('/deletar_item', function (req, res) {
        if (req.session.admin) {
            application.app.controllers.admin.delete.item.item_deletar(application, req, res);
        }
        else if (req.session.autorizado) {
            res.redirect('/home');
        }
        else {
            res.redirect('/');
        }
    });
};
