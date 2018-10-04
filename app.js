const app = require('./config/server');
const query  = require('./config/database');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';
const client = new MongoClient(url);

app.get("/items/:id",function(req,res){
	let id = req.params.id;
	
});

app.post("/buy",function(req,res){
	let product = req.body.product;
	let quantity = req.body.quantity;
	//criar no banco
	res.send();
});

app.post("/newProduct",function(req,res){
	let product = req.body;
	//criar no banco

	client.connect(url, function(err) {
		assert.equal(null, err);
		console.log("Connected successfully to server");

		const db = client.db(dbName);

		insertDocuments(db, function() {
			client.close();
			res.send();
		});
	});

});

app.put("/product/:id",function(req,res){
	let id = req.params.id;
	let product = req.body;
	//editar no banco
	res.send();
});

app.delete("/product/:id",function(req,res){
	let id = req.params.id;
	//deleta do banco
	res.send();
});

app.listen(3000,function(){
	console.log(`likedin is listening on in ${app.get('env')} mode.`);
});
