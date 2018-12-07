import React from 'react';
import YouTube from 'react-youtube';
import PropTypes from "prop-types";
 
class YoutubeVideo extends React.Component {
  render() {
    const opts = {
      height: '500',
      width: '750',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };
 
    return (
      <YouTube
        videoId={this.props.videoURL}
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

YoutubeVideo.propTypes = {
    videoURL: PropTypes.string.isRequired
};

export default YoutubeVideo;