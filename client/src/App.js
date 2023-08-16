import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import BuildGalette from "./components/buildGalette";
import ViewGalette from "./components/viewGalette";

import "./styles/style.scss";

const App = () => (
  <main>
    <h1>home</h1>
    <Router>
      <Switch>
        <Route exact path="/build" component={BuildGalette} />
        <Route exact path="/view" component={ViewGalette} />
      </Switch>
    </Router>
  </main>
);

export default App;
