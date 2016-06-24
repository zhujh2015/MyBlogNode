var mongodb=require('./db');

function Comment(name,day,title,comment) 
{
 this.name=name;
 this.day=day;
 this.title=title;
 this.comment=comment;	// body...
}

module.exports=Comment;

Comment.prototype.save=function(callback){
	var name=this.name,day=this.day,title=this.title,comment=this.comment;

 mongodb.open(function(err,db){

 	if(err){return callback(err);}

 	db.collection('posts',function(err,collection)
 	{
        if(err){mongodb.close(); return callback(err);}
        /*更新留言板字段到 文章表字段*/
       collection.update(
       	{"name":name,"time.day":day,"title":title},
       	{$push:{"comments":comment}},
       	function(err)
       	{
            mongodb.close();
            if(err){return callback(err);}
            callback(null);
       	});

 	});
 });
};


