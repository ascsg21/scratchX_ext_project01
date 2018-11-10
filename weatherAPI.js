
(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.getWeatherInfo = function(callback) {
      $.ajax({
          url: 'https://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?serviceKey=bSwxY6%2BRfdZpm0fw5Rv7FaMIThxkOASoSdEW1lNi%2FNIeFZau%2Bql2WXoHwPQ%2FK%2BrnHn%2Fj1PkzwMUHP%2FbJaGw4sw%3D%3D&base_date=20181104&base_time=0500&nx=58&ny=124&_type=json', // 요청 할 주소
          dataType: 'jsonp',
          async: false, // false 일 경우 동기 요청으로 변경
          type: 'GET', // GET, PUT
          // data: {
          //     ServiceKey: 'bSwxY6%2BRfdZpm0fw5Rv7FaMIThxkOASoSdEW1lNi%2FNIeFZau%2Bql2WXoHwPQ%2FK%2BrnHn%2Fj1PkzwMUHP%2FbJaGw4sw%3D%3D',
          //     base_date: '20181104',
          //     base_time: '0500',
          //     nx: 58,
          //     ny: 124,
          //     _type: 'json'
          // }, // 전송할 데이터
          // beforeSend: function(data) {callback('aaa');}, // 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
          success: function(data) {
            // for( x in data.data ){
        		// 	$('ul').append('<li><img src="'+data.data[x].images.low_resolution.url+'"></li>'); // data.data[x].images.low_resolution.url - URL of image, 306х306
        		// 	// data.data[x].images.thumbnail.url - URL of image 150х150
        		// 	// data.data[x].images.standard_resolution.url - URL of image 612х612
        		// 	// data.data[x].link - Instagram post URL
        		// }
            var str = data.response.header.resultCode
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
            ['R', '날씨예보', 'getWeatherInfo']
        ],
        displayName: 'Weather Info'
    };

    // Register the extension
    ScratchExtensions.register('Weather Info', descriptor, ext);
})({});
