
// Get current spotify status & song
var i = 0;
function getTrack() {
    $.ajax({
        url: "https://api.lanyard.rest/v1/users/862047177689792522",
        type: 'GET',
        success: function(res) {
            console.log(res.data);
            var spotifyStatus = res.data.spotify;

            // If I'm online but not listening to anything
            var desktopStatus = res.data.active_on_discord_desktop;
            var mobileStatus = res.data.active_on_discord_mobile;
            var webStatus = res.data.active_on_discord_web;

            // If I'm not listening to anything
            if (spotifyStatus == null) {
                if (desktopStatus != null || mobileStatus != null || webStatus != null) {
                    document.getElementById("spotifyButton").style = "display: none";
                    document.getElementById("status").innerHTML = "Online";
                    document.getElementById("status").style = "color: rgba(51, 217, 178, 1)";
                    document.getElementById("blob").className = "blob green";
                } else {
                    document.getElementById("spotifyButton").style = "display: none";
                    document.getElementById("status").innerHTML = "Offline";
                    document.getElementById("status").style = "color: rgba(255, 82, 82, 1)";
                    document.getElementById("blob").className = "blob red";
                }
            // I'm listening to something
            } else {
                var songLink = res.data.spotify.track_id;

                document.getElementById("blob").className = "blob green";
                document.getElementById("status").innerHTML = "<a href='https://open.spotify.com/track/" + songLink + "' target='_blank'>Listening to Spotify</a>";

                // Show Spotify button for mobile only because Group Session is only supported for mobile
                function displaySpotifyButton(windowSize) {
                    if (windowSize.matches) {
                        document.getElementById("spotifyButton").style = "display: block";
                    } else {
                        document.getElementById("spotifyButton").style = "display: none";
                    }
                  }
                  
                var windowSize = window.matchMedia("(max-width: 768px)")
                displaySpotifyButton(windowSize);
                windowSize.addListener(displaySpotifyButton);
            }
        }
    });
    i++;
    setTimeout(getTrack, 10000);
}
getTrack();