
exports.addMusic = function(database, music, callback) {
  database.collection("music").insertOne(music, (err, res) => {
    if (err) {
      console.log('Error inserting music into database: ', err.message);
      return callback(null, err);
    }
    database.collection("timeCapsules").findOne({_id:music.capsules[0]}, (err, res) => {
      if (err) {
        console.log("Error retrieving time capsule", err.message);
        return callback(null, err);
      }
      res.textArr.push({id: music._id});
      database.collection("timeCapsules").replaceOne({_id:text.capsules[0]}, res, (err, res) => {
        if (err) {
          console.log("Error adding data to capsule", err.message);
          return callback(null, err);
        }
        return callback(music);
      });
    });
  });
}

exports.addText = function(database, text, callback) {
  database.collection("text").insertOne(text, (err, res) => {
    if (err) {
      console.log('Error inserting text into database: ', err.message);
      return callback(null, err);
    }
    database.collection("timeCapsules").findOne({_id:text.capsules[0]}, (err, res) => {
      if (err) {
        console.log("Error retrieving time capsule", err.message);
        return callback(null, err);
      }
      res.textArr.push({id: text._id});
      database.collection("timeCapsules").replaceOne({_id:text.capsules[0]}, res, (err, res) => {
        if (err) {
          console.log("Error adding data to capsule", err.message);
          return callback(null, err);
        }
        return callback(text);
      });
    });
  });
}

exports.addPhoto = function(database, photo, callback) {
  database.collection("photos").insertOne(photo, (err, res) => {
    if (err) {
      console.log('Error inserting photo into database: ', err.message);
      return callback(null, err);
    }
    database.collection("timeCapsules").findOne({_id:photo.capsules[0]}, (err, res) => {
      if (err) {
        console.log("Error retrieving time capsule", err.message);
        return callback(null, err);
      }
      res.photoArr.push({id: photo._id});
      database.collection("timeCapsules").replaceOne({_id:photo.capsules[0]}, res, (err, res) => {
        if (err) {
          console.log("Error adding data to capsule", err.message);
          return callback(null, err);
        }
        return callback(photo);
      });
    });
  });
}

exports.deleteText = function(database, textId, capsuleId, callback) {
  database.collection("timeCapsules").findOne(capsuleId, (err, res) => {
    if (err) {
      console.log("Capsule does not exist");
      return callback(null, err);
    }
    let textArr =[];
    for (let j = 0; j < res.textArr.length; j++) {
      if (res.textArr[i].id == textId) {
        textArr.push(res.textArr[i]);
      }
    }
    res.textArr = textArr;
    database.collection("timeCapsule").replaceOne({_id:capsuleId}, res, (err, res) => {
      if (err) {
        console.log("Error removing text from time capsule", err.message);
        return callback(null, err);
      }
      database.collection("text").findOne({_id: textId}, (err, res) => {
        if (err) {
          console.log("Error deleting text: ", err.message);
          return callback(null, err);
        }
        let capArr = [];
        for (let i = 0; i < res.capsules.length; i++) {
          if (res.capsules[i] != capsuleId) {
            capArr.push(res.capsules[i]);
          }
        }
        if (capArr.length == 0) {
          database.collection("text").deleteOne({_id: textId}, (err, res) => {
            if (err) {
              console.log("Error deleting text object from database: ", err.message);
              return callback(null, err);
            }
            return callback(res);
          })
        } else {
          res.capsules = capArr;
          database.collection("text").replaceOne({_id: textId}, res, (err, res) => {
            if (err) {
              console.log("Error deleting capsule from text object");
              return callback(null, err);
            }
            return callback(res);
          })
        }
      });
    });
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
        let capsule = {
          ownerId: user._id,
          _id: user._id,
          title: user.firstName + "'s Personal Capsule",
          contributors: [user._id],
          photoArr: [],
          textArr: [],
          musicArr: [],
          metadata: {},
          settings: {
            group: user._id,
            privacy: {},
            theme: {}
          }
        }
        this.addTimeCapsule(database, capsule, (err, res) => {
          if (err) {
            return callback(null, err);
          }
          console.log('User saved');
          return callback(user);
        })
      });
    }
  });
}

exports.validateUser = function(database, username, callback) {
  database.collection("users").findOne(username).then((user, err) => {
    if (err) {
      return callback(null, err);
    }
    return callback(user);
  });
}

exports.getMedia = function(database, capsuleId, callback) {
  database.collection("timeCapsules").findOne(capsuleId).then((capsule, err) => {
    if (err) {
      return callback(null, err);
    }
    return callback(capsule);
  })
}