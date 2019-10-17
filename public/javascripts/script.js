$("#conv").hide();

$("#navMenu").resize(function () {
    $('#godown').height($("#navMenu").height());
});

if ($("#navMenu").height() > $('#godown').height()) {

    $('#godown').height($("#navMenu").height());
}







var player,
    time_update_interval = 0;


var firstTime=true;

function onYouTubeIframeAPIReady() {

           if(firstTime) {


               

              //$('#play').attr('src','../images/pause_b.png');
               player = new YT.Player('player', {

                   videoId: 'JW5meKfy3fY',
                   events: {
                       'onReady': initialize
                   }
               });
           }

           


}

 
 function loadVideo(id) {

    if(player) player.loadVideoById(id);
    return false;
      }

function stopVideo() {
        player.stopVideo();
      }


function initialize(event){

    firstTime = false;

    //firstTime=false;
    event.target.playVideo();


    


    // Update the controls on load
    updateTimerDisplay();
    updateProgressBar();

    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval(function () {
        updateTimerDisplay();
        updateProgressBar();
    }, 1000);


    $('#volume-input').val(Math.round(player.getVolume()));
}


// This function is called by initialize()
function updateTimerDisplay(){
    // Update current time text display.
    $('#current-time').text(formatTime( player.getCurrentTime() ));
    $('#duration').text(formatTime( player.getDuration() ));
}


// This function is called by initialize()
function updateProgressBar(){
    // Update the value of our progress bar accordingly.
    $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
}


// Progress bar

$('#progress-bar').on('mouseup touchend', function (e) {

    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    var newTime = player.getDuration() * (e.target.value / 100);

    // Skip video to new time.
    player.seekTo(newTime);

});




$(document).on('click','.play',function (ev) {


    ev.preventDefault();


    $('#play').attr('src','images/pause_b.png');

    $('#player').attr('id','');
    
    var id=$(this).attr('class').split(' ')[1];
    $('#'+id).attr('id','player');
    var id=$(this).attr('class').split(' ')[2];

     

        loadVideo(id);
         //onYouTubeIframeAPIReady(id);
 
   
         //$("#player")[0].src += "&autoplay=1";
    

    


});

// Playback

var switcher=true;
$('#play').on('click', function () {



    if(switcher){
        $('#play').attr('src','images/play_b.png');
        player.pauseVideo();
        switcher=false;
    }

    else{
        $('#play').attr('src','images/pause_b.png');

        player.playVideo();
        switcher=true;

    }



});





// Sound volume


$('#mute-toggle').on('click', function() {
    var mute_toggle = $(this);

    if(player.isMuted()){
        player.unMute();
        mute_toggle.attr('src','images/volume_b.png');
    }
    else{
        player.mute();
        mute_toggle.attr('src','images/muet_b.png');
    }
});

$('#volume-input').on('change', function () {
    player.setVolume($(this).val());
});


// Other options


$('#speed').on('change', function () {
    player.setPlaybackRate($(this).val());
});

$('#quality').on('change', function () {
    player.setPlaybackQuality($(this).val());
});


// Playlist

$('#next').on('click', function () {
    player.nextVideo()
});

$('#prev').on('click', function () {
    player.previousVideo()
});


// Load video

$('.thumbnail').on('click', function () {

    var url = $(this).attr('data-video-id');

    player.cueVideoById(url);

});


// Helper Functions

function formatTime(time){
    time = Math.round(time);

    var minutes = Math.floor(time / 60),
        seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}


$('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
});



// request to download audio mp3
/*$('body').on('click','.flip', function() {

	 var id=$(this).attr('class').split(' ')[1];

        $.ajax({
            url: 'dl',
            type: 'GET',
            contentType: 'application/json',
            success: function (result) {
                alert(result);
            }
        });


 });*/

$("#myframe").click(function(){

$(".panel").slideUp("slow");
$("#conv").hide();

    
});

 
 
 
 
