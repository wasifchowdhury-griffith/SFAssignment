module.exports = function(MongoClient, dbURL){
    this.MongoClient = MongoClient;
    this.dbURL = dbURL;

    //creates new channel in database
    this.createChannel = function(newChannel, res){
        this.MongoClient.connect(this.dbURL, function(err,db){
            if (err) throw err;
            console.log(newChannel);

            let dbo = db.db('chatapp');
            dbo.collection('channels').insertOne(newChannel, function(err, result){
                if (err) throw err;

                console.log("added new channel: " + newChannel.name);
                res.send(result);
                db.close()
            });
        })
    }
    return this;
}