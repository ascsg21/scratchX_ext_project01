// var str ='test';

// import {getImageDescription} from 'visionAPI_module';
// const myModule = require('./visionAPI_module');


// googleVisionAPI(imgPath);
// Imports the Google Cloud client library
// const vision = require('@google-cloud/vision');

// function googleVisionAPI(imgPath) {
//   // Imports the Google Cloud client library
//   const vision = require('@google-cloud/vision');
//
//   // Creates a client
//   const client = new vision.ImageAnnotatorClient();
//
//   // Performs label detection on the image file
//   client
//     .labelDetection(imgPath)
//     .then(results => {
//       const labels = results[0].labelAnnotations;
//
//       for(var i=0; i < labels.length; i++) {
//         str = str + ', ' + label.description;
//       }
//
//       return str;
//     })
//     .catch(err => {
//       console.error('ERROR:', err);
//     });
// }

(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.getImageDescription = function(imgPath, callback) {
      $.post('http://localhost:3000/visionAPI', null, function(data) {
        callback(data);
        // str = data.responseText;
        // return str;
      });
      // // Creates a client
      // const client = new vision.ImageAnnotatorClient();

      // Performs label detection on the image file
      // client
      //   .labelDetection(imgPath)
        // .then(results => {
        //   const labels = results[0].labelAnnotations;
        //
        //   console.log('Labels:');
        //   labels.forEach(label => {
        //   // console.log(label.description)
        //       str = str + ', ' + label.description;
        //   });
        // })
        // .catch(err => {
        //   console.error('ERROR:', err);
        // });
      // const myModule = require('./visionAPI_module');
      //
      // str = myModule.getImageDescription();

    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name, param1 default value, param2 default value
            ['R', 'image path : %s', 'getImageDescription', 'img'],
        ],
        displayName: 'google Vision API Block'
    };

    // Register the extension
    ScratchExtensions.register('google Vision API sample', descriptor, ext);
})({});
