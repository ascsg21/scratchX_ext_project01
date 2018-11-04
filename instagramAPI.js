
(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.getInstagramCount = function(callback) {
      $.ajax({
          url: 'https://api.instagram.com/v1/users/5962103573', // 요청 할 주소
          dataType: 'jsonp',
          async: false, // false 일 경우 동기 요청으로 변경
          type: 'GET', // GET, PUT
          data: {
              access_token: '5962103573.b8b156a.486b029280854504bdded1976661bc58'
          }, // 전송할 데이터
          // beforeSend: function(data) {callback('aaa');}, // 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
          success: function(data) {
            // for( x in data.data ){
        		// 	$('ul').append('<li><img src="'+data.data[x].images.low_resolution.url+'"></li>'); // data.data[x].images.low_resolution.url - URL of image, 306х306
        		// 	// data.data[x].images.thumbnail.url - URL of image 150х150
        		// 	// data.data[x].images.standard_resolution.url - URL of image 612х612
        		// 	// data.data[x].link - Instagram post URL
        		// }
            var str = '유저네임 : ' + data.data.username + '   ' + 'follows : ' + data.data.counts.follows + '  ' + 'followed by : ' + data.data.counts.followed_by
            callback(str);
            // callback('aaa');
          }, // 요청 완료 시
          error: function(data) {callback('bbb');}, // 요청 실패.
          complete: function(data) {callback('ccc');} // 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
      });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name, param1 default value, param2 default value
            ['R', '인스타그램 정보가져오기', 'getInstagramCount']
        ],
        displayName: 'Instagram Couter Info Example'
    };

    // Register the extension
    ScratchExtensions.register('Instagram Couter Info Example', descriptor, ext);
})({});
