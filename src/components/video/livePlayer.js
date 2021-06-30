import React from 'react';
import ReactPlayerLoader from '@brightcove/react-player-loader';
import { pauseVideos, shouldAutoPlay } from './helper';
import './styles.scss';

class VideoPlayer extends React.Component {

	constructor( props ) {
		super( props );
		this.onSuccess = this.onSuccess.bind( this );

		this.state = {
			isMobile: false,
			videoShouldAutoPlay: false,
		}
	}

	componentDidMount() {
		const { autoPlayDesktop, autoPlayMobile } = this.props;
		if ( ! window ) {
			// Component is being rendered on the server
			// I'm passing false because I know we're not on client, so we can't be in mobile
			const videoShouldAutoPlay = shouldAutoPlay( false, autoPlayMobile, autoPlayDesktop );
			this.setState( { videoShouldAutoPlay } );
		} else {
			// Component is being rendered on the client
			// I'm passing the value of isMobile because I know we're in client
			const videoShouldAutoPlay = shouldAutoPlay( this.state.isMobile, autoPlayMobile, autoPlayDesktop );
			this.setState( { videoShouldAutoPlay } );
		}
	}

	/**
	 * When Brightcove has finished loading, we need to re-trigger the player.
	 *
	 * If we don't perform this step, it appears that the player tech is disposed
	 * before the player is ready which throws an error and kills the player.
	 *
	 * @param success
	 */
	onSuccess = success => {
		const { forcePlay } = this.props;
		const videoPlayer = success.ref;
		videoPlayer.reset();

		// Return early if not videoPlayer.isReady_
		if ( ! videoPlayer.isReady_ ) {
			return;
		}

		const playPromise = () => {
            let promise = videoPlayer.play()
            if (promise !== undefined) {
                promise.then((_) => {}).catch((error) => {})
            }
        }

		videoPlayer.muted(true)
		// If there are multiple brightcove players on the page,
		// Ensure that only the most recently started player is playing
		videoPlayer.on( 'play', e => {
			pauseVideos( e.target.id, document );
		} );

		if ( forcePlay ){
			console.log('force playing?');
			playPromise()
			videoPlayer.mute( true )
			return;
		}

		const autoPlayEvents = [ 'loadedmetadata', 'durationchange' ];

		// Conditionally autoplay the video, with sound conditionally muted, based on props
		videoPlayer.on( autoPlayEvents, () => {
			if ( this.state.videoShouldAutoPlay ) {
				console.log('muting on');
				videoPlayer.muted( true );
				videoPlayer.play();
			}
		} )

	};

	render() {
		const { videoId, videoAccountId, videoPlayerId, featuredImageURL } = this.props;
		if ( ! videoId || ! videoAccountId || ! videoPlayerId ) {
			return null;
		}
		let posterOptions = {};
		if ( featuredImageURL ) {
			const resize = '532%2C300'
			posterOptions =   { 'poster': `${ featuredImageURL }?resize=${resize}` }
		}

		const playerData = {
			accountId: videoAccountId,
			playerId: videoPlayerId,
			videoId: videoId,
			options: posterOptions,
		};

		return (
			<ReactPlayerLoader
				attrs={ {
					className: 'aj-video-player',
				} }
				{ ...playerData }
				onSuccess={ this.onSuccess }
				onFailure= { this.props.onFailure }
			/>
		)
	}
}

export default VideoPlayer;
