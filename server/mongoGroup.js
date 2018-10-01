module.exports = function(MongoClient, dbURL, req){
    this.MongoClient = MongoClient;
    this.dbURL = dbURL;
    this.req = req;

    //retrieves groups in database
    this.getMGroups = function(res){
        this.MongoClient.connect(this.dbURL, function(err,db){
            if (err) throw err;

            let dbo = db.db('chatapp');
            let resArray = [];
            let pointer = dbo.collection('groups').find();
            pointer.forEach(function(obj,err){
                resArray.push(obj);
            }, function(){
                let jsonArray = JSON.stringify(resArray);
                console.log("groups found");
                res.send(jsonArray);
            })
        });
    }
    return this;
}