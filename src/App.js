import React from "react";

// import react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import style, bootstrap
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// import components
import PublicNavbar from "./components/PublicNavbar";

// import pages
import HomePage from "./pages/HomePage";
import MovieDetail from "./pages/MovieDetail";
import CurrentPlaying from "./pages/CurrentPlaying";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <Router>
      <PublicNavbar />
      <h1 className="text-center">IMDb App</h1>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/detail" component={MovieDetail} />
        <Route exact path="/current" component={CurrentPlaying} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
