module.exports =
{
    updatedata: function(db, result){
        const collection = db.collection('products');
        let a = collection.findOne({id:'1'}, function(err,res){
            console.log(a);
            let updatedvalues = {$set:{units:res.units-1}}
            collection.updateOne({id:'1'}, updatedvalues, function(err,res){
                if (err) throw err;
                collection.find().toArray(function(err,res){
                    if (err) throw err;
                    result(res);
                })
            })
        })
    }
}