import './App.css';
import axios from 'axios'
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Genres from './Components/Genres';
import Header from './Components/Header';
import About from './Components/About';
import Features from './Components/Features';
import Cart from './Components/Cart';
import Footer from './Components/Footer';






function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Switch>
          <Route exact path = '/'>
            <Header/>
            <Genres/>
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
          <Route exact path = "/features">
            <Features/>
          </Route>
          <Route exact path = "/cart">
            <Cart/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
