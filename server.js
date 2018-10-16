// eslint-disable no-console
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const MongoClient = require('mongodb').MongoClient;
const app = express();
const url = "mongodb://localhost:27017/digitalCapsule";
const cog = require("./cog.js");
let database;

app.set("port", process.env.PORT || 3001);

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '16mb', extended: true }))

// Parse application/json
app.use(bodyParser.json( {limit: '16mb'} ))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-*, X-Requested-With, Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("app/build"));
}

MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  database = db.db("digitalCapsule");
  if (err) throw err;
  console.log("Database created!");
  const music = JSON.parse(fs.readFileSync("schemas/music.json"));
  const photos = JSON.parse(fs.readFileSync("schemas/photos.json"));
  const text = JSON.parse(fs.readFileSync("schemas/text.json"));
  const timeCapsules = JSON.parse(fs.readFileSync("schemas/timeCapsules.json"));
  const users = JSON.parse(fs.readFileSync("schemas/users.json"));
  database.createCollection("music", {
    validator: {
      $jsonSchema: music
    }
  }, (err) => {
    if (err) throw new Error("Error creating music collection: " + err.message);
    console.log("Music collection created!");
  });
  database.createCollection("photos", {
    validator: {
      $jsonSchema: photos
    }
  }, (err) => {
    if (err) throw new Error("Error creating photos collection: " + err.message);
    console.log("Photos collection created!");
  });
  database.createCollection("text", {
    validator: {
      $jsonSchema: text
    }
  }, (err) => {
    if (err) throw new Error("Error creating text collection: " + err.message);
    console.log("Text collection created!");
  });
  database.createCollection("timeCapsules", {
    validator: {
      $jsonSchema: timeCapsules
    }
  }, (err) => {
    if (err) throw new Error("Error creating timeCapsules collection: " + err.message);
    console.log("TimeCapsules collection created!");
  });
  database.createCollection("users", {
    validator: {
      $jsonSchema: users
    }
  }, (err) => {
    if (err) throw new Error("Error creating users collection: " + err.message);
    console.log("Users collection created!");
  });
});

app.post('/addMusic', (req, res) => {
  const musicDoc = req.body;
  cog.addMusic(database, musicDoc, (data, err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.delete('/deleteMusic', (req, res) => {
  const musicId = req.query;
  cog.deleteMusic(database, musicId, (data, err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/addPhoto', (req, res) => {
  const photos = req.body;
  cog.addPhoto(database, photos, (data, err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.delete('/deletePhoto', (req, res) => {
  const photoId = req.query;
  cog.deletePhoto(database, photoId, (data, err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/addText', (req, res) => {
  const textDoc = req.body;
  cog.addText(database, textDoc, (data, err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/addCapsule', (req, res) => {
  const capsuleDoc = req.body;
  cog.addTimeCapsule(database, capsuleDoc, (data, err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/registerUser', (req, res) => {
  const user = req.body;
  cog.addUser(database, user, (data, err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/validateUser', (req, res) => {
  const username = req.query;
  cog.validateUser(database, username, (data, err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});

module.exports = app;