var param = "source=ko&target=en&text=안녕하세요.";
var request = new XMLHttpRequest();
request.onreadystatechange= function () {
    if (request.readyState==4) {
        //handle response
        callback(this.responseText);
    }
}
request.open("POST", "https://openapi.naver.com/v1/papago/n2mt", true);
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
request.setRequestHeader('X-Naver-Client-Id', 'yS5a2J6nsWX8IlsYkBEy');
request.setRequestHeader('X-Naver-Client-Secret', 'BpbDCX8R9M');
request.send(param);
