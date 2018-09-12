const express = require("express");
const fs = require("fs");
const MongoClient = require('mongodb').MongoClient;
const app = express();
const url = "mongodb://localhost:27017/digitalCapsule";

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// eslint-disable no-console
app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
  MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    const digitalCapsule = db.db("digitalCapsule");
    if (err) throw err;
    console.log("Database created!");
    const music = JSON.parse(fs.readFileSync("schemas/music.json"));
    const photos = JSON.parse(fs.readFileSync("schemas/photos.json"));
    const text = JSON.parse(fs.readFileSync("schemas/text.json"));
    const timeCapsules = JSON.parse(fs.readFileSync("schemas/timeCapsules.json"));
    const users = JSON.parse(fs.readFileSync("schemas/users.json"));
    digitalCapsule.createCollection("music", {
      validator: {
        $jsonSchema: music
      }
    }, (err) => {
      if (err) throw err;
      console.log("Music collection created!");
    });
    digitalCapsule.createCollection("photos", {
      validator: {
        $jsonSchema: photos
      }
    }, (err) => {
      if (err) throw err;
      console.log("Photos collection created!");
    });
    digitalCapsule.createCollection("text", {
      validator: {
        $jsonSchema: text
      }
    }, (err) => {
      if (err) throw err;
    });
    digitalCapsule.createCollection("timeCapsules", {
      validator: {
        $jsonSchema: timeCapsules
      }
    }, (err) => {
      if (err) throw err;
      console.log("TimeCapsules collection created!");
    });
    digitalCapsule.createCollection("users", {
      validator: {
        $jsonSchema: users
      }
    }, (err) => {
      if (err) throw err;
      console.log("Users collection created!");
    });
  });
});