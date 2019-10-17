var express = require('express');
var router = express.Router();



const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');


/* GET home page. */
router.get('/',function (req,res) {

    res.render('index');

});

router.get('/dl/:id', function(req, res, next) {
    var id=req.params.id;


    var filestream = ytdl('http://www.youtube.com/watch?v='+id);

    ytdl.getInfo(id, function(err,info) {

       var title = JSON.stringify(info.title);

      res.setHeader('Content-disposition', 'attachment; filename=' + title+'.mp3');
      res.setHeader('Content-type', 'audio/mpeg');

      proc = new ffmpeg({source:filestream});
      proc.setFfmpegPath('/app/vendor/bin/ffmpeg');


      proc.withAudioCodec('libmp3lame')
          .toFormat('mp3')
          .output(res)
          .run();


      proc.on('end', function() {
        console.log('finished');
      });

      proc.on('error',function () {
        console.log('canceled');
      })

  })







});

module.exports = router;
