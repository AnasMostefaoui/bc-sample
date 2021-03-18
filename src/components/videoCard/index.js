import React from 'react';
import VideoPlayer from '../video/player';
import Icon from '../icons';
import { Link } from 'react-router-dom';

import './styles.scss';


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
	}

	/**
	 * We would like custom controls to disappear after click, this mimics original AJA behavior
	 * This is a one-off interaction, user can't "go back" to initial UI after playing is started
	 */
	setInteracted(){
		if ( this.state.isPlayerClicked ){
			return;
		}
		this.setState( {
			isPlayerClicked: true,
			showVideo: true,
		} )
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
					<img src={`${featuredImage}?resize=730%2C410`} alt="alt" style={
						{
							width:"100%",
						}
					}/>
				</div>
			)
		}
		return null;
	}

	render() {
		const { videoId, featuredImage, title } = this.props;
		const { isPlayerClicked } = this.state;
		const playerClasses = ! isPlayerClicked ? 'video-shadow': '';
		return ( <article className={ 'article-card article-card--big article-card--video article-card--with-brand-bar' }>
			{
				<div className="article-card__image-wrap">
					<div className={ playerClasses }
						onClick={ () =>
							! isPlayerClicked && this.setInteracted()
						}>
						{ this.renderVideoPlayer( videoId, featuredImage ) }
					</div>
				</div>
			}

			<div className="article-card__content-wrap">
				<h3 className="article-card__title">
					<Link to="/about">{ title } -- click here to navigate </Link>
				</h3>
			</div>

		</article> )
	}
}

export default CardVideo;
