import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBAnimation,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBInput,
    MDBView, MDBMask
} from 'mdbreact';
import Register from './Register';
import Login from "./Login";
import Dashboard from "./Dashboard";
import LearnMore from "./LearnMore";
import Form from "./components/Form"
import Tracking from "./components/Tracking";

class Main extends Component {
    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to="/dashboard"/> : <Login handleLoginSucceed={this.props.handleLoginSucceed}/>;
    }
    getDashboard = () => {
        return this.props.isLoggedIn ? <Dashboard/> : <Redirect to="/login"/>
    }
    render() {
        return (
            <div>
                <div className="OrderPageBackground">
                   <div style={{height: '50px'}}></div>
                    <Route path="/tracking" component={Tracking}/>
                    <Route path="/form/1" component={Form}/>
                </div>
                <Switch>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" render = {this.getLogin}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route exact path="/" component={Register}/>
                    <Route render={(this.getLogin())}/>
                </Switch>
            </div>
        );
    }
}
export default Main;