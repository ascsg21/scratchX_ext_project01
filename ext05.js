
(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.getKoToEnTranslation = function(str, callback) {
      var param = "source=ko&target=en&text=안녕하세요.";
      // var param = '{"source":"ko", "target":"en", "text":"안녕하세요"}';
      // var data = new FormData();
      // data.append('source', 'ko');
      // data.append('target', 'en');
      // data.append('text', '안녕하세요');

      var request = new XMLHttpRequest();
      // var request = createCORSRequest('POST', "https://openapi.naver.com/v1/papago/n2mt");
      request.onreadystatechange= function () {
          if (request.readyState==4) {
              //handle response
              callback(this.responseText);
          }
      }
      request.open("POST", "https://openapi.naver.com/v1/papago/n2mt", true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.setRequestHeader('Access-Control-Allow-Origin', '*');
      request.setRequestHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
      request.setRequestHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Content-Disposition, Accept');
      request.setRequestHeader('Access-Control-Max-Age', '3600');
      request.setRequestHeader('Access-Control-Expose-Headers', 'Content-Disposition, filename');
      request.setRequestHeader('X-Naver-Client-Id', 'yS5a2J6nsWX8IlsYkBEy');
      request.setRequestHeader('X-Naver-Client-Secret', 'BpbDCX8R9M');
      request.send(param);
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name, param1 default value, param2 default value
            ['R', '한글 : %s', 'getKoToEnTranslation', '번역할 한글을 입력하세요...']
        ],
        displayName: 'Naver NMT 번역 구현 예제'
    };

    // Register the extension
    ScratchExtensions.register('Naver NMT 번역 구현 예제', descriptor, ext);
})({});
