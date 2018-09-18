// eslint-disable no-console
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const MongoClient = require('mongodb').MongoClient;
const app = express();
const url = "mongodb://localhost:27017/digitalCapsule";
let database;

app.set("port", process.env.PORT || 3001);

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Parse application/json
app.use(bodyParser.json())

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

app.post('/music', (req, res) => {
  const musicDoc = req.body;
  database.collection("music").insertOne(musicDoc, (err, res) => {
    if (err) {
      console.log('Error inserting music into database: ', err.message);
      return null;
    }
    console.log('Music saved');
    return musicDoc;
  });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});

module.exports = app;