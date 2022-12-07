// https://min.io/docs/minio/linux/developers/javascript/minio-javascript.html
// https://min.io/docs/minio/linux/developers/javascript/minio-javascript.html

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

minioClient.fPutObject('helloworldbucket', 'avatar', file, metaData, (err, etag) => {
  if (err) return console.log(err)

  console.log(JSON.stringify(etag))

  console.log('File uploaded successfully.')

});
