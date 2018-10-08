const app = require('./config/server');
const objectId = require('mongodb').ObjectId;

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

app.get("/items", function (req, res) {
    (async function () {
        const client = new MongoClient(url);

        try {
            await client.connect();
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            // Get the collection
            const col = db.collection('product');

            const cursor = await col.find().toArray();
            // Get first two documents that match the query
            res.send(cursor);
        } catch (err) {
            console.log(err.stack);
        }

        // Close connection
        client.close();
    })();
});

app.get("/items/:_id", function (req, res) {
    let params = req.params;
    params._id = objectId(params._id);
    (async function () {
        const client = new MongoClient(url);

        try {
            await client.connect();
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            // Get the collection
            const col = db.collection('product');
            const cursor = await col.find(params).toArray();

            res.send(cursor);
        } catch (err) {
            console.log(err.stack);
        }

        // Close connection
        client.close();
    })();
});

app.put("/edit", function (req, res) {
    let body = req.body;
    let buffer;
    let data = {
        _id: objectId(body.product)
    };

    (async function () {
        const client = new MongoClient(url);

        try {
            await client.connect();
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            // Get the collection
            const col = db.collection('product');
            const cursor = await col.findOne(data);
            console.log(cursor);
            if (cursor) {
                buffer = cursor.quantity - quantity;
                if (buffer < 0) {
                    buffer = 0;
                }
            }
            console.log(cursor);

            r = await col.updateOne(data, {$set: {quantity: buffer}});
        } catch (err) {
            console.log(err.stack);
        }

        // Close connection
        client.close();
    })();
    res.send();
});

app.post("/newProduct", function (req, res) {
    let product = req.body;
    //criar no banco
    (async function () {
        const client = new MongoClient(url);
        try {
            await client.connect();
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            // Insert a single document
            let r = await db.collection('product').insertOne(product);
            res.send("data was inserted ");
            assert.equal(1, r.insertedCount);
            if (r.result.n === r.result.ok) {
                res.send("everything is fine");
            }
        } catch (err) {
            console.log(err.stack);
        }
        // Close connection
        client.close();
    })();
});

app.delete("/product/:_id", function (req, res) {
    let params = req.params;
    params._id = objectId(params._id);
    (async function () {
        const client = new MongoClient(url);

        try {
            await client.connect();
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            // Get the findAndModify collection
            const col = db.collection('product');
            let r;

            // Remove a document from MongoDB and return it
            r = await col.findOneAndDelete(params);
            if (!(r.value === null)) {
                res.send(`Data WAS DELETED`);
            } else {
                res.send("data not found");
            }

        } catch (err) {
            console.log(err.stack);
        }
        // Close connection
        client.close();
    })();
});

app.listen(3000, function () {
    console.log(`likedin is listening on in ${app.get('env')} mode.`);
});
