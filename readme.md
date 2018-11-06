# Supermarket
## Installation guide
<br />
``
npm install<br />
npm start<br />
``

## create first user
<br />
``
//run mongod<br />
mongod<br />
// open new terminal<br />
mongo supermarket;<br />
db.clientes.insert({"user":"admin","password":"admin","credito":999999,"nome":"admin"});<br />
``
<br />
open Supermarket[localhost:3000/]