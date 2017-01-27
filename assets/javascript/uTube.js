
  var videoId = "";
  
  function playVideo(vid) {
      // This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      tag.id = "video-player";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      videoId = vid;
    }

      //This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {  
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: videoId,  
          events: {
            'onReady': onPlayerReady,
            // 'onStateChange': onPlayerStateChange
          }
        });
      }

      //The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }


      function stopVideo() {
        player.stopVideo();
      }

