
exports.addMusic = function(database, music, callback) {
  database.collection("music").insertOne(music, (err, res) => {
    if (err) {
      console.log('Error inserting music into database: ', err.message);
      return callback(null, err);
    }
    console.log('Music saved');
    return callback(music);
  });
}

exports.addText = function(database, text, callback) {
  database.collection("text").insertOne(text, (err, res) => {
    if (err) {
    console.log('Error inserting text into database: ', err.message);
    return callback(null, err);
    }
    console.log('Text saved');
    return callback(text);
  });
}

exports.addPhoto = function(database, photo, callback) {
  // let photoObjects = [];
  // for (let i = 0; i < photos.photos.length; i+=1) {
  //     photoObjects.push(photos);
  //     delete photoObjects[i].photos;
  //     photoObjects[i].photo = photos.photos[i];
  // }
  database.collection("photos").insertOne(photo, (err, res) => {
    if (err) {
      console.log('Error inserting photo into database: ', err.message);
      return callback(null, err);
    }
    console.log('Photo saved');
    return callback(photo);
  });
}

exports.deletePhoto = function(database, photoId, callback) {
  database.collection("photos").deleteOne(photoId, (err, res) => {
    if (err) {
      console.log('Error deleting photo: ', err.message);
      return callback(null, err);
  }
    console.log('Photo ' + photoId._id + ' deleted');
    return callback(res);
  });
}

exports.addTimeCapsule = function(database, capsule, callback) {
  database.collection("timeCapsules").insertOne(capsule, (err, res) => {
    if (err) {
      console.log('Error creating time capsule in database: ', err.message);
      return callback(null, err);
    }
    console.log('Time capsule saved');
    return callback(capsule);
  });
}

exports.addUser = function(database, user, callback) {
  database.collection("users").findOne({email: user.email}).then((result) => {
    if (result !== null) {
      console.log('User already exists!');
      return callback(null, new Error('User already exists!'));
    } else {
      database.collection("users").insertOne(user, (err, res) => {
        if (err) {
          console.log('Error inserting user in database: ', err.message);
          return callback(null, err);
        }
        console.log('User saved');
        return callback(user);
      });
    }
  });
}