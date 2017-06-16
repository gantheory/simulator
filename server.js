const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const assert = require('assert');

const app = express();

const url = "mongodb://admin:admin@ds163721.mlab.com:63721/2017-web-programming-hw3-database";

app.set('port', (process.env.PORT || 3002));

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/popup/build/`));

function sendHomepage(req, res) {
  res.sendFile(__dirname + '/popup/build/index.html');
}

function postHit(req, res) {
  let updateDocument = {
    "category": "hitNum",
    "num": []
  };
  for (var i = 0 ; i < 40 ; i += 1 ) {
    updateDocument["num"].push( 0 );
  }
  updateDocument["num"][req.body.imageID] += 1;

  mongo.connect(url, (err, db) => {
    var finalCollection = db.collection('final');

    var hitDocument = finalCollection.find({ "category": "hitNum" });
    hitDocument.forEach((doc, err) => {
      for (var i = 0 ; i < 40 ; i += 1 ) {
        updateDocument["num"][i] += doc["num"][i];
      }
      finalCollection.drop();

      finalCollection = db.collection('final');
      finalCollection.insertOne(updateDocument, (err, res) => {
      });
    }, () => {
      //db.close();
    });
  });
}

app.get('/', sendHomepage);
app.post('/api/post', postHit);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
  // eslint-disable-line no-console
});
