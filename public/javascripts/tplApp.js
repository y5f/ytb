



window.onload = function () { 

   var arrKey=["AIzaSyDoS_qhQR97ByR0LuQ2lldJDV_D1d_o0Gk",
        "AIzaSyCq1_7w-7R6MfyNXtWiBIPGgt6KcbXnz_g",
        "AIzaSyC7aYwBE5SKgfxtULedECsvWS1XUnVxt0s",
        "AIzaSyA0aF76NYjOPYoWRAEAyR0hILhuwJX02yg",
        "AIzaSyCYmjZq41rF116rjklxGxtCodu-V-ofHHE",
        "AIzaSyDhtDMjNxjl_Jmjxw8db7ZGnaL1KOjtv34",
            "AIzaSyBh_JlpZ8qsVTt8tKZtBOo4xIxDuaBMNxA",
        "AIzaSyA2RKf0KgwmbeReYByRgoIL6nPqFF4QW7U",
        "AIzaSyDQ6qEKx_bdDtG9XvZ5Rlx9eQKShf7rCGo",
        "AIzaSyD-jMHm5u3tDrP8c0OmQngX0fxiD3tqS2w"];

 init(arrKey[0]);


jQuery("#search").autocomplete({
    
    source: function(request, response) {
        //console.log(request.term);
        
        var sqValue=[];
        jQuery.ajax({

            type: "POST",
            url: "http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1",
            dataType: 'jsonp',
            data: jQuery.extend({
                q: request.term
            }, {}),

            
            success: function(data) {
                
                console.log(data[1]);
                obj=data[1];
                jQuery.each(obj, function(key, value) {
                    sqValue.push(value[0]);
                });
                sqValue.length = 5;
                //response(sqValue);
            }
        });
    }
});


 };


function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}


$(function() {


 
       var arrKey=["AIzaSyDoS_qhQR97ByR0LuQ2lldJDV_D1d_o0Gk",
        "AIzaSyCq1_7w-7R6MfyNXtWiBIPGgt6KcbXnz_g",
        "AIzaSyC7aYwBE5SKgfxtULedECsvWS1XUnVxt0s",
        "AIzaSyA0aF76NYjOPYoWRAEAyR0hILhuwJX02yg",
        "AIzaSyCYmjZq41rF116rjklxGxtCodu-V-ofHHE",
        "AIzaSyDhtDMjNxjl_Jmjxw8db7ZGnaL1KOjtv34",
        "AIzaSyBh_JlpZ8qsVTt8tKZtBOo4xIxDuaBMNxA",
        "AIzaSyA2RKf0KgwmbeReYByRgoIL6nPqFF4QW7U",
        "AIzaSyDQ6qEKx_bdDtG9XvZ5Rlx9eQKShf7rCGo",
        "AIzaSyD-jMHm5u3tDrP8c0OmQngX0fxiD3tqS2w"];  


      var iKey=0;
    
    $("form").on("submit", function(e) {

        e.preventDefault();
        // prepare the request

        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            videoLicense: "creativeCommon",
            //q: $("#search").val() ,
            fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle,nextPageToken',

            q: encodeURIComponent("NoCopyrightSounds" + $("#search").val()),
            maxResults:50,
            //order: "viewCount"
        });
        // execute the request



        request.execute(function(response) {


           

            

            var results = response.result;
            if(results){
            
            $("#results").html("");
            $.each(results.items, function(index, item) {
                $.get("/javascripts/item.html", function(data) {


                    $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId,"num":index}]));

                });
            });
            resetVideoHeight();
 
            }
          else{
                 
                  
                 init(arrKey[(++iKey)%3]);
                 $("form").submit();
 
                //$("#results").html("<h3>Youtube Quota search exceeded, Please Try in few minutes !</h3>");
             }


        });
    });

    setTimeout(function() {    $("form").submit();
    }, 3000);

    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}






function init(key) {
    
    gapi.client.setApiKey(key);
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}




