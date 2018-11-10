
(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.getYouTubeInfo = function(callback) {
      var yourUrl = 'https://www.googleapis.com/youtube/v3/channels?part=id,snippet,brandingSettings,contentDetails,invideoPromotion,statistics,topicDetails&id=채널id&key=apikey';
      var Httpreq = new XMLHttpRequest();
      try {
          Httpreq.open("GET", yourUrl, false);
          Httpreq.send(null);
      } catch (ex) {
          callback('error');
      }
      var info = JSON.parse(Httpreq.responseText);
      callback(info.items[0].statistics.viewCount);
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name, param1 default value, param2 default value
            ['R', '유투브 정보가져오기', 'getYouTubeInfo']
        ],
        displayName: 'You Tube Info Example'
    };

    // Register the extension
    ScratchExtensions.register('You Tube Info Example', descriptor, ext);
})({});
