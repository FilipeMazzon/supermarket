#Supermarket
##Installation guide
``ssh
npm install
npm start
``

##create first user

``ssh
//run mongod
mongod
// open new terminal
mongo supermarket;
db.clientes.insert({"user":"admin","password":"admin","credito":999999,"nome":"admin"});
``

open Supermarket[localhost:3000/]