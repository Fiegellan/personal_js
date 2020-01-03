
const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
var http = require('http');
var fs = require('fs');

const CONNECTION_URL = "mongodb+srv://login_user:swoops777@clusterpassword-hh9nc.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "example";

var app = Express();

app.use(Express.static('public'));

var server = app.listen(8000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Express app listening at http://%s:%s', host, port)

    MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true  }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("people");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });

});

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

// app.listen(3000, () => {
//     MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true  }, (error, client) => {
//         if(error) {
//             throw error;
//         }
//         database = client.db(DATABASE_NAME);
//         collection = database.collection("people");
//         console.log("Connected to `" + DATABASE_NAME + "`!");
//     });
// });

app.post("/person", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.get("/people", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.post('/sign_up' ,function(request,response){
	var name = request.body.name;
	var email= request.body.email;
	var phone = request.body.phone;
	var password = request.body.password;		

	
	var data = {
		"name":name,
		"email":email,
		"password": password, 
		"phone" : phone
	}
	
    console.log("DATA is " + JSON.stringify(data) );

    collection.insertOne(data, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        return response.redirect('success.html');
    });

	// return response.redirect('success.html');  

});