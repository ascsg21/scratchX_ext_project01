var express = require('express')
    , http = require('http');
var bodyParser = require('body-parser');

var app = express();

var router = express.Router();

var str ='';

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.route('/visionAPI').post(function(req, res) {
  console.log('/visionAPI 처리함.');

  // var paramId = req.body.id || req.query.id;
  // var paramPassword = req.body.password || req.query.password;

  res.writeHead('200', {'Content-Type':'text/plain'});

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
  res.write(str);
  res.end();
});

app.use('/', router);

http.createServer(app).listen(3000, function() {
  console.log('Express 서버가 3000번 포트에서 시작됨.');
});

// exports.getImageDescription = function() {
//   // Imports the Google Cloud client library
//   const vision = require('@google-cloud/vision');
//
//   // Creates a client
//   const client = new vision.ImageAnnotatorClient();
//
//   // Performs label detection on the image file
//   client
//     .labelDetection('dog.jpg')
//     .then(results => {
//       const labels = results[0].labelAnnotations;
//
//       console.log('Labels:');
//       labels.forEach(label => {
//       // console.log(label.description)
//           str = str + ', ' + label.description;
//       });
//
//       console.log(str);
//     })
//     .catch(err => {
//       console.error('ERROR:', err);
//     });
//
//   return str;
// }
