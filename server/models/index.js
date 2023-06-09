// const Comment = require('./Comment');
// const Favorite = require('./Favorite');
const Place = require("./Place");
const NearbySearch = require("./NearbySearch");
// const Post = require('./Post');
const Profile = require('./Profile');
// module.exports = { Profile, Post, Comment, Favorite, Place, NearbySearch };
module.exports = {Profile, Place, NearbySearch}

// // index.js establishes relationships between the models, 
// //and also creates the foreign key constraights without explicitly setting them in the Models
// const User = require('./User.js');
// const Post = require('./Post');
// const Comment = require('./Comment');
// const Favorite = require('./Favorite');
// const Place = require("./Place");
// const NearbySearch = require("./NearbySearch");


// //Posts will have a userId field connecting to user table's id column
// //if a user gets deleted, all posts made by the user get deleted
// Post.belongsTo(User, {
//   foreignKey: 'userId',
//   onDelete: 'CASCADE'
// });

// //Comments will have a postId field connecting to the post table's id column
// //if a post is deleted, all comments on the post will be deleted as well
// Post.hasMany(Comment, {
//   foreignKey: 'postId',
//   onDelete: 'CASCADE'
// });

// //Comments will also have a userId field connecting to the user table's id column
// //If a user gets deleted, all their comments will be deleted as well
// Comment.belongsTo(User, {
//   foreignKey: 'userId',
//   onDelete: 'CASCADE'
// });

// User.hasMany(Favorite, {
//   foreignKey: 'userId',
//   onDelete: 'CASCADE'
// });


// //exports all 3 models as a module
// module.exports = {
//   User,
//   Comment,
//   Post,
//   Favorite,
//   Place, 
//   NearbySearch
// };


// // const Student = require('./Student');
// // const Course = require('./Course');

// // module.exports = { Student, Course };
