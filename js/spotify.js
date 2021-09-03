
// Get current spotify status & song
var i = 0;
function getTrack() {
    $.ajax({
        url: "https://api.lanyard.rest/v1/users/862047177689792522",
        type: 'GET',
        success: function(res) {
            console.log(res.data.spotify);
            var spotifyStatus = res.data.spotify;

            if (spotifyStatus == null) {
                document.getElementById("status").innerHTML = "Offline";
                document.getElementById("status").style = "color: rgba(255, 82, 82, 1)";
                document.getElementById("blob").className = "blob red";
            } else {
                var songLink = res.data.spotify.track_id;

                document.getElementById("blob").className = "blob green";
                document.getElementById("status").innerHTML = "<a href='https://open.spotify.com/track/" + songLink + "' target='_blank'>Listening to Spotify</a>";
            }
        }
    });
    i++;
    setTimeout(getTrack, 10000);
}
getTrack();