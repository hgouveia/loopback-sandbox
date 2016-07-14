module.exports = function(app) {
    
    var ds      = app.dataSources.mongodb,
        Post    = app.models.Post,
        Comment = app.models.Comment,
        newPost = {
            "title" : "Post Title 1",
            "body" : "This is a body"
        },
        comments = [
            { "author" : "User A", "body" : "This is the comment number 1"},
            { "author" : "User B", "body" : "This is the comment number 2"},
            { "author" : "User C", "body" : "This is the comment number 3"},
            { "author" : "User D", "body" : "This is the comment number 4"},
            { "author" : "User E", "body" : "This is the comment number 5"},
        ];

    ds.automigrate('Post', function(postMigrateError) {
        if (postMigrateError) throw postMigrateError;

        ds.automigrate('Comment', function(commentMigrateError) {
            if (commentMigrateError) throw commentMigrateError;

            Post.create(newPost,function(err,instance){
                if (!err){
                    console.log("Post created");
                        instance.comments.create(comments,function(er,inst){
                            if (!er){
                                console.log("Comments created");
                            }else{
                                console.log("Comments creation error ", er);
                            }
                        });

                }else{
                    console.log("Post creation error ", err);
                }
            });

        });

    });

};
