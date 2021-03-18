import React from 'react';
import ReactPlayerLoader from '@brightcove/react-player-loader';
// import { pauseVideos, shouldAutoPlay } from '../../shared/video-helper';
import './styles.scss';

/**
 * Video player wrapper with a consistent set of data available to feed Brightcove.
 *
 * @param {String} className      Class(es) to apply to player wrapper.
 * @param {String} videoId        ID if the video to play.
 * @param {String} videoAccountId ID of the account to use, if any.
 * @param {String} videoPlayerId  ID of the player to use, if any.
 * @param {String} label  label for GA events to use, if any.
 * @param {Boolean} autoPlayDesktop Whether the player should start in autoplay, on desktop devices
 * @param {Boolean} autoPlayMobile Whether the player should start in autoplay, on mobile devices
 * @param {Boolean} autoPlayMuted Whether the player should be muted (if it is set to autoplay)
 */
class VideoPlayer extends React.Component {

	constructor( props ) {
		super( props );
		this.onSuccess = this.onSuccess.bind( this );
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
		const videoPlayer = success.ref;
		videoPlayer.reset();

		// Return early if not videoPlayer.isReady_
		if ( ! videoPlayer.isReady_ ) {
			return;
		}

		// Set timeout to fake user interaction
		setTimeout( function () {
		}, 20 )

		const playPromise = () => {
			let promise = videoPlayer.play();
			if ( promise !== undefined ) {
				promise.then( _ => {
				} )
					.catch( error => {
					} );
			}
		}

		// If there are multiple brightcove players on the page,
		// Ensure that only the most recently started player is playing
		videoPlayer.on( 'play', e => {
			// pauseVideos( e.target.id, document );
			if ( this.props && typeof this.props.onPlay === 'function' ) {
				this.props.onPlay()
			}
		} );

		videoPlayer.on( 'pause', () => {
		} )

		if ( true ){
			playPromise();
			return;
		}
	};

	render() {
		const { className, videoId, featuredImageURL } = this.props;
		if ( ! videoId ) {
			return null;
		}
		let posterOptions = {};
		if ( featuredImageURL ) {
			const resize = '961%2C540'
			posterOptions =   { 'poster': `${ featuredImageURL }?resize=${resize}` }
		}

		const playerData = {
			accountId: "665003303001",
			playerId: '6t4wpW2MCb',
			videoId: videoId,
			options: posterOptions,
		};
		
		return (
			<ReactPlayerLoader
				attrs={ {
					className: className+ ` aj-video-player`,
				} }
				{ ...playerData }
				onSuccess={ this.onSuccess }
				onFailure= { this.props.onFailure }
			/>
		)
	}
}

VideoPlayer.defaultProps = {
	autoPlayDesktop: false,
	autoPlayMobile: false,
	autoPlayMuted: false,
	featuredImageURL: null,
};

export default VideoPlayer;
