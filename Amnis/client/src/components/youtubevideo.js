//Creates component to display live video lecture
import React from 'react';
import YouTube from 'react-youtube';
 
export default class YoutubeVideo extends React.Component {
  render() {
    const opts = {
      height: '500',
      width: '750',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
 
    return (
      <YouTube
        videoId="V2Afni3S-ok"
        opts={opts}
        onReady={this._onReady}
      />
    );
  }
 
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}