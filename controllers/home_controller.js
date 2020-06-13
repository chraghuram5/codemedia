const Post=require('../models/post');

module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',5);
    // Post.find({},function(err,posts){
    //     if(err){
    //         console.log("error fetching posts");
    //     }
    //     return res.render('home',{
    //         title:"Home",
    //         posts: posts
    //     });
    // });

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    })
    .exec(function(err,posts){
        return res.render('home',{
            title:"Home",
            posts: posts
        }); 
    });
}