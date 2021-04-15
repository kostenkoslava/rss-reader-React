import './App.css';
import TopBar from './components/TopBar/TopBar';
import { Route, BrowserRouter } from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import FeedsPage from './components/FeedsPage/FeedsPage';
function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <TopBar />
        <Route path='/home' render={() => <HomePage state={props.state} dispatch={props.dispatch}
        setSelectedFeed={props.setSelectedFeed}/>} />
        <Route path='/feeds' render={() => <FeedsPage feed={props.state.feed} dispatch={props.dispatch}/>} />
      </BrowserRouter>
    </div>
  );
}

export default App;
