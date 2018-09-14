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
    const database = db.db("digitalCapsule");
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
    // db.close();
  });
});