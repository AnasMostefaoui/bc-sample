
/**
 * Create and output a normalized SVG icon.
 */

import React from 'react';
import './styles.scss';

/**
 * Icon markup definitions.
 */
export const icons = {
    'play': <path className="icon-main-color" d="M0 10a10 10 0 1 1 10 10A10 10 0 0 1 0 10zm7.92 4.27a.48.48 0 0 0 .23-.07L14 10.35a.42.42 0 0 0 0-.7L8.15 5.8a.42.42 0 0 0-.43 0 .4.4 0 0 0-.22.36v7.7a.4.4 0 0 0 .22.36.36.36 0 0 0 .2.05z" />,
	'play-inverse': <path className="icon-main-color" d="M.81 10A9.19 9.19 0 1 0 10 .81 9.2 9.2 0 0 0 .81 10zM0 10a10 10 0 1 1 10 10A10 10 0 0 1 0 10zm7.92 3.86L13.76 10 7.92 6.14v7.7zm0 .81a.73.73 0 0 1-.39-.1.82.82 0 0 1-.44-.72v-7.7a.83.83 0 0 1 .43-.72.81.81 0 0 1 .85 0l5.83 3.88a.84.84 0 0 1 .37.69.82.82 0 0 1-.37.69l-5.83 3.85a.79.79 0 0 1-.45.13z" />,
};

/**
 * Available color names for an icon.
 */
export const colors = [
	'white',
];

/**
 * Available sizes for an icon.
 */
export const sizes = [
	64,
];

/**
 * SVG output for individual SVG icons.
 *
 * @param {String}   className Optional. CSS classes to add to the icon.
 * @param {String}   color     Optional. Color style for icon class. One of colors array above. Defaults to black.
 * @param {String}   name      SVG identifier
 * @param {Number}   size      Optional. Size of the icon. Available sizes 12, 16, 24, 29, 32, 48, 64
 * @param {String}   title     Optional. Accessibility-ready text for title tag.
 * @param {Function} onClick   Optional. Click event to happen upon clicking of icon.
 * @param {String}   viewBox   Optional. Viewbox value for svg icon.
 */
const Icon = ( { className, color, name, size, title, onClick, viewBox } ) => {
	if ( typeof viewBox === 'undefined' || ! viewBox ) {
		viewBox = '0 0 20 20';
	}

	if ( typeof title === 'undefined' ) {
		title = name;
	}

	return ( <svg className={ `icon icon--${ name } icon--${ color } icon--${ size } ${ className }` } viewBox={ viewBox } version="1.1" aria-hidden="true" onClick={ onClick }>
		{ title ? <title>{ title }</title> : null }
		{ name in icons ? icons[ name ] : null }
	</svg> );
};

export default Icon;
