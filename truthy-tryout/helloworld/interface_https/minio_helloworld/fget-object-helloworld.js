// https://min.io/docs/minio/linux/developers/javascript/minio-javascript.html
// https://github.com/minio/minio-js/blob/master/examples/fget-object.js

const process = require('process');
const Minio = require('minio');

// Instantiate the minio client with the endpoint
// and access keys as shown below.
const minioClient = new Minio.Client({
  endPoint: '127.0.0.1',
  port: 9000,
  useSSL: false,
  accessKeyId: '4neo90gMD9l2Vyh3',
  secretAccessKey: 'LeVxMNCaFn8YmvyTAH6GiBP4MnyCuCwa',
});

// File that needs to be uploaded.
var file = '/home/logic/_workspace/nestjs-playlist/truthy-tryout/helloworld/interface_https/minio_helloworld/helloworld.jpg'


var metaData = {
    'Content-Type': 'application/octet-stream',
    'X-Amz-Meta-Testing': 1234,
    "hello":"world",
    "restaurant":"louislabs restaurant"
}

// Make a bucket called europetrip.
minioClient.fGetObject('helloworld-bucket', 'helloworld.jpg', '/tmp/objfile.jpg', function(e) {
  if (e) {
    return console.log(e)
  }
  console.log('done')
})
