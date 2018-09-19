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
