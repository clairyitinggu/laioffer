import React,{Component} from "react";
import {
    MDBContainer,
    MDBCol,
    MDBBtn,
    MDBAnimation,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBInput,
    MDBView, MDBMask
} from 'mdbreact';
import {Link} from "react-router-dom";
import LearnMore from "./LearnMore";
import axios from "axios";


class Login extends Component {
    constructor(){
        super ();
        this.state = {
            name:"",
            password:""
        };
    }

    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
    };

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sendForm = () => {
        axios.post('http://3.129.204.140/laioffer/login', {
                username: this.state.username,
                password: this.state.password,
             })
            .then(response => {
                console.log('login -->', response)
                this.props.handleLoginSucceed(response.data.token)
            })
            .catch(error => {
                console.log('err in fetch history -> ', error);
            })
    }

    render(){
        return (
            <MDBView>
                <MDBMask className="justify-content-center align-items-center gradient" />
                <div>
                    <MDBContainer
                        style={{ height: "100%", width: "100%", paddingTop: "10rem" }}
                        className="mt-5  d-flex justify-content-center align-items-center"
                    >
                        <LearnMore />
                        <MDBCol md="6" xl="5" className="mb-4c">
                            <MDBAnimation type="fadeInRight" delay=".3s" className="card-on-right-register">
                                <MDBCard id="classic-card">
                                    <MDBCardBody className="white-text">
                                        <h3 className="text-center white-text">
                                            <MDBIcon icon="user" /> Log In:
                                        </h3>
                                        <hr className="hr-light" />
                                        <MDBInput
                                            label="Your name"
                                            icon="user"
                                            group
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right"
                                            name="username"
                                            value={this.state.username}
                                            onInput={this.handleInput}
                                            className="white-text "
                                            iconClass="white-text"
                                        />
                                        <MDBInput
                                            label="Your password"
                                            icon="lock"
                                            group
                                            type="password"
                                            validate
                                            error="wrong"
                                            success="right"
                                            name="password"
                                            value={this.state.password}
                                            onInput={this.handleInput}
                                            className="white-text "
                                            iconClass="white-text"
                                        />
                                        <div className="text-center mt-4 black-text">
                                            <MDBBtn color="indigo" gradient="purple" rounded onClick={this.sendForm} type="submit">
                                                Sign In
                                            </MDBBtn>

                                            <Link className="white-text" to="/register">Or register now!</Link>



                                            <hr className="hr-light" />
                                            <div className="text-center d-flex justify-content-center white-label">
                                                <a href="#!" className="p-2 m-2">
                                                    <MDBIcon
                                                        fab
                                                        icon="twitter"
                                                        className="white-text"
                                                    />
                                                </a>
                                                <a href="#!" className="p-2 m-2">
                                                    <MDBIcon
                                                        fab
                                                        icon="linkedin"
                                                        className="white-text"
                                                    />
                                                </a>
                                                <a href="#!" className="p-2 m-2">
                                                    <MDBIcon
                                                        fab
                                                        icon="instagram"
                                                        className="white-text"
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBAnimation>
                        </MDBCol>
                    </MDBContainer>
                </div>
            </MDBView>


        );

    }

}

export default Login;