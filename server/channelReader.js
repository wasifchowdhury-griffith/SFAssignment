module.exports = function(MongoClient, dbURL, req){
    this.MongoClient = MongoClient;
    this.dbURL = dbURL;
    this.req = req;

    //retrieves channels
    this.getChannels = function(res){
        this.MongoClient.connect(this.dbURL, function(err,db){
            if (err) throw err;

            let channels = [];
            let dbo = db.db('chatapp');
            let pointer = dbo.collection('channels').find();
            pointer.forEach(function(obj, err){
                channels.push(obj);
            }, function(){
                let jsonArray = JSON.stringify(channels);
                res.send(jsonArray); 
            })
        });
    }
    return this;
}