import React from "react";
import { MainContextProvider } from "./contexts/MainContext";

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dash from "./pages/Dash";
import AuthComponent from "./services/AuthComponent";

const App = () => {
  return (
    <div className="App">
      <MainContextProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
          </Switch>
          <Switch>
            <Route exact path="/signup">
              <Signup />
            </Route>
          </Switch>
          <Switch>
            <Route exact path="/dash">
              <AuthComponent>

                <Dash />
              </AuthComponent>
            </Route>
          </Switch>
        </Router>
      </MainContextProvider>
    </div>
  );
};

export default App;
