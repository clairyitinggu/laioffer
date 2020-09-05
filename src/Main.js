import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Form from "./components/Form";
import Tracking from "./components/Tracking";

class Main extends Component {
  getLogin = () => {
    return this.props.isLoggedIn ? (
      <Redirect to="/dashboard" />
    ) : (
      <Login handleLoginSucceed={this.props.handleLoginSucceed} />
    );
  };
  getDashboard = () => {
    return this.props.isLoggedIn ? <Dashboard /> : <Redirect to="/login" />;
  };
  getTracking = () => {
    if (this.props.isLoggedIn) {
      return (
        <div className="OrderPageBackground">
          <div style={{ height: "50px" }}></div>
          <Tracking />
        </div>
      );
    }
    return <Redirect to="/login" />;
  };
  getForm = () => {
    if (this.props.isLoggedIn) {
      return (
        <div className="OrderPageBackground">
          <div style={{ height: "50px" }}></div>
          <Form />
        </div>
      );
    }
    return <Redirect to="/login" />;
  };
  getRegister = () => {
    return this.props.isLoggedIn ? <Redirect to="/dashboard" /> : <Register />;
  };
  render() {
    return (
      <div>
        <Switch>
          <Route path="/tracking" render={this.getTracking} />
          <Route path="/form/1" render={this.getForm} />
          <Route path="/register" component={this.getRegister} />
          <Route path="/login" render={this.getLogin} />
          <Route path="/dashboard" render={this.getDashboard} />
          <Route exact path="/" component={this.getRegister} />
        </Switch>
      </div>
    );
  }
}
export default Main;
