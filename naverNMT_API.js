var express = require('express')
    , http = require('http');
var bodyParser = require('body-parser');

var app = express();

var router = express.Router();

var str ='';
var client_id = 'yS5a2J6nsWX8IlsYkBEy';
var client_secret = 'BpbDCX8R9M';
var query = "안녕하세요.";

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


router.route('/naverAPI').post(function(req, res) {
  console.log('/naverAPI 처리함.');

  var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
  var request = require('request');
  var options = {
       url: api_url,
       form: {'source':'ko', 'target':'en', 'text':query},
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
  console.log('aa');
  request.post(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
       console.log(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
   console.log('bb');
  // var paramId = req.body.id || req.query.id;
  // var paramPassword = req.body.password || req.query.password;
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
