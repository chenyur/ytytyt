var audio = new Audio();

function focus() 
{
  var input = document.getElementById('box');
  input.focus();
}

function loadMusic()
{
  focus();

  var XHR = new XMLHttpRequest();
  XHR.open("GET", "/version", true);
  XHR.addEventListener('load', makeMusic);
  XHR.send();
}

function autorun()
{
  focus();
}

function makeMusic() {
  var data = JSON.parse(this.responseText);
  songname = "/public/audio" + data + ".mp3";
  setTimeout(() => {
    audio.pause();
    audio.src = songname;
    if (typeof audio.loop == 'boolean')
    {
      audio.loop = true;
    }
    else
    {
      audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
      }, false);
    }

    audio.play();
    }, 1000); //delay to avoid error 416!!!
}

if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;

new Vue({
  el: '#box',
  methods: {
    onSubmit: function(e)
    {
     if(e) e.preventDefault();
     var query = document.getElementById("box").value;
     document.getElementById("box").value = "";
     var XHR = new XMLHttpRequest();
     XHR.open("GET", "/song?songinfo=" + query, true);
     XHR.addEventListener('load', () => 
     {
      console.log(XHR.responseText);
      document.getElementById("box").value = XHR.responseText;
    });

     XHR.send();
     loadMusic();
   },

   onClick: function(e)
   {
      document.getElementById("box").value = "";
   }
 }
});