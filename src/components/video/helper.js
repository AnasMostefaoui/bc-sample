/**
 * Pauses all brightcove videos currently playing except the latest clicked one.
 *
 * @param {String} id  player id.
 * @param {Object} element object.
 * @returns {Boolean}
 */
 export const pauseVideos = ( id, element ) => {

	console.log('check pause since player : ', id)
	if ( ! id || ! element || typeof element.getElementsByClassName !== 'function' ) {
		return null
	}

	// eslint-disable-next-line no-undef
	if ( typeof bc === 'undefined' ) {
		return null;
	}

	// eslint-disable-next-line no-undef
	const videos = element.getElementsByClassName( 'video-js' );
	for ( const videoElement of videos ) {
		// eslint-disable-next-line no-undef
		const player = bc.videojs.getPlayer( videoElement )
		if ( player && player.id() !== id ) {
			// pause the video
			player.pause();
		} else {
			console.log('on player itself')
		}
	}
	return true;
}

/**
 * Determines if a video should autoplay for mobile and desktop.
 *
 * @param {Boolean} isMobile    True if the browser is mobile.
 * @param {Boolean} shouldAutoPlayMobile  If the video should autoplay on mobile devices / viewports.
 * @param {Boolean} shouldAutoPlayDesktop If the video should autoplay on desktop devices / viewports.
 * @returns {Boolean}
 */
export const shouldAutoPlay = ( isMobile, shouldAutoPlayMobile, shouldAutoPlayDesktop ) => {
	if ( typeof isMobile === 'undefined' || typeof shouldAutoPlayMobile === 'undefined' || typeof shouldAutoPlayDesktop === 'undefined' ) {
		return null
	}

	return isMobile ? shouldAutoPlayMobile : shouldAutoPlayDesktop;
}
