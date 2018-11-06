const insertDocuments = function(db,obj, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
  	obj
  	], function(err, result) {
  		assert.equal(err, null);
  		callback(result);
  	});
}

const findDocuments = function(db,obj, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  collection.find(obj).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

const updateDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });  
}

const removeDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Delete document where a is 3
  collection.deleteOne({ a : 3 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });    
}

exports = module.exports = {
	insertDocuments:insertDocuments,
	findDocuments:findDocuments,
	updateDocument:updateDocument,
	removeDocument:removeDocument
}