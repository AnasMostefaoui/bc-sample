import VideoPlayer from './components/videoCard'
import BrightcovePlayer from './components/video/livePlayer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


document.addEventListener( 'beforepluginsetup', () => {
  console.log('something')
})

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={ HomePage }/>
          <Route path="/live" component={ LivePage } />
          <Route path="/about" component={ NextPage }/>
        </Switch>
    </Router>
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

          <Link to="/live">Live</Link>
          <br/>
          <Link to="/about">about</Link>
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
export default App;
