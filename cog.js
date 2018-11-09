
exports.addMusic = function(database, music, callback) {
  database.collection("music").insertOne(music, (err, res) => {
    if (err) {
      console.log('Error inserting music into database: ', err.message);
      return callback(null, err);
    }
    database.collection("timeCapsules").updateOne({ _id: music.capsules[0] }, { $push: { musicArr: music._id } }, (err, res) => {
      if (err) {
        console.log("Error retrieving time capsule: ", err.message);
        return callback(null, err);
      }
      return callback(music);
    });
  });
}

exports.deleteMusic = function(database, musicId, capsuleId, callback) {
  database.collection("timeCapsules").updateOne({ _id: capsuleId }, { $pull: { musicArr: musicId } }, (err, res) => {
    if (err) {
      console.log("Error retrieving time capsule: ", err.message);
      return callback(null, err);
    }
    database.collection("music").findOne({ _id: musicId }, (err, res) => {
      if (err) {
        console.log("Music not found: ", err.message);
        return callback(null, err);
      }
      let capArr = [];
      for (let i = 0; i < res.capsules.length; i++) {
        if (res.capsules[i] !== capsuleId) {
          capArr.push(res.capsules[i]);
        }
      }
      if (capArr.length == 0) {
        database.collection("music").deleteOne({ _id: musicId }, (err, res) => {
          if (err) {
            console.log("Error deleting music from database: ", err.message);
            return callback(null, err);
          }
          return callback(res);
        })
      } else {
        res.capsules = capArr;
        database.collection("music").replaceOne({ _id: musicId }, res, (err, res) => {
          if (err) {
            console.log("Error deleting capsule from music object");
            return callback(null, err);
          }
          return callback(res);
        });
      }
    });
  });
}

exports.updateMusic = function(database, music, callback) {
  database.collection("music").updateOne({ _id: music._id }, { $set: { metadata: music.metadata } }, (err, res) => {
    if (err) {
      console.log('Error updating music: ', err.message);
      return callback(null, err);
    }
    return callback(music);
  });
}


exports.addText = function(database, text, callback) {
  database.collection("text").insertOne(text, (err, res) => {
    if (err) {
      console.log('Error inserting text into database: ', err.message);
      return callback(null, err);
    }
    database.collection("timeCapsules").updateOne({ _id: text.capsules[0] }, { $push: { textArr: text._id } }, (err, res) => {
      if (err) {
        console.log("Error retrieving time capsule", err.message);
        return callback(null, err);
      }
      return callback(text);
    });
  });
}

exports.deleteText = function(database, textId, capsuleId, callback) {
  database.collection("timeCapsules").updateOne({ _id: capsuleId }, { $pull: { textArr: textId } }, (err, res) => {
    if (err) {
      console.log("Capsule does not exist");
      return callback(null, err);
    }
    database.collection("text").findOne({ _id: textId }, (err, res) => {
      if (err) {
        console.log("Text not found: ", err.message);
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
            console.log("Error deleting text from database: ", err.message);
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
}

exports.updateText = function(database, text, callback) {
  database.collection("text").updateOne({ _id: text._id }, { $set: { metadata: text.metadata } }, (err, res) => {
    if (err) {
      console.log('Error updating text: ', err.message);
      return callback(null, err);
    }
    return callback(text);
  });
}

exports.addPhoto = function(database, photo, callback) {
  database.collection("photos").insertOne(photo, (err, res) => {
    if (err) {
      console.log('Error inserting photo into database: ', err.message);
      return callback(null, err);
    }
    database.collection("timeCapsules").updateOne({ _id: photo.capsules[0] }, { $push: { photoArr: photo._id } }, (err, res) => {
      if (err) {
        console.log("Error retrieving time capsule", err.message);
        return callback(null, err);
      }
      return callback(photo);
    });
  });
}

exports.deletePhoto = function(database, photoId, capsuleId, callback) {
  database.collection("timeCapsules").updateOne({ _id: capsuleId }, { $pull: { photoArr: photoId } }, (err, res) => {
    if (err) {
      console.log("Capsule does not exist");
      return callback(null, err);
    }
    database.collection("photos").findOne({ _id: photoId }, (err, res) => {
      if (err) {
        console.log("Photo not found: ", err.message);
        return callback(null, err);
      }
      let capArr = [];
      for (let i = 0; i < res.capsules.length; i++) {
        if (res.capsules[i] != capsuleId) {
          capArr.push(res.capsules[i]);
        }
      }
      if (capArr.length == 0) {
        database.collection("photos").deleteOne({_id: photoId}, (err, res) => {
          if (err) {
            console.log("Error deleting photo from database: ", err.message);
            return callback(null, err);
          }
          return callback(res);
        })
      } else {
        res.capsules = capArr;
        database.collection("photos").replaceOne({_id: photoId}, res, (err, res) => {
          if (err) {
            console.log("Error deleting capsule from photo object");
            return callback(null, err);
          }
          return callback(res);
        })
      }
    });
  });
}

exports.updatePhoto = function(database, photo, callback) {
  database.collection("photos").updateOne({ _id: photo._id }, { $set: { metadata: photo.metadata } }, (err, res) => {
    if (err) {
      console.log('Error updating photo: ', err.message);
      return callback(null, err);
    }
    return callback(photo);
  });
}

exports.addTimeCapsule = function(database, capsule, callback) {
  database.collection("timeCapsules").insertOne(capsule, (err, res) => {
    if (err) {
      console.log('Error creating time capsule in database: ', err.message);
      return callback(null, err);
    }
    database.collection("users").updateOne({ _id: capsule.ownerId }, { $push: { capsules: capsule._id } }, (err, res) => {
      if (err) {
        console.log('Error adding capsule to user');
        return callback(null, err);
      }
      console.log('Time capsule saved');
      return callback(capsule);
    });

  });
}

exports.deleteTimeCapsule = function(database, capsuleId, callback) {
  database.collection("timeCapsules").findOne({ _id : capsuleId, ownerId: {$ne: capsuleId} }, (err, capsule) => {
    if (err) {
      console.log('Error deleting time capsule: ', err.message);
      return callback(err);
    }
    if (!capsule) {
      return callback(null, 'Cannot delete personal time capsule');
    }
    promises = [];
    owner = capsule.ownerId
    let ownerPromise = new Promise((resolve, reject) => {
      database.collection("users").updateOne({ _id: owner},  { $pull: { capsules: capsuleId } }, (err, user) => {
        if (err) {
          reject(err);
        }
        resolve(user);
      });
    }).catch((err) => console.log("Error deleting capsule: ", err.message));
    promises.push(ownerPromise);
    
    contributors = capsule.contributors
    for (let i = 0; i < contributors.length; i++) {
      let contrPromise = new Promise((resolve, reject) => {
        database.collection("users").updateOne({ username: contributors[i] },  { $pull: { capsules: capsuleId } }, (err, user) => {
          if (err) {
            reject(err);
          }
          resolve(user);
        });
      }).catch((err) => console.log("Error deleting capsule: ", err.message));
      promises.push(contrPromise);
    }
    photoArr = capsule.photoArr
    for (let i = 0; i < photoArr.length; i++) {
      let photoPromise = new Promise((resolve, reject) => {
        this.deletePhoto(database, photoArr[i], capsuleId, (res, err) => {
          if (err) {
            reject(err);
          }
          resolve(res)
        });
      }).catch((err) => console.log("Error deleting capsule: ", err.message));
      promises.push(photoPromise);
    }
    textArr = capsule.textArr
    for (let i = 0; i < textArr.length; i++) {
      let textPromise = new Promise((resolve, reject) => {
        this.deleteText(database, textArr[i], capsuleId, (res, err) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
      }).catch((err) => console.log("Error deleting capsule: ", err.message));
      promises.push(textPromise);
    }
    musicArr = capsule.musicArr
    for (let i = 0; i < musicArr.length; i++) {
      let musicPromise = new Promise((resolve, reject) => {
        this.deleteMusic(database, musicArr[i], capsuleId, (res, err) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
      }).catch((err) => console.log("Error deleting capsule: ", err.message));
      promises.push(musicPromise);
    }
    Promise.all(promises).then((elements, err) => {
      if (err) {
        return callback(null, err);
      }
      database.collection("timeCapsules").deleteOne({ _id : capsuleId }, (err, res) => {
        if (err) {
          console.log('Error deleting time capsule: ', err.message);
          return callback(null, err);
        }
        console.log('Time capsule ' + capsuleId.capsule + ' deleted');
        return callback(res);
      });
    }).catch((err) => console.log("Error deleting capsule: ", err.message));
  });
}

exports.addUser = function(database, user, callback) {
  database.collection("users").findOne({ email: user.email }).then((result) => {
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
          contributors: [user.username],
          photoArr: [],
          textArr: [],
          musicArr: [],
          metadata: {},
          settings: {
            group: user._id,
            privacy: "private",
            theme: {}
          },
          description: 'Personal time capsule',
          tags: [],
          requestAccess: [],
        }
        this.addTimeCapsule(database, capsule, (res, err) => {
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
    let media = {
      text: [],
      photos: [],
      music: [],
      quotes: [],
    };
    const promises = [];
    if (capsule) {
      if (capsule.textArr.length > 0) {
        for (let i = 0; i < capsule.textArr.length; i++) {
          let textPromise = new Promise((resolve, reject) => {
           database.collection("text").findOne({ _id: capsule.textArr[i] }).then((text, err) => {
             if (err) {
               reject(err);
             }
             resolve(text);
           });
          });
          promises.push(textPromise);
         }
      }
      if (capsule.photoArr.length > 0) {
        for (let i = 0; i < capsule.photoArr.length; i++) {
          let photoPromise = new Promise((resolve, reject) => {
            database.collection("photos").findOne({ _id: capsule.photoArr[i] }).then((photo, err) => {
              if (err) {
                reject(err);
              }
              resolve(photo);
            });
          });
          promises.push(photoPromise);
        }
      }
      if (capsule.musicArr.length > 0) {
        for (let i = 0; i < capsule.musicArr.length; i++) {
          let musicPromise = new Promise((resolve, reject) => {
            database.collection("music").findOne({ _id: capsule.musicArr[i] }).then((music, err) => {
              if (err) {
                reject(err);
              }
              resolve(music);
            });
          });
          promises.push(musicPromise);
        }
      }
      Promise.all(promises).then((elements, err) => {
        if (err) {
          return callback(null, err);
        }
        for (let i = 0; i < elements.length; i++) {
          if (elements[i].quote) {
            media.quotes.push(elements[i]);
          } else if (elements[i].photo) {
            media.photos.push(elements[i]);
          } else if (elements[i].text) {
            media.text.push(elements[i]);
          } else if (elements[i].music) {
            media.music.push(elements[i]);
          }
        }
        return callback(media);
      }).catch((err) => console.log("Error getting media: " + err));
    }
  })
}

exports.getFriends = function(database, username, callback) {
  database.collection("users").findOne(username, (err, user) => {
    if (err) {
      console.log("Error getting friends: ", err.message);
      return callback(null, err);
    }
    database.collection("users").find({ username: { $in: user.friends } }).toArray((err, users) => {
      if (err) {
        console.log("Error getting sent friend requests: ", err.message);
        return callback(null, err);
      }
      const usernames = users.map((user) => {
        const u = {
          username: user.username,
          _id: user._id,
          photo: user.photo,
          university: user.university
        };
        return u;
      });
      return callback(usernames);
    });
  });
}

exports.getSentRequests = function(database, username, callback) {
  database.collection("users").findOne(username, (err, user) => {
    if (err) {
      console.log("Error getting sent friend requests: ", err.message);
      return callback(null, err);
    }
    database.collection("users").find({ username: { $in: user.sentRequests } }).toArray((err, users) => {
      if (err) {
        console.log("Error getting sent friend requests: ", err.message);
        return callback(null, err);
      }
      const usernames = users.map((user) => {
        const u = {
          username: user.username,
          _id: user._id,
          photo: user.photo,
          university: user.university
        };
        return u;
      });
      return callback(usernames);
    });
  });
}

exports.getReceivedRequests = function(database, username, callback) {
  database.collection("users").findOne(username, (err, user) => {
    if (err) {
      console.log("Error getting received friend requests: ", err.message);
      return callback(null, err);
    }
    database.collection("users").find({ username: { $in: user.receivedRequests } }).toArray((err, users) => {
      if (err) {
        console.log("Error getting received friend requests: ", err.message);
        return callback(null, err);
      }
      const usernames = users.map((user) => {
        const u = {
          username: user.username,
          _id: user._id,
          photo: user.photo,
          university: user.university
        };
        return u;
      });
      return callback(usernames);
    });
  });
}

exports.sendFriendRequest = function(database, myUsername, friendUsername, callback) {
  database.collection('users').findOne({ username: myUsername }, (err, myUser) => {
    if (myUser.friends.includes(friendUsername)) {
      return callback(null, 'Already friends with user');
    }
    if (myUser.receivedRequests.includes(friendUsername)) {
      this.acceptFriend(database, myUsername, friendUsername, (res, err) => {
        if (err) {
          return callback(null, err);
        }
        return callback(res);
      });
    } else {
      database.collection("users").findOneAndUpdate({ username: myUsername },  { $push: { sentRequests: friendUsername } }, (err, me) => {
        if (err) {
          console.log("Error adding friend: ", err.message);
          return callback(null, err);
        }
        database.collection("users").findOneAndUpdate({ username: friendUsername },  { $push: { receivedRequests: myUsername } }, (err, friend) => {
          if (err) {
            console.log("Error adding friend: ", err.message);
            return callback(null, err);
          }
          return callback(myUser);
        });
      });
    }
  });
}

exports.deleteFriend = function(database, myUsername, friendUsername, callback) {
  database.collection("users").updateOne({ username: myUsername },  { $pull: { friends: friendUsername } }, (err, me) => {
    if (err) {
      console.log("Error deleting friend: ", err.message);
      return callback(null, err);
    }
    database.collection("users").updateOne({ username: friendUsername },  { $pull: { friends: myUsername } }, (err, friend) => {
      if (err) {
        console.log("Error deleting friend: ", err.message);
        return callback(null, err);
      }
      return callback(me);
    });
  });
}

exports.acceptFriend = function(database, myUsername, friendUsername, callback) {
  // Update my friends list to include the new friend and remove the user from
  // the receivedRequests list
  database.collection("users").updateOne({ username: myUsername },  {
    $pull: { sentRequests: friendUsername },
    $pull: { receivedRequests: friendUsername },
    $push: { friends: friendUsername }
  }, (err, me) => {
    if (err) {
      console.log("Error accepting friend: ", err.message);
        return callback(null, err);
    }
    // Update other user's friends list to include my name and remove my
    // name from their sentRequests list
    database.collection("users").updateOne({ username: friendUsername },  {
      $pull: { receivedRequests: myUsername },
      $pull: { sentRequests: myUsername },
      $push: { friends: myUsername }
    }, (err, friend) => {
      if (err) {
        console.log("Error accepting friend: ", err.message);
        return callback(null, err);
      }
      return callback(me);
    });
  });
}

exports.getCapsules = function(database, username, callback) {
  database.collection("users").findOne(username, (err, user) => {
    if (err) {
      console.log("Error getting capsules: ", err.message);
      return callback(null, err);
    }
    if (!user) {
      return callback([]);
    }
    return callback(user.capsules);
  });
}

exports.requestAccess = function(database, capsuleId, username, callback) {
  database.collection("timeCapsules").updateOne({ _id: capsuleId },
    { $addToSet: { requestAccess: username }
  }, (err, capsule) => {
    if (err) {
      console.log("Error requesting access for time capsule: ", err.message);
      return callback(null, err);
    }
    return callback(username);
  });
}

exports.getRequestAccess = function(database, capsuleId, callback) {
  database.collection("timeCapsules").findOne({ _id: capsuleId }, (err, capsule) => {
    if (err) {
      console.log("Error getting time capsule: ", err.message);
      return callback(null, err);
    }
    return callback(capsule.requestAccess);
  });
}

exports.addContributor = function(database, capsuleId, username, callback) {
  database.collection("timeCapsules").updateOne({ _id: capsuleId }, {
    $pull: { requestAccess: username },
    $push: { contributors: username }
  }, (err, capsule) => {
    if (err) {
      console.log("Error requesting access for time capsule: ", err.message);
      return callback(null, err);
    }
    return callback(username);
  });
}

exports.removeContributor = function(database, capsuleId, username, callback) {
  database.collection("users").findOne({ username }, (err, user) => {
    if (err) {
      return callback(null, err);
    }
    database.collection("timeCapsules").findOne({ $and:
      [ { _id: capsuleId },
        { ownerId: { $ne: user._id} }
      ] }, (err, capsule) => {
      if (!capsule || err) {
        return callback(null, "Cannot remove the owner of a capsule");
      }
      database.collection("timeCapsules").updateOne({ _id: capsuleId },
        { $pull: { contributors: username } }, (err, doc) => {
          if (err) {
            return callback(null, err);
          }
          return callback(username);
      });
    });
  });
}

exports.getCapsulesById = function(database, capsuleIds, callback) {
  database.collection("timeCapsules").find({ _id: { $in: capsuleIds } }).toArray((err, capsules) => {
    if (err) {
      console.log("Error matching time capsules: ", err.message);
      return callback(null, err);
    }
    const returnCapsules = capsules.map((capsule) => {
      const c = {
        _id: capsule._id,
        title: capsule.title,
        description: capsule.description
      };
      return c;
    });
    return callback(returnCapsules);
  });
}

exports.searchUsers = function(database, query, callback) {
  const exp = new RegExp(query);
  database.collection("users").find({ $or: [ 
      { username: { $regex: exp } },
      { firstName: { $regex: exp } },
      { lastName: { $regex: exp } }
    ]}).toArray((err, users) => {
    if (err) {
      console.log("Error getting users: ", err.message);
    }
    const usernames = users.map((user) => {
      const u = {
        username: user.username,
        _id: user._id,
        photo: user.photo,
        university: user.university,
        friends: user.friends
      };
      return u;
    });
    return callback(usernames);
  });
}

exports.searchCapsules = function(database, query, username, callback) {
  database.collection("users").findOne({ username }, (err, user) => {
    if (err) {
      console.log("User " + user + " not found");
      return callback(null, err);
    }
    const exp = new RegExp(query);
    database.collection("timeCapsules").find({ $or: [
      { title: { $regex: exp } },
      { contributors: { $elemMatch: { $regex: exp} } }
    ]}).toArray((err, capsules) => {
      if (err) {
        console.log("Error matching time capsules: ", err.message);
      }
      const returnCapsules = capsules.map((capsule) => {
        const c = { 
          _id: capsule._id,
          title: capsule.title,
          description: capsule.description
        };
        return c;
      });
      return callback(returnCapsules);
    });
  });
}

exports.checkCapsuleOwner = function(database, capsuleId, callback) {
  database.collection("timeCapsules").findOne({ _id:capsuleId}, (err, capsule) => {
    if (err) {
      return callback(null, err);
    }
    return callback(capsule.ownerId);
  });
}

exports.getCapsuleContributors = function(database, capsuleId, callback) {
  database.collection("timeCapsules").findOne({ _id:capsuleId }, (err, capsule) => {
    if (err) {
      console.log("Error getting time capsule: ", err.message);
      return callback(null, err);
    }
    return callback(capsule.contributors);
  })
}


