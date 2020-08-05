import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Discover from './components/Discover';
import DiscoverBattle from './components/DiscoverBattle';
import MyList from './components/MyList';
import Popular from './components/Popular';
import PopularBattle from './components/PopularBattle';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <ul className="navbar-nav">
              <li className="nav-item"><Link className="nav-link" to="/">This week</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/discover-battle/">This week battle</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/popular/">Popular</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/popular-battle/">Popular Battle</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/my-list/">My List</Link></li>
            </ul>
          </nav>

          <Switch>
            <Route path="/popular-battle"><PopularBattle /></Route>
            <Route path="/my-list/"><MyList /></Route>
            <Route path="/discover-battle/"><DiscoverBattle /></Route>
            <Route path="/popular/"><Popular /></Route>
            <Route path="/"><Discover /></Route>
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;