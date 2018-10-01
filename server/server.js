const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const dbURL = 'mongodb://localhost:27017';
require('./routes.js')(app, path);
require('./socket.js')(app, io);
require('./listen.js')(http);

//CORS
const cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 //
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//routes
app.use(express.static(path.join(__dirname, '../chatapp/dist/chatapp/')));
app.get('/', function (req,res) {
    res.sendFile(path.join(__dirname, '../chatapp/dist/chatapp/index.html'))
});
app.get('/home', function(req,res) {
    res.sendFile(path.join(__dirname, '../chatapp/dist/chatapp/index.html'))
});

//connect to mongo
MongoClient.connect(dbURL, function(err, client){
    if(err){
        throw err;
    }
    console.log('MongoDB connected');

    //rest API for post login
    app.post('/api/login', function(req,res){
        let body = req.body;
        let reader = require('./read.js')(MongoClient, dbURL, body);
        reader.getLogin(res);
    });

    //rest api for get groups
    app.get('/api/groups', function(req,res){
        let reader = require('./mongoGroup.js')(MongoClient, dbURL, req);
        reader.getMGroups(res);
    });

    //rest api for post groups
    app.post('/api/groups/create', function(req,res){
        let groupName = req.body.newGroupName;
        console.log(groupName);
        let writer = require('./newMGroup.js')(MongoClient, dbURL);
        let newGroup = {
            "name": req.body.name,
            "admins": req.body.admins
        }
        writer.createGroup(newGroup, res);
    })

    //rest api for get channels
    app.get('/api/channels', function(req,res){
        let reader = require('./channelReader.js')(MongoClient, dbURL);
        reader.getChannels(res);
    })
});