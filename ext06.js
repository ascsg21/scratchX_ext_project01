
(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.getKoToEnTranslation = function(str, callback) {
      $.ajax({
          url: 'http://localhost:3000/naverAPI', // 요청 할 주소
          async: false, // false 일 경우 동기 요청으로 변경
          type: 'POST', // GET, PUT
          data: {
              str_p: str
          }, // 전송할 데이터
          dataType: 'json', // xml, json, script, html
          // beforeSend: function(data) {callback('aaa');}, // 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
          success: function(data) {
            var str = '';
            for(var tmp in data){
                str += data[tmp];
            }
            var obj = JSON.parse(str);

            callback(obj.message.result.translatedText);

          }, // 요청 완료 시
          error: function(data) {callback('bbb');}, // 요청 실패.
          complete: function(data) {callback('ccc');} // 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
      });

      // $.post('http://localhost:3000/naverAPI', null, function(data) {
      //   callback(data);
      // }, 'json')
      // .done(function(data) {
      //   callback('bbb');
      // })
      // .fail(function(data) {
      //   callback(data);
      // })
      // .always(function(data) {
      //   callback('ddd');
      // });
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
