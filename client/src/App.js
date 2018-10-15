import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import Header from "./components/layout/Header";
import Register from "./components/auth/Register";
import LoginAuth from "./components/auth/LoginAuth";
import LoginConfirmed from "./components/auth/LoginConfirmed";
import Confirmation from "./components/auth/Confirmation";
import Dashboard from "./components/auth/Dashboard";

if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
    };
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Register} />
            {/* <Route
              exact
              path="/login"
              component={Login}
              onChange={this.props.onChange}
            /> */}
            <Route exact path="/loginauth" component={LoginAuth} />
            <Route
              exact
              path="/loginconfirmed"
              component={LoginConfirmed}
              data={this.state.data}
            />
            <Route path="/confirmation/:token" component={Confirmation} />
            <Route path="/dashboard" component={Dashboard} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
