var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var db = 'mongodb://localhost/yardsale';
mongoose.connect(db)

var itemSchema = new Schema({
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  itemName: String,
  itemDescription: String,
  itemPrice: Number,
  itemSold: Boolean,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  money: Number,
  collectedItems: [{
    type: String
  }]
  
});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

var commentSchema = new Schema({
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  itemLink: String,
  commentMsg: String
});


Comment = mongoose.model('Comment', commentSchema);
Item = mongoose.model('Item', itemSchema);
User = mongoose.model('User', userSchema);

var user1 = new User({
  username: 'bricktamland',
  password: '11111',
  money: 9000,
  collectedItems: []
});

user1.save(function(err) {
  if(err) throw err;
  var comment1 = new Comment({
    commentMsg: "I love you more than I love lamp",
    _owner: user1.id,
    itemLink: "Nikon FM10 35mm"
  });

  var comment2 = new Comment({
    commentMsg: "I love lamp",
    _owner: user1.id,
    itemLink: "Vienna Crystal and Brass Table Lamp"
  });

  comment1.save(function(err) {
    if(err) throw err;
    comment2.save(function(err) {
      if(err) throw err;
    });
  });

  var item1 = new Item({
    itemName: 'Nikon FM10 35mm',
    itemDescription: "Learn the art of photography the old fashioned way",
    itemPrice: 500,
    itemSold: false
  });
  item1.save(function(err) {
    if(err) throw err;

    Item.update({
      itemName: 'Nikon FM10 35mm'
    }, {
      $push: {
        comments: comment1._id
      }
    }).exec(function(err) {
      if(err) throw err;
      console.log('done');
    });
  });
  var item2 = new Item({
    itemName: 'Vienna Crystal and Brass Table Lamp',
    itemDescription: "Bright brass accents add to the charm of this sparkling clear crystal table lamp",
    itemPrice: 150,
    itemSold: false
  });
  item2.save(function(err) {
    if(err) throw err;

    Item.update({
      itemName: 'Vienna Crystal and Brass Table Lamp'
    }, {
      $push: {
        comments: comment2._id
      }
    }).exec(function(err) {
      if(err) throw err;
      console.log('done');
    });
  });
});


var user2 = new User({
  username: 'reginageorge',
  password: 'meangirls',
  money: 8000,
  collectedItems: []
});

user2.save(function(err) {
  if(err) throw err;
  var comment1 = new Comment({
    commentMsg: "Vintage! So adorable =)",
    _owner: user2.id,
    itemLink: "Nikon FM10 35mm"
  });

  var comment2 = new Comment({
    commentMsg: "Oh my God! I love this lamp.",
    _owner: user2.id,
    itemLink: "Vienna Crystal and Brass Table Lamp"
  });

  comment1.save(function(err) {
    if(err) throw err;
    comment2.save(function(err) {
      if(err) throw err;
    });
  });

  Item.update({
    itemName: 'Nikon FM10 35mm'
  }, {
    $push: {
      comments: comment1._id
    }
  }).exec(function(err) {
    if(err) throw err;
    console.log('done');
  });

  Item.update({
    itemName: 'Vienna Crystal and Brass Table Lamp'
  }, {
    $push: {
      comments: comment2._id
    }
  }).exec(function(err) {
    if(err) throw err;
    console.log('done');
  });
});
