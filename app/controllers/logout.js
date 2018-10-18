const out = function (application, req, res) {
    req.session.destroy(function (error) {
        res.redirect('/');
    });
};

exports = module.exports ={
    out:out
}
