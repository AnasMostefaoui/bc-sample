import React from 'react';
import ReactPlayerLoader from '@brightcove/react-player-loader';
// import { pauseVideos, shouldAutoPlay } from './helper';
import './styles.scss';


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
			videoPlayer.play();
		}

		// If there are multiple brightcove players on the page,
		// Ensure that only the most recently started player is playing
		videoPlayer.on( 'play', e => {
			// pauseVideos( e.target.id, document );
			if ( this.props && typeof this.props.onPlay === 'function' ) {
				this.props.onPlay()
			}
		} );
		videoPlayer.on( 'ima3-started', () => { 
			console.log('ads started')
			window.google.ima = null
		} )
		videoPlayer.on( 'ads-ad-ended', () => { 
			console.log('ads ended')
			window.google.ima = null
		} )

		videoPlayer.on( 'dispose', () => {
			window.google.ima = null
		} )
		playPromise();
	};

	render() {
		const { className, videoId, featuredImageURL, accountId, playerId } = this.props;
		if ( ! videoId ) {
			return null;
		}
		let posterOptions = {};
		if ( featuredImageURL ) {
			const resize = '961%2C540'
			posterOptions =   { 'poster': `${ featuredImageURL }?resize=${resize}` }
		}

		const playerData = {
			accountId: accountId ?? "665003303001",
			playerId: playerId ?? '6t4wpW2MCb',
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
				onEmbedCreated={ (params, embed) => {
					// window.bc[`${playerData.playerId}_default`] = ( embed, options) => {

					// 	console.log( 'alter bc')
					// 	// eslint-disable-next-line no-undef
					// 	const player = bc(embed, options); 
					// 	console.log( 'alter bc')
					// 	player.on( 'beforepluginsetup', () => console.log( 'beforepluginsetup called') )
					// 	return player;
					// }

				}}
			/>
		)
	}
}

export default VideoPlayer;
