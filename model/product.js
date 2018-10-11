const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'supermarket';

let findProduct = function(){
    MongoClient.connect(url, function(err, client) {
        if(err) throw err;
          // Show that duplicate records got dropped
          const col = client.db(dbName).collection('product');
          col.find({}).toArray(function(err, items) {
            if(err) throw err;
            return items;
            client.close();
          });
    });
}

exports = module.exports = {
    find: findProduct
}