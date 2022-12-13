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


var size = 0;

// // Make a bucket called europetrip.
// minioClient.getObject('helloworld-bucket', 'avatar', (e, dataStream) => {
//   if (e)  console.log(e)

//   dataStream.on('data', function(chunk) {     size += chunk.length   })
//   dataStream.on('end', function() {     console.log("End. Total size = " + size)   })
//   dataStream.on('error', function(e) {     console.log(e)   })
// })

// Make a bucket called europetrip.
minioClient.getObject('helloworldbucket', 'test/path/avatar', (e, dataStream) => {
  if (e)  console.log(e)

  dataStream.on('data', function(chunk) {    size += chunk.length  })
  dataStream.on('end', function() {     console.log("End. Total size = " + size)  })
  dataStream.on('error', function(e) {     console.log(e)   })
})
