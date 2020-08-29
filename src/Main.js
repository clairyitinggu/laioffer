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


class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/form/1" component={Form}/>
                <Switch>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route exact path="/" component={Register}/>
                </Switch>
            </div>
        );
    }
}
export default Main;