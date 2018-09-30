const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const fs = require('fs');
const dataFile = './data.json';
const dataFormat = 'utf8';
const MongoClient = require('mongodb').MongoClient;
const dbURL = 'mongodb://localhost:27017';

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

const login = require('./login.js')();
const groups = require('./group.js')();

//connect to mongo
MongoClient.connect(dbURL, function(err, client){
    if(err){
        throw err;
    }
    console.log('MongoDB connected');

    app.post('/api/login', function(req,res){
        let body = req.body;
        let reader = require('./read.js')(MongoClient, dbURL, body);
        reader.getLogin(res);
    });

    app.get('/api/groups', function(req,res){
        let reader = require('./mongoGroup.js')(MongoClient, dbURL, req);
        reader.getMGroups(res);
    });

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
});


app.delete('/api/group/delete/:groupname', function(req,res){
    let groupName = req.params.groupname;

    fs.readFile(dataFile, dataFormat, function(err,data){
        let readData = JSON.parse(data);
        groups.data = readData.groups;
        readData.groups = groups.deleteGroup(groupName);
        console.log(readData);
        let json = JSON.stringify(readData);

        fs.writeFile(dataFile, json, dataFormat, function(err, d){
            res.send(true);
            console.log("Deleted group was: " + groupName);
        });
    });
});

app.post('/api/group/create', function(req, res){
    let groupName = req.body.newGroupName
    if(groupName == '' || groupName == 'undefined' || groupName == null){
        res.send(false);
    } else {
        fs.readFile(dataFile, dataFormat, function(err, data){
            let readData = JSON.parse(data);
            let g = readData.groups;

            let newGroup = {
                'name': req.body.newGroupName,
                'admins': [],
                'members': []
            }
            g.push(newGroup)
            readData.groups = g;
            let json = JSON.stringify(readData);

            fs.writeFile(dataFile, json, dataFormat, function(err, data){
                res.send(true);
                console.log("Created new group called: " + req.body.newGroupName);
            });
        });
    }
})

require('./routes.js')(app, path);
require('./socket.js')(app, io);
require('./listen.js')(http);