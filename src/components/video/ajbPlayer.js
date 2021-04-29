import './styles.scss'

import React from 'react'
import ReactPlayerLoader from '@brightcove/react-player-loader'
import { pauseVideos } from '../../shared/video-helper'

/**
 * Video player wrapper with a consistent set of data available to feed Brightcove.
 *
 * @param {String} className      Class(es) to apply to player wrapper.
 * @param {String} videoId        ID if the video to play.
 * @param {String} videoAccountId ID of the account to use, if any.
 * @param {String} videoPlayerId  ID of the player to use, if any.
 * @param {Boolean} autoPlayDesktop Whether the player should start in autoplay, on desktop devices
 * @param {Boolean} autoPlayMobile Whether the player should start in autoplay, on mobile devices
 * @param {Boolean} autoPlayMuted Whether the player should be muted (if it is set to autoplay)
 */
class VideoPlayer extends React.PureComponent {
    constructor(props) {
        super(props)
        this.onSuccess = this.onSuccess.bind(this)

        this.state = {
            isClient: false,
            isMobile: false,
        }
    }

    componentDidMount() {
        if (!window) {
            // Component is being rendered on the server
            return
        } else {
            // Component is being rendered on the client
            this.setState({ isClient: true })
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
    onSuccess = (success) => {
        const {
            autoPlayDesktop,
            autoPlayMobile,
            autoPlayMuted,
            forcePlay,
        } = this.props
        const { isClient, isMobile } = this.state

        const videoPlayer = success.ref
        videoPlayer.reset()

        // Return early if not videoPlayer.isReady_
        if (!videoPlayer.isReady_) {
            return
        }

        // Set timeout to fake user interaction
        setTimeout(function () {}, 20)

        const playPromise = () => {
            let promise = videoPlayer.play()
            if (promise !== undefined) {
                promise.then((_) => {}).catch((error) => {})
            }
        }

        if (this.props) {
            const { onPlay } = this.props
            videoPlayer.on('play', (e) => {
                pauseVideos(e.target.id, document)
                if (typeof onPlay === 'function') {
                    onPlay()
                }
            })
        }

        if (forcePlay) {
            playPromise()
            return
        }

        const autoPlayEvents = ['loadedmetadata', 'durationchange']

        const isMobileScreen = isClient && isMobile

        // Conditionally autoplay the video, with sound conditionally muted, based on props
        videoPlayer.on(autoPlayEvents, () => {
            if (
                (isMobileScreen && autoPlayMobile) ||
                (!isMobileScreen && autoPlayDesktop)
            ) {
                playPromise()
                videoPlayer.muted(autoPlayMuted)
            }
        })
    }

    render() {
        const {
            videoId,
            videoAccountId,
            videoPlayerId,
            featuredImageURL,
        } = this.props

        let posterOptions = {}
        if (featuredImageURL) {
            const resize = '532%2C300'
            posterOptions = { poster: `${featuredImageURL}?resize=${resize}` }
        }

        const playerData = {
			accountId: videoAccountId,
			playerId: videoPlayerId,
			videoId: videoId,
			options: posterOptions,
		};
        
        return (
            <ReactPlayerLoader
                attrs={{
                    className: 'aj-video-player',
                }}
                {...playerData}
                onSuccess={this.onSuccess}
                onFailure={this.props.onFailure}
            />
        )
    }
}

VideoPlayer.defaultProps = {
    autoPlayDesktop: false,
    autoPlayMobile: false,
    autoPlayMuted: false,
    featuredImageURL: null,
}

export default VideoPlayer