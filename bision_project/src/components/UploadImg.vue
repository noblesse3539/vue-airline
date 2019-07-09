<template>
  <div>
    <input type="file" value="이미지 선택" name="file"/>
    <button @click="uploadImg">업로드</button>
  </div>
</template>

<script>

export default {
  name: 'UploadImg',
  methods: {
    uploadImg: function(file){
      var https = require('https');

    var options = {
      'method': 'POST',
      'hostname': 'api.imgur.com',
      'path': '/3/image',
      'headers': {
        'Authorization': 'Client-ID 6def70bd30a2e6a'
      }
    };

    var req = https.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });

      res.on("error", function (error) {
        console.error(error);
      });
    });

    var postData = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"image\"\r\n\r\nR0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--";

    req.setHeader('content-type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');

    req.write(postData);
    console.log(res.data.link)
    req.end();
    }
  }
}
</script>

<style>
</style>
