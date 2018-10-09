// Read the file into memory.
var fs = require('fs');
var imageFile = fs.readFileSync('./dog.jpg');

// Covert the image data to a Buffer and base64 encode it.
var encoded = new Buffer(imageFile).toString('base64');

console.log(encoded);
