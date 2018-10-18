module.exports = function (application) {
    application.get('/editar_item', function (req, res) {
        if (req.session.admin) {
            application.app.controllers.admin.edit.item.editar_item(application, req, res);
        }
        else if (req.session.autorizado) {
            res.redirect('/home');
        }
        else {
            res.redirect('/');
        }

    });
    application.post('/editarItemEspecifico', function (req, res) {
        if (req.session.admin) {
            application.app.controllers.admin.edit.item.chargeItem(application, req, res);
        }
        else if (req.session.autorizado) {
            res.redirect('/home');
        }
        else {
            res.redirect('/');
        }
    });
    application.post('/editarFinish', function (req, res) {
        if (req.session.admin) {
            application.app.controllers.admin.edit.item.changeItem(application, req, res);
        }
        else if (req.session.autorizado) {
            res.redirect('/home');
        }
        else {
            res.redirect('/');
        }
    });
};
