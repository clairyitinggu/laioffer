import React, {Component} from 'react';
import { Switch, Route} from 'react-router-dom';

import Register from './Register';
import Login from "./Login";
import Dashboard from "./Dashboard";
import Form from "./components/Form"
import Tracking from "./components/Tracking";

class Main extends Component {
    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to="/dashboard"/> : <Login handleLoginSucceed={this.props.handleLoginSucceed}/>;
    }
    getDashboard = () => {
        return this.props.isLoggedIn ? <Dashboard/> : <Redirect to="/login"/>
    }
    getTracking = () => {
        return this.props.isLoggedIn ? <Tracking/> : <Redirect to="/login"/>
    }
    getForm = () => {
        return this.props.isLoggedIn ? <Form/> : <Redirect to="/login"/>
    }
    render() {
        return (
            <div>
                <div className="OrderPageBackground">
                   <div style={{height: '50px'}}></div>
                    <Route path="/tracking" render = {this.getTracking}/>
                    <Route path="/form/1" render = {this.getForm}/>
                </div>
                <Switch>
                    {/*<Route path="/tracking" render = {this.getTracking}/>*/}
                    {/*<Route path="/form/1" render = {this.getForm}/>*/}
                    <Route path="/register" component={Register}/>
                    <Route path="/login" render = {this.getLogin}/>
                    <Route path="/dashboard" render={this.getDashboard}/>
                    <Route exact path="/" component={Register}/>
                    {/*<Route render={(this.getLogin())}/>*/}
                </Switch>
            </div>
        );
    }
}
export default Main;