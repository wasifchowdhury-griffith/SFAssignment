module.exports =
{
    findlogin: function(db, result){
        const collection = db.collection('users');
        collection.findOne({username:'wchow1'}, function(err,res){
            // let update = {$set:{username: 'wchow1'}}
            // collection.updateOne({username: 'wasif'}, update, function(err, res){
            //     if (err) throw err;
            //     collection.find().toArray(function(err,res){
            //         if (err) throw err;
            //         result(res);
            //     })
            // })
            if (err) throw err;
            result(res);
        })
    }
}