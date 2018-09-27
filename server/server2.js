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
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, function(err, client){
    if (err) {return console.log(err)}

    const dbName = 'chatapp';
    const db = client.db(dbName);
    var querycb = require('./serial/findlogin.js');

    querycb.findlogin(db, function(res){
        console.log(res);
    });

    app.post('/getData', function(req,res){
        console.log("in getdata server func");
    })
});