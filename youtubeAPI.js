
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

      // $.ajax({
      //     url: 'https://www.googleapis.com/youtube/v3/channels?part=id,snippet,brandingSettings,contentDetails,invideoPromotion,statistics,topicDetails&id=UCWs0WvjYOKdDmpW4At3hSag', // 요청 할 주소
      //     dataType: 'jsonp',
      //     async: false, // false 일 경우 동기 요청으로 변경
      //     type: 'GET', // GET, PUT
      //     // data: {
      //     //     part: 'id,snippet,contentDetails',
      //     //     channelId: 'UCWs0WvjYOKdDmpW4At3hSag'
      //     // }, // 전송할 데이터
      //     // beforeSend: function(data) {callback('aaa');}, // 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
      //     success: function(data) {
      //       // for( x in data.data ){
      //   		// 	$('ul').append('<li><img src="'+data.data[x].images.low_resolution.url+'"></li>'); // data.data[x].images.low_resolution.url - URL of image, 306х306
      //   		// 	// data.data[x].images.thumbnail.url - URL of image 150х150
      //   		// 	// data.data[x].images.standard_resolution.url - URL of image 612х612
      //   		// 	// data.data[x].link - Instagram post URL
      //   		// }
      //       // var str = 'viewCount : ' + data.videos.statistics.viewCount + ' ' + 'likeCount : ' + data.videos.statistics.likeCount;
      //       // $.each(data.videos, function(index, value) {
      //       //   callback(value.statistics.viewCount);
      //       // })
      //
      //       // var str = '';
      //       // for(var tmp in data){
      //       //   callback(str);
      //       //     str += data[tmp];
      //       // }
      //       // var obj = JSON.parse(str);
      //       // callback(data.data.items[0].statistics.viewCount);
      //       $.each(data.items, function( i, item ) {
      //         callback(item.statistics.viewCount);
      //       })
      //       // callback('aaa');
      //     }, // 요청 완료 시
      //     error: function(data) {callback('bbb');}, // 요청 실패.
      //     complete: function(data) {callback('ccc');} // 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
      // });
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
