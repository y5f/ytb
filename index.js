const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const ffmpeg = require('fluent-ffmpeg');
const ytdl = require('ytdl-core');
const tr = require('transliteration');
const getArtistTitle = require('get-artist-title');
const search = require('youtube-search');
const youtubedl = require('youtube-dl');
const unirest = require('unirest');
const fs = require('fs');
const request = require('request');
const {spawn, exec} = require('child_process');
const crypto = require("crypto");
const url = require('url');
const https = require('https');

// keys  to youtube v3/videos
const keyArr = [

    "AIzaSyDhtDMjNxjl_Jmjxw8db7ZGnaL1KOjtv34",
    "AIzaSyAaVxe2e6AbU3FD2pKTQh1_AySRHC1NY8I",
    "AIzaSyDM42M_KmFEhN2WFfxcOLhJ86YTIpgA7LQ",
    "AIzaSyDoS_qhQR97ByR0LuQ2lldJDV_D1d_o0Gk",
    "AIzaSyCq1_7w-7R6MfyNXtWiBIPGgt6KcbXnz_g",
    "AIzaSyC7aYwBE5SKgfxtULedECsvWS1XUnVxt0s",
    "AIzaSyA0aF76NYjOPYoWRAEAyR0hILhuwJX02yg",
    "AIzaSyCYmjZq41rF116rjklxGxtCodu-V-ofHHE",
    "AIzaSyBh_JlpZ8qsVTt8tKZtBOo4xIxDuaBMNxA",
    "AIzaSyA2RKf0KgwmbeReYByRgoIL6nPqFF4QW7U",
    "AIzaSyDQ6qEKx_bdDtG9XvZ5Rlx9eQKShf7rCGo",
    "AIzaSyD-jMHm5u3tDrP8c0OmQngX0fxiD3tqS2w"];
	


//var l = require("lyric-get");
const insta_video = require('./routes/insta_video');


 
var opts = {
  maxResults: 50,
  part:'snippet',
  type:'video',
  key: 'AIzaSyD-jMHm5u3tDrP8c0OmQngX0fxiD3tqS2w',
  videoLicense:'creativeCommon'
};

express()

  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

  .get('/', (req, res) => {
	  
		 //res.render("pages/index");
		 res.redirect('https://www.mp3juices.cc/');
		})
		
		
  .get('/free', (req, res) => {
			 
			 res.render("pages/index");
			
			})
			
  .get('/fastvid', (req, res) => {
	  
		 //res.render("pages/index1");
		 res.redirect('https://www.mp3juices.cc/');
		})			
			
		
				
		
  .get('/send', (req, res) => {
		 
		 
		  var admob = {
				 
		    "show" :"true",
			"ratin" : "false",  
            "inter" : "ca-app-pub-1803788924731708/9292454360"
				 
			 }
			 
		 res.json({  admob });
		
		})

  .get('/youness', (req, res) => {
		 
		 
		  var admob = {
				 
		    "show" :"false",
			"ratin" : "true",  
            //"inter" : "ca-app-pub-1803788924731708/8537475540",
			//"banner":"ca-app-pub-1803788924731708/1485105744"
				 
			 }
			 
		 res.json({  admob });
		
		})

	.get('/lwe7ch', (req, res) => {
			 
			 
			  var admob = {
					 
				"show" :"false", 
				"inter" : "ca-app-pub-4944377810346092/3182888691",
				"banner": "ca-app-pub-4944377810346092/5273208871",
				"versionName":"1.7",
				"ratin" : "true", 
				"switch":"0",
				"block": "false",
				"cpa" : "",
				"countries":[
				
				"RU",
				"IN",
				//"CA",
				"US",
				//"DE",
				//"FR",
				"SN",
				"AE",
				"TR",
				"ZA",
				"NG",
				"KE",
				"IL",
				"NZ",
				"TH",
				"CN",
				"HK",
				"MY",
				"PH",
				"JP",
				"KR",
				"SG",
				"AU",
				"TW",
				"NL",
				"SK",
				"BE",
				"HU",
				"IE",
				"PT",
				"GB",
				"ES",
				"IT",
				"CZ",
				"AT",
				"PL",
				"HR",
				"MX",
				"FI"]
				

				 }
				 
			 res.json({  admob });
			
			})			

  .get('/dl/:id', (req, res) => {

		    res.header("Access-Control-Allow-Origin","*");
		    res.header("Access-Control-Allow-Headers","Origin,Accept,Content-Type");
		    res.header("Access-Control-Allow-Methods","GET");


		    var id=req.params.id;
			unirest.get("https://uploadbeta.com/api/video/?cached&hash=4afaab9d3b704f28fdab31b88f1cf2a5&video=https://www.youtube.com/watch?v=" + id)
			 .end(function(response){
				 
				 		  request("https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=" + "AIzaSyA2RKf0KgwmbeReYByRgoIL6nPqFF4QW7U" + "&part=snippet", function(err, response2, body){
							  
							 var title;
							 try {
									title = JSON.parse(body).items[0].snippet.title; 
									title = tr.slugify(title);
								
							 } catch(err) {
											title = crypto.randomBytes(12).toString('hex');
										  }
							  res.setHeader('content-type', 'audio/mpeg');	 
							  res.setHeader('content-disposition', 'attachment; filename=' + title+'.mp3');
							  
							  
							  proc = new ffmpeg({source:request(response.body.url)});
							  proc.setFfmpegPath('/app/vendor/ffmpeg/ffmpeg');
							  
							  proc.on('end', function() {
							 console.log('finished');
							  });


							  proc.on('error',function (error) {
									console.log(error);
							  }); 

							  proc.withAudioCodec('libmp3lame')
							  .toFormat('mp3')
							  .output(res)
							  .run();
							  
							});			  
										  
										  
						  });
             })

  	/*.get('/vid/:id', (req, res) => {

		    res.header("Access-Control-Allow-Origin","*");
		    res.header("Access-Control-Allow-Headers","Origin,Accept,Content-Type");
		    res.header("Access-Control-Allow-Methods","GET");
			

			res.setHeader('content-type', 'video/*');	 
			

			try {
				
				
				 var id=req.params.id;
				 var filestream = youtubedl('http://www.youtube.com/watch?v='+id, ['--ignore-errors','--force-ipv4']);
			
			
			
			    filestream.on('info', function(info) {
				var size = info.size;
				var title = tr.slugify(info.title);
				res.setHeader('content-disposition', 'attachment; filename=' + title + '.mp4' );
				res.header("Content-Length",size);
				
				filestream.pipe(res);
				
			  });
				
				
				
			}
			catch(error) {
				
				console.log("########################### ERROR #######################################");
				res.send();
			}
			
 

     })*/
	 
	 .get('/quality/:id', (req, res) => {
		 
			 var id=req.params.id;
			 var url = youtubedl('http://www.youtube.com/watch?v='+id);
		 
		 
			  
				
				res.setHeader('content-type', 'video/*');	
 				res.setHeader('content-disposition', 'attachment; filename='  + 'test.mp4' );
 				request(url).pipe(res);
				
				
		 
		
			  
		  
	 })
			 
	 	

  	.get('/artist/:name', (req, res) => {

		    res.header("Access-Control-Allow-Origin","*");
		    res.header("Access-Control-Allow-Headers","Origin,Accept,Content-Type");
		    res.header("Access-Control-Allow-Methods","GET");

		    
			res.json( getArtistTitle(req.params.name) );



		})

  	.get('/query/:q',function(req,res) {
		
		let q = req.params.q;
		search_query(0);
		
		function search_query(key) {
			
			opts.key = keyArr[key];
			
			search(q, opts, function(err, results) {
				
				if(err) return search_query(key+1);

				var r = results.map( (item)=> { return {id:item.id, title:item.title, img:item.thumbnails.default.url} } );
				res.json(r);


			});
			
		}
		
  		

  	})

  	.get('/trend',function(req,res) {

  		search('NoCopyrightSounds', opts, function(err, results) {
  		if(err) return console.log(err);


  		var r = results.map( (item)=> { return {id:item.id, title:item.title, img:item.thumbnails.default.url} } );
  		res.json(r);


  		});

  	})
	
	.get('/vid2/:id',function(req,res) {
		
			  
	  res.setHeader('content-type','video/*');
	  requestTitle(0);
	  
	  function requestTitle(keyIndex) {
		  
		  console.log("#KEY " + keyIndex);
		  
		  
		  request("https://www.googleapis.com/youtube/v3/videos?id=" + req.params.id + "&key=" + keyArr[keyIndex%12] + "&part=snippet", function(err, response, body){
			  
			  var json_body = JSON.parse(body);
			  if(json_body.error && keyIndex!= 11 ) {
				  return requestTitle(keyIndex + 1);				  
			  }
			 
			 var title;
			 try {
					title = JSON.parse(body).items[0].snippet.title; 
					title = tr.slugify(title) + ".mp4";
				
			 } catch(err) {
							title = crypto.randomBytes(12).toString('hex') + ".mp4";
						  }
						  
			 res.setHeader('content-disposition', 'attachment;filename=' + title);
			 
			 unirest.get("https://uploadbeta.com/api/video/?cached&hash=4afaab9d3b704f28fdab31b88f1cf2a5&video=https://www.youtube.com/watch?v=" + req.params.id)
			 .end(function(response){
				request(response.body.url).pipe(res);
			});
			 
		  });
	  
	 }


		/*let id = req.params.id;	
		

		let youtube_dl_url_child = exec("youtube-dl --get-filename --simulate -f mp4 -o '%(title)s.%(ext)s' --get-url https://www.youtube.com/watch?v=" + id, function(err, stdout, stderr){
			
				let response = (stdout.toString()).split("\n");
				
				let youtube_dl_url = response[0];
				let youtube_title = tr.slugify(response[1]);
				
				res.json(youtube_title);

				res.setHeader('content-type','video/*');
				res.setHeader('content-disposition', 'attachment;filename=' + youtube_title + ".mp4");
				request({url: youtube_dl_url}).pipe(res);


		});*/


  	}).get('/instagram/video', insta_video)
	
	.get('/vid3/:id',function(req,res) {


		let id = req.params.id;	
		
		unirest.get("https://getvideo.p.mashape.com/?url=https://www.youtube.com/watch?v=" + id)
		.header("X-RapidAPI-Key", "911ed3ac83mshd81b5bb0ff3e8d7p1faaddjsn68409a9e279c")
		.header("Accept", "text/plain")
		.end(function (result) {
			

		  var sasa = JSON.parse(result.body);	
		  console.log("########status : " + sasa.status);
		  console.log("########MESSAGE : " + sasa.message);

		  //const mp4s = vid.streams.filter(s => s.extension == "mp4" && s.format_note != 'video only, no audio' );
		  const mp4 = sasa.streams[0];
		  
		  
		  var title = tr.slugify(sasa.title);
		  res.setHeader('content-disposition', 'attachment; filename=' + title + '.mp4' );
		  res.header("Content-Length",mp4.filesize);
 		  
		  
		  //res.header("Access-Control-Allow-Methods","GET");
		  res.setHeader('content-type', 'video/*');	
		  request(mp4.url).pipe(res);
		   
		  
		  
		});

  	})
	

/*.get('/vid/:id',function(req,res) {


		let id = req.params.id;	
		var url_vid = "http://www.youtube.com/watch?v=" + id;
		var vid;

		ytdl.getInfo(url_vid, function(err,info) {
			
			console.log("#########" + err);
			
			
			var title = tr.slugify(info.title);
			var formats = info.formats.filter(function(format){ return format.container == 'mp4' && (format.resolution !="1080p") });
			
			vid = formats[0];

			//console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
			//console.log(vid.resolution);
			//console.log(title);
			//console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");


			//if(formats.size ==1)
			//	vid = formats[0];
			//else {
			//	if( formats[0].resolution =="720p" )
			//		vid = formats[0];
			//	else
			//		vid = formats[1];
			//}

			var parsed = url.parse(vid.url);
			parsed.method = 'HEAD'; // We only want headers to get the filesize
			https.request(parsed, function(response) {
				
				var size = response.headers['content-length'];

				res.setHeader('content-disposition', 'attachment; filename=' + title + '.mp4' );
				res.header("Content-Length", size);  
				res.setHeader('content-type', 'video/*');
				ytdl.downloadFromInfo(info, { vid }).pipe(res);


			}).end();







		});

		//
		//
		//
		//;	

		//ytdl(url, {filter:function(format){return format.container === 'mp4'} }).pipe(res);
	})*/
		
	/*.get('/vid/:id',function(req,res) {
		
		var url_vid = "http://www.youtube.com/watch?v=" + req.params.id;
		ytdl(url_vid).on('info', (info) => {
			
			
				
			var title = tr.slugify(info.title);
			var formats = info.formats.filter(function(format){ return format.container == 'mp4' && (format.resolution !="1080p") });
			vid = formats[0];
			var parsed = url.parse(vid.url);
			parsed.method = 'HEAD'; // We only want headers to get the filesize
			https.request(parsed, function(response) {	
				var size = response.headers['content-length'];
				res.setHeader('content-disposition', 'attachment; filename=' + title + '.mp4' );
				res.header("Content-Length", size);  
				res.setHeader('content-type', 'video/*');
				
				ytdl.downloadFromInfo(info, { vid }).pipe(res);
		  
		  
			}).end();
		})	
		
	})*/
	

	// allvids app
  .get('/vid/:id', function(req, res){
	  
	  
	  res.setHeader('content-type','video/*');
	  requestTitle(0);
	  
	  function requestTitle(keyIndex) {
		  
		  console.log("#KEY " + keyIndex);
		  
		  
		  request("https://www.googleapis.com/youtube/v3/videos?id=" + req.params.id + "&key=" + keyArr[keyIndex%12] + "&part=snippet", function(err, response, body){
			  
			  var json_body = JSON.parse(body);
			  if(json_body.error && keyIndex!= 11 ) {
				  return requestTitle(keyIndex + 1);				  
			  }
			 
			 var title;
			 try {
					title = JSON.parse(body).items[0].snippet.title; 
					title = tr.slugify(title) + ".mp4";
				
			 } catch(err) {
							title = crypto.randomBytes(12).toString('hex') + ".mp4";
						  }
						  
			 res.setHeader('content-disposition', 'attachment;filename=' + title);
			 
			 unirest.get("https://isvbscriptdead.com/api/video/?cached&hash=4afaab9d3b704f28fdab31b88f1cf2a5&video=https://www.youtube.com/watch?v=" + req.params.id)
			 .end(function(response){
				 
				request(response.body.url).pipe(res);
			});
			 
		  });
	  
	 }
  })
  
  .get('/allvids/:id', function(req, res){
	  
	  
	  res.setHeader('content-type','video/*');
	  requestTitle(0);
	  
	  function requestTitle(keyIndex) {
		  
		  
		  
		  request("https://www.googleapis.com/youtube/v3/videos?id=" + req.params.id + "&key=" + keyArr[keyIndex%12] + "&part=snippet", function(err, response, body){
			  
			  var json_body = JSON.parse(body);
			  if(json_body.error && keyIndex!= 11 ) {
				  return requestTitle(keyIndex + 1);				  
			  }
			 
			 var title;
			 try {
					title = JSON.parse(body).items[0].snippet.title; 
					title = tr.slugify(title) + ".mp4";
				
			 } catch(err) {
							title = crypto.randomBytes(12).toString('hex') + ".mp4";
						  }
						  
			 res.setHeader('content-disposition', 'attachment;filename=' + title);
			 
			 unirest.get("https://isvbscriptdead.com/api/video/?cached&hash=4afaab9d3b704f28fdab31b88f1cf2a5&video=https://www.youtube.com/watch?v=" + req.params.id)
			 .end(function(response){
				request(response.body.url).pipe(res);
			});
			 
		  });
	  
	 }
  })
  
  .get("/url/:id", function(req,res) {
	  
	  unirest.get("https://isvbscriptdead.com/api/video/?cached&hash=4afaab9d3b704f28fdab31b88f1cf2a5&video=https://www.youtube.com/watch?v=" + req.params.id)
			 .end(function(response){
				res.json({url:response.body.url});
			});
  })
  
  /*.get("/allvidsurl/:id", function(req,res) {
	  
	  requestTitle(0);
	  
	  function requestTitle(keyIndex) {
		  
		  request("https://www.googleapis.com/youtube/v3/videos?id=" + req.params.id + "&key=" + keyArr[keyIndex%12] + "&part=snippet", function(err, response, body){
			  
			  var json_body = JSON.parse(body);
			  if(json_body.error && keyIndex!= 11 ) {
				  return requestTitle(keyIndex + 1);				  
			  }
			 
			 var title;
			 try {
					title = JSON.parse(body).items[0].snippet.title; 
					title = tr.slugify(title);
				
			 } catch(err) {
							title = crypto.randomBytes(12).toString('hex');
						  }
						  
			// begin comment 
			 unirest.get("https://isvbscriptdead.com/api/video/?cached&hash=4afaab9d3b704f28fdab31b88f1cf2a5&video=https://www.youtube.com/watch?v=" + req.params.id)
			 .end(function(response){
				 var code = response.statusCode;
				 if(code == 200) {
					 console.log("########### A : " + code);
					 res.json({url:response.body.url, title:title});
				 } else {
						console.log("########### B : " + code);
						unirest.get("https://uploadbeta.com/api/video/?cached&hash=4afaab9d3b704f28fdab31b88f1cf2a5&video=https://www.youtube.com/watch?v=" + req.params.id)
						.end(function(response2){
							res.json({url:response2.body.url, title:title});
						});

				 }
				
			}); end comment//
			let id = req.params.id;
			let youtube_dl_url_child = exec("youtube-dl -g --get-filename -f mp4 -o '%(title)s.%(ext)s' --get-url https://www.youtube.com/watch?v=" + id, function(err, stdout, stderr){
			
				
				let response = (stdout.toString()).split("\n")[0];
				//console.log('@@@@@@@@@'+ response);
				
				//let youtube_dl_url = response[0];
				//let youtube_title = tr.slugify(response[1]);
				
				res.json({url: response, title:title});


		})
			 
		  });
	  
	 }
  })*/
  
   .get("/allvidsurl/:id", function(req,res) {
	   
	     	 var id = req.params.id;
			 request('http://a75121dd.ngrok.io/allvidsurl/' + id, { json: true }, function(err, response, body){
				res.json(body);
			 });
   })
  

  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
