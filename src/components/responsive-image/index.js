import classnames from 'classnames';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash.sortby';

import './styles.scss';

/**
 * Responsive image element that takes in WP-set sizes.
 * Excluded from sonarQube due to issues writing test coverage for onError
 *
 * @param {String}  alt                    HTML alt attribute for an image.
 * @param {String}  className              Class names to use
 * @param {Array}   sizeNames              Names of crops to use for this particular image.
 * @param {Object}  sources                List of sizes available to responsive image.
 * @param {String}  url                    Full-size original URL for image.
 * @param {Boolean} disableIntrinsicHeight Boolean to disable intrinsic ratio height of responsive image.
 * @param {Boolean} nativeAspectRatio      Allow native aspect ratio instead of forcing a 3/2 aspect ratio
 * @param {Boolean} lazyLoading      	   Allow browser native image lazy loading
 */
const ResponsiveImage = ( {
	alt,
	className,
	sizeNames,
	sources,
	url,
	disableIntrinsicHeight,
	nativeAspectRatio,
	lazyLoading,
} ) => {

	const [ aspectRatio, setAspectRatio ] = useState( 1.3 );

	let sourceLargest, srcSet = [], srcSizes = [];

	const classes = classnames( 'responsive-image', {
		'responsive-image--disableIntrinsicHeight': disableIntrinsicHeight,
		'responsive-image--aspect-ratio-2-3': nativeAspectRatio && aspectRatio < 0.8,
		'responsive-image--aspect-ratio-1': nativeAspectRatio && aspectRatio < 1.1 && aspectRatio > 0.9,
	} );

	// Loading strategy
	const loadingStrategy = lazyLoading ? 'lazy' : 'eager';

	// If sizeNames exists, filter sources by sizeNames we want to use.
	sources = sizeNames
		? sources.filter( source => sizeNames.includes( source.crop ) )
		: sources;

	if ( sources && sources.length ) {
		let keys = [];

		// Remove duplicate width object to avoid srcset duplicate width issue.
		// ref: https://ajdigital.atlassian.net/browse/FANT-3763
		sources = sources.filter( ( el, index ) => {
			if ( keys.indexOf( el.width ) === -1 ) {
				keys.push( el.width );
			}
			return keys.indexOf( el.width ) === index;
		} );

		sourceLargest = sortBy( sources, 'width' )[sources.length - 1]

		url = sourceLargest.url;

		srcSet = sources.map( size => {
			return `${ size.url } ${ size.width }w`
		} );

		srcSizes = sources.map( size => {
			return `(max-width: ${ size.width }px) ${ size.width }px`
		} )

		srcSizes.push( sourceLargest.width + 'px' )
	}

	const handleImageLoaded = image => {
		setAspectRatio( image.naturalWidth / image.naturalHeight )
	}

	return (
		<div className={ classes }>
			<img className={ className  }
				loading={ loadingStrategy }
				src={ url }
				srcSet={ srcSet.join( ', ' ) }
				sizes={ srcSizes.join( ', ' ) }
				alt={ alt }
				onLoad={ i => {
					handleImageLoaded( i.target )
				} }
				// use multi line to simplify debugger access.
				onError={ i => {
					i.target.style.display='none'
				} } />
		</div>
	)
};

ResponsiveImage.defaultProps = {
	disableIntrinsicHeight: false,
	nativeAspectRatio: false,
	lazyLoading: false,
}

ResponsiveImage.propTypes = {
	alt: PropTypes.string,
	className: PropTypes.string,
	sizeNames: PropTypes.array,
	sources: PropTypes.array.isRequired,
	url: PropTypes.string.isRequired,
	disableIntrinsicHeight: PropTypes.bool,
	nativeAspectRatio: PropTypes.bool,
	lazyLoading: PropTypes.bool,
};

export default ResponsiveImage;
