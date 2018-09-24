const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const fs = require('fs');
const dataFile = './data.json';
const dataFormat = 'utf8';

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

app.post('/api/login', function(req,res){
    fs.readFile(dataFile, dataFormat, function(err, data){
        console.log(data);
        data = JSON.parse(data);
        let username = req.body.username;
        login.data = data;
        let match = login.findUser(username);

        if (match !== false){
            groups.data = data;
            match.groups = groups.getGroups(username, match.permissions);
        } else {
            console.error(err);
        }
        if (match.groups == 'undefined' || match.groups == null){
            console.error(err)
        } else {
            console.log(match.groups[0].channels[0])
            res.send(match);
        }
    });
});

app.post('/api/groups', function(req,res){
    fs.readFile(dataFile, dataFormat, function(err, data){
        data = JSON.parse(data);
        let username = req.body.username;
        login.data = data;
        let match = login.findUser(username);

        if (match !== false){
            groups.data = data;
            match.groups = groups.getGroups(username, match.permissions);
        }
        res.send(match);
    });
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