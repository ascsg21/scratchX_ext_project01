var express = require('express')
    , http = require('http');

var app = express();

var str ='';

app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function() {
  console.log('익스프레스 서버를 시작했습니다. : ' + app.get('port'));

  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  client
    .labelDetection('dog.jpg')
    .then(results => {
      const labels = results[0].labelAnnotations;

      console.log('Labels:');
      labels.forEach(label => {
      // console.log(label.description)
          str = str + ', ' + label.description;
      });

      console.log(str);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

});
