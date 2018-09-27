module.exports = function(MongoClient, url, body){
    this.MongoClient = MongoClient;
    this.url = url;
    this.body = body;

    this.getLogin = function(res){
        this.MongoClient.connect(this.url, function(err,db){
            if (err) throw err;

            let u = this.body.username;
            let p = this.body.password;
            let dbo = db.db('chatapp');
            dbo.collection('users').find({"username": u, "password": p}).toArray(function(err,result){
                if (err) throw err;
                res.send(result);
                db.close()
            });
        });
    }
    return this;
}