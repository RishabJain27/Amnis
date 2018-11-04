import React from 'react';
import YouTube from 'react-youtube';
 
export default class Example extends React.Component {
  render() {
    const opts = {
      height: '500',
      width: '700',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
 
    return (
      <YouTube
        videoId="YMu_NFrzCuE"
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
