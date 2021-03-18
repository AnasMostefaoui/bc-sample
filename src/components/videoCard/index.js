import classNames from 'classnames';
import React from 'react';
import sanitizeHtml from 'sanitize-html';
import VideoPlayer from '../video/player';
import ResponsiveImage from '../responsive-image';
import Icon from '../icons';

import './styles.scss';

const VideoDurationDisplay = React.forwardRef( ( props, ref ) => {
	const { duration } = props;
	if ( ! duration ) {
		return null;
	}
	return (
		<div ref={ ref } className="video-duration__brand-bar">
			<div className="video-duration__duration">{ duration }</div>
		</div>
	)
} )

const titleHtml = {
	allowedTags: [],
};

/**
 * Summaries used in post listings.
 */
const summaryHtml = {
	allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
	allowedAttributes: {
		'a': [ 'href', 'target' ],
	},
};

/**
 * Video card.
 *
 * @param {Object}  article  Data about an article to display.
 */
class CardVideo extends React.Component {

	constructor( props ){
		super( props );

		this.state = {
			isPlayerClicked: false,
			showVideo: false,
		}
		this.videoDurationContainer = React.createRef();
		this.handleClick = this.handleClick.bind( this );
		this.handleTouch = this.handleTouch.bind( this );
		this.hideDuration = this.hideDuration.bind( this );
	}

	/**
	 * We would like custom controls to disappear after click, this mimics original AJA behavior
	 * This is a one-off interaction, user can't "go back" to initial UI after playing is started
	 */
	setInteracted(){
		if ( this.state.isPlayerClicked ){
			return;
		}
		this.hideDuration()
		this.setState( {
			isPlayerClicked: true,
			showVideo: true,
		} )
	}

	hideDuration() {
		if ( ! this.videoDurationContainer.current ) {
			return;
		}
		this.videoDurationContainer.current.style.display = 'none';
	}

	handleClick(){
		this.setInteracted();
	}

	handleTouch(){
		this.setInteracted();
	}

	renderVideoPlayer( videoId, featuredImage ) {
		if ( this.state.showVideo ) {
			if ( videoId ) {
				return ( <VideoPlayer videoId={ videoId }/> )
			} 
		}
		if ( featuredImage ) {
			return (
				<div className="pre_video-wrapper">
					<button className="pre_video-play-button" type="button" title="تشغيل الفيديو">
						<Icon name="play-inverse" color="white" size={ 64 } />
						<Icon name="play" color="white" size={ 64 } />
					</button>
					<ResponsiveImage
						alt="alt"
						url={ featuredImage }
						sizeNames={ [
							'fantasia-16-9-730',
							'fantasia-16-9-270',
						] }
						ratio={ false }
						sources={ [
							{
								crop:'fantasia-16-9-730',
								height:410,
								url:`${featuredImage}?resize=730%2C410`,
								width:730,
							}
						] }
						lazyLoading={ true }
					/>
				</div>
			)
		}
		return null;
	}

	render() {
		const { videoId, featuredImage, title, excerpt, duration } = this.props;
		const { isPlayerClicked } = this.state;
		const playerClasses = classNames( { 'video-shadow': ! isPlayerClicked } );
		const cardTitle = title
		return ( <article className={ 'article-card article-card--big article-card--video article-card--with-brand-bar' }>
			{
				<div className="article-card__image-wrap">
					<div className={ playerClasses }
						onClick={ () =>
							! isPlayerClicked && this.handleClick()
						}>
						{ this.renderVideoPlayer( videoId, featuredImage ) }
					</div>
					{ ! isPlayerClicked &&
						<VideoDurationDisplay ref={ this.videoDurationContainer } duration={ duration }/>
					}
				</div>
			}

			<div className="article-card__content-wrap">
				<h3 className="article-card__title">
					<span dangerouslySetInnerHTML={ {
							__html: sanitizeHtml( cardTitle, titleHtml ),
						} } />
				</h3>

				<div className="article-card__excerpt">
					<p dangerouslySetInnerHTML={ {
						__html: sanitizeHtml( excerpt, summaryHtml ),
					} } />
				</div>
			</div>

		</article> )
	}
}

export default CardVideo;
