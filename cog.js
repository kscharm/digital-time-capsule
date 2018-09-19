const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/capsule";



// let addText = function(text, callback) {
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         object = {
//             "user": '1',
//             "text": text,
//             "time": Date.time(),
//             "metadata": {}
//         }
//         console.log("Database created!");
//         db.close();
//     });
// };


exports.addMusic = function(music, callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        database = db.db("digitalCapsule");
        database.collection("music").insertOne(music, (err, res) => {
            if (err) {
                console.log('Error inserting music into database: ', err.message);
                return null;
            }
            console.log('Music saved');
            return music;
        });
    });
}
