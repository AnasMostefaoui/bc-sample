import VideoPlayer from './components/videoCard'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/about">
            <NextPage/>
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
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
export default App;
