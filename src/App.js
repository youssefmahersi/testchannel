import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Toolbar from "./components/Toolbar/Toolbar";
import Signup from "./containers/Signup/Signup";
import Login from "./containers/Login/Login";
function App() {
  return (
    <div className="App">
       <Toolbar/>
      <Switch>
      <Route path="/signup" component={Signup} />
      <Route path="/" component={Login} />

      </Switch>
     
    </div>
  );
}

export default App;
