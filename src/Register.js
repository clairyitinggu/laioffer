import React, {Component} from 'react';
import {MDBAnimation,MDBContainer,MDBView,MDBMask, MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBIcon, MDBInput} from "mdbreact";
import {Link} from "react-router-dom";
import LearnMore from "./LearnMore";

class Register extends Component {
    constructor(){
        super ();
        this.state = {
            username:"",
            email:"",
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
        fetch('http://3.129.204.140/laioffer/register', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .catch(err => console.log("can't register"));
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
                    <form className="needs-validation" onSubmit={this.submitHandler}>
                        <MDBAnimation type="fadeInRight" delay=".3s" className="card-on-right-register">
                            <MDBCard id="classic-card">
                                <MDBCardBody className="white-text">
                                    <h3 className="text-center white-text">
                                        <MDBIcon icon="user" /> Register:
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
                                        label="Your email"
                                        icon="envelope"
                                        group
                                        type="email"
                                        validate
                                        error="wrong"
                                        success="right"
                                        name="email"
                                        value={this.state.email}
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
                                            Sign Up
                                        </MDBBtn>

                                        <Link className="white-text"  to="/login">Or login now</Link>


                                        <hr className="hr-light" />
                                        <div className="text-center d-flex justify-content-center white-label">
                                            <a href="#" className="p-2 m-2">
                                                <MDBIcon
                                                    fab
                                                    icon="twitter"
                                                    className="white-text"
                                                />
                                            </a>
                                            <a href="#" className="p-2 m-2">
                                                <MDBIcon
                                                    fab
                                                    icon="linkedin"
                                                    className="white-text"
                                                />
                                            </a>
                                            <a href="#" className="p-2 m-2">
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
                    </form>
                </MDBCol>
            </MDBContainer>
        </div>
    </MDBView>
);

}
}

export default Register;