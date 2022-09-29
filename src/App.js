import React from "react";
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <Dashboard />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route>
            <Error path="*" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
