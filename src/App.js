import VideoPlayer from './components/videoCard'
import BrightcovePlayer from './components/video/livePlayer'
import BrightcovePlayerAJB from './components/video/livePlayer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Fragment } from 'react';


document.addEventListener( 'beforepluginsetup', () => {
  console.log('something')
})

function App() {
  return (
    <Fragment>
      <Router>

      <Link to="/">Home</Link>
        <br/>
        <Link to="/live">Live Broken player - AJB</Link>
        <br/>
        <Link to="/ajelive">Live Broken player - AJE</Link>
        <br/>
        <Link to="/ajbLive">Live Working player - AJB</Link>
        <br/>
        <Link to="/about">About</Link>
          <Switch>
            <Route exact path="/" component={ HomePage }/>
            <Route path="/live" component={ LivePage } />
            <Route path="/ajelive" component={ LiveAJEPage } />
            <Route path="/ajbLive" component={ LiveAJBPage } />
            <Route path="/about" component={ NextPage }/>
          </Switch>
      </Router>
      <div>


      </div>
    </Fragment>
  );
}

const NextPage = () => {
  return (
    <div className="next">
      about.
      <Link to="/">Home</Link>
    </div>
  )
}
const HomePage = () => {
  console.log('home')
  return (
    <div className="container container--grid">
        <div className="l-col l-col--8">
            <VideoPlayer 
              featuredImage="https://www.aljazeera.com/wp-content/uploads/2021/03/image-4.jpg"
              title="video 1"
              videoId="6233935406001"/>

            <VideoPlayer 
              featuredImage="https://www.aljazeera.com/wp-content/uploads/2021/03/image-3.jpg"
              title="video 1"
              videoId="6233957284001"/>
          </div>
          <div className="l-col l-col--4 container--ads-vertical-stretch"/>
    </div> 
  )
}

const LivePage = () => {
  console.log('live')
  return (
    <div className="container container--grid">
        <div className="l-col l-col--8">
          Hello live
          <BrightcovePlayer
            videoAccountId="911432371001"
            videoId="6031747102001"
            videoPlayerId="bCuQF5l6Z"
            autoPlayDesktop={ true }
            autoPlayMobile={ true }
            autoPlayMuted={ true }/>
          </div>
    </div> 
  )
}
const LiveAJEPage = () => {
  console.log('aje live')
  return (
    <div className="container container--grid">
        <div className="l-col l-col--8">
          Hello AJE live
          <BrightcovePlayer
            videoAccountId="665003303001"
            videoId="5467349513001"
            videoPlayerId="6t4wpW2MCb"
            autoPlayDesktop={ true }
            autoPlayMobile={ true }
            autoPlayMuted={ true }/>
          </div>
    </div> 
  )
}
const LiveAJBPage = () => {
  console.log('ajb live')
  return (
    <div className="container container--grid">
        <div className="l-col l-col--8">
          Hello AJB live
          <BrightcovePlayerAJB
            videoAccountId="911432371001"
            videoId="6031747102001"
            videoPlayerId="bCuQF5l6Z"
            autoPlayDesktop={ true }
            autoPlayMobile={ true }
            autoPlayMuted={ true }/>
          </div>
    </div> 
  )
}
export default App;
