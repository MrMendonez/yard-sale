var mongoose = require('mongoose');

/* Mongoose Connect */
var db = 'mongodb://localhost/yardsale';
mongoose.connect(db);

var User = require('./model/user');
var Item = require('./model/item');
var Comment = require('./model/comment');

// create a user
var user1 = new User({
  name: 'Aperture Science',
  money: 50000,
  password: 'BlackMesa',
  collectedItems: ['Jade Sword', 'Magic Beans']
});
// within saving the user
user1.function(err) {
  if(err) return err;

  // create comments within the user save
  var comment1 = new Comment({
    commentMsg: "I <3 this gun! My Fave!!!",
    _owner: user1.id,
    itemLink: "Portal Gun"
  });
  var comment2 = new Comment({
    commentMsg: "This gun is sick!!!"
    _owner: user1.id,
    itemLink: "Portal Gun"
  });

  comment1.save(function(err) {
    if(err) return err;
    comment2.save(function(err) {
      if(err) return err;
    });
  });

  // item creation
  var item1 = new Item({
    itemName: "Portal Gun",
    _owner: user1.id,
    itemDescription: "This is a really cool gun, great price",
    itemPrice: 900,
    itemSold: false
  });
  item1.save(function(err)) {
    if(err) return(err);

    //within comments creation add the comments in
    Item.update({
      itemName: "Portal Gun",
    }, {
      $push: {
        comments: comment1._id
      }
    }).exec(function(err) {
      if(err) return err;
    })
    Item.update({
      itemName: "Portal Gun";
    }, {
      $push: {
        comments: comment2._id
      }
    }).exec(function(err) {
      if(err) return err;
      console.log('Done');
    })
  };

};