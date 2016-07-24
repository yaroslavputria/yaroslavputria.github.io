// function randomInteger(min, max) {
// 	var rand = min + Math.random() * (max - min)
// 	rand = Math.round(rand);
// 	return rand;
// };

// var arrOfStats = {};//not an array
// for (var i = 0; i < 3; i++) {
// 	for (var j = 0; j < 3; j++) {
// 		for (var k = 0; k < 3; k++) {
// 			for (var l = 0; l < 3; l++) {
// 				var tmpIndex = "rps" + i + j + k + l;
// 				arrOfStats[tmpIndex] = { 0:randomInteger(0,1), 1:randomInteger(0,1), 2:randomInteger(0,1) };
// 			};
// 		};
// 	};
// };

// var jsonArrOfStats = JSON.stringify(arrOfStats);
// console.log(jsonArrOfStats);


var objWithStats = require('./node_modules/rpsModule');
var JSONObjOfStats = JSON.stringify(objWithStats.objStats);
console.log(typeof JSONObjOfStats);


var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var server = http.createServer();

server.on('request', function(req, res){
	// console.log(req.method, req.url);
	
	var urlParsed = url.parse(req.url, true);

	//console.log(urlParsed);
	// if (urlParsed.pathname == '/echo'){
    //res.end(objOfStats);//http://127.0.0.1:1337/echo?message=Hello
     // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
//console.log(req.headers, res._headers);
    	res.end(JSONObjOfStats);
    	console.log("JSONObjOfStats was sent");
    	// console.log(res);
    // fs.readFile('./node_modules/rpsModule/jsonStats.json', function(err, info){
    // 	if(err){
    // 		console.error(err);
    // 		res.statusCode = 500;
    // 		res.end("error on server!");
    // 		return;
    // 	} else {
    // 		res.statusCode = 200;
    // 		res.setHeader('Content-Type',  "; charset=utf-8");
    // 		res.end(objOfStats);
    // 		console.log("it's alive!!!!!!!");
    // 	};
    // });
  //   fs.writeFile("file.tmp", objOfStats, function(err) {
  //   	if (err) throw err;


  //   });
  // } else{
  // 	res.statusCode = 404;
  // 	res.end("Page not found");
  // }
  //  if (!checkAccess(req)) {
  //       res.statusCode = 403;
  //       res.end("Tell me the secret to access!");
  //       return;
  //   }

  //   sendFileSafe(url.parse(req.url).pathname, res);
//}
});
server.listen(1337, '127.0.0.1');

// function checkAccess(req) {
//     return url.parse(req.url, true).query.secret == 'o_O';
// }

// function sendFileSafe(filePath, res) {//декодування url

//     try {
//         filePath = decodeURIComponent(filePath); // %D1%8F = я
//     } catch(e) {
//         res.statusCode = 400;
//         res.end("Wrong Request");
//         return;
//     }

//     if (~filePath.indexOf('\0')) {//перевірка розкодованого url на перший байт, якого не має бути
//         res.statusCode = 400;
//         res.end("Wrong Request");
//         return;
//     }

//     //  /deep/nodejs.jpg ->  /Users/learn/node/path/public/deep/nodejs.jpg
//     filePath = path.normalize(path.join(ROOT, filePath));//отримати повний шлях до файлу на диску

//     if (filePath.indexOf(ROOT) != 0) {//перевірка на "префікс" файла - чи знаходиться файл у дозволеній дерикторії
//         res.statusCode = 404;
//         res.end("File not found");
//         return;
//     }

//     fs.stat(filePath, function(err, stats) {//перевіряємо що лежить по даному шляху
//         if (err || !stats.isFile()) {
//             res.statusCode = 404;
//             res.end("File not found");
//             return;
//         }

//         sendFile(filePath, res);//відсилаємо файл
//     });
// }

// function sendFile(filePath, res) {

//     fs.readFile(filePath, function(err, content) {
//         if (err) throw err;

//         var mime = require('mime').lookup(filePath); // npm install mime
//         res.setHeader('Content-Type', mime + "; charset=utf-8"); // text/html image/jpeg
//         res.end(content);
//     });

// }