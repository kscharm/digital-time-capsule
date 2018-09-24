// exports.addText = function(text, callback) {
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         object = {
//             "user": '1',
//             "text": text,
//             "time": Date.time(),
//             "metadata": {}
//         }
//     });
// };

const uuidv4 = require('uuid/v4');

exports.addMusic = function(database, music, callback) {
    music.mediaId = uuidv4();
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
    text.mediaId = uuidv4();
    database.collection("text").insertOne(text, (err, res) => {
        if (err) {
            console.log('Error inserting text into database: ', err. message);
            return callback(null, err);
        }
        console.log('Text saved');
        return callback(text);
    })
}

exports.addPhoto = function(database, photo, callback) {
    // let photoObjects = [];
    // for (let i = 0; i < photos.photos.length; i+=1) {
    //     photoObjects.push(photos);
    //     delete photoObjects[i].photos;
    //     photoObjects[i].photo = photos.photos[i];
    // }
    photo.mediaId = uuidv4();
    database.collection("photos").insertOne(photo, (err, res) => {
        if (err) {
            console.log('Error inserting photo into database: ', err. message);
            return callback(null, err);
        }
        console.log('Photo saved');
        return callback(photo);
    });
}

exports.addTimeCapsule = function(database, capsule, callback) {
    capsule.photoArr = [];
    capsule.textArr = [];
    capsule.musicArr = [];
    capsule.timeCapsuleId = uuidv4();
    database.collection("timeCapsules").insertOne(capsule, (err, res) => {
        if (err) {
            console.log('Error creating time capsule in database: ', err. message);
            return callback(null, err);
        }
        console.log('Time capsule saved');
        return callback(capsule);
    })
}