module.exports = function(application){
	application.get('/', function(req, res){
		application.app.controllers.main.index(application, req, res);
	});
}