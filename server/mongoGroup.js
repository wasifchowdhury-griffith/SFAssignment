module.exports = function(MongoClient, dbURL, req){
    this.MongoClient = MongoClient;
    this.dbURL = dbURL;
    this.req = req;

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

            // dbo.collection('groups').find({"members":{"name": this.req}}).toArray(function(err,result){
            //     if (err) throw err;
            //     res.send(result);
            //     db.close()
            // });
        });
    }
    return this;
}