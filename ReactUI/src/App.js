import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Statistics from './components/pages/Statistics';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import Settings from './components/pages/Settings';


function App() {

  const [username, setusername] = useState(localStorage.getItem("username"))


  function getuser () {
    if (localStorage.getItem("username") == undefined) {
      localStorage.setItem("username", "guest")
      localStorage.setItem('sensiy', 1)
      localStorage.setItem('sensix', 1)
      localStorage.setItem('FOV', 80)
    }
  }
  getuser()

  return (
    <>
      <Router>
        <Navbar username={username}/>
        <Switch>
          <Route path="/settings" component={Settings} />
          <Route path="/statistics" component={Statistics} />
          <Route path="/sign-up" setusername={setusername} component={SignUp}/>
          <Route path="/sign-in" setusername={setusername} component={SignIn}/>
          <Route path='/' exact component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
