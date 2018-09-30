module.exports = function(MongoClient, dbURL){
    this.MongoClient = MongoClient;
    this.dbURL = dbURL;

    this.createGroup = function(newGroup, res){
        this.MongoClient.connect(this.dbURL, function(err,db){
            if (err) throw err;
            console.log("made it this far");

            let dbo = db.db('chatapp');
            dbo.collection('groups').insertOne(newGroup, function(err, result){
                if (err) throw err;
                console.log("added new group: " + newGroup.name);
                res.send(result);
                db.close()
            });
        })
    }
    return this;
}