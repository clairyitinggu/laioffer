import React from "react";
import {MDBContainer, MDBRow, MDBCol, MDBBtn, MDBAnimation, MDBCard, MDBCardBody, MDBIcon, MDBInput} from 'mdbreact';
import {Link, Route} from "react-router-dom";

const Login = () => {
    return (

        <MDBCol md="6" xl="5" className="mb-4c">
            <MDBAnimation type="fadeInRight" delay=".3s" className="card-on-right-register">
                <MDBCard id="classic-card">
                    <MDBCardBody className="white-text">
                        <h3 className="text-center">
                            <MDBIcon icon="user" /> Log In:
                        </h3>
                        <hr className="hr-light" />
                        <MDBInput
                            className="white-text"
                            iconClass="white-text"
                            label="Your name"
                            icon="user"
                        />
                        <MDBInput
                            className="white-text"
                            iconClass="white-text"
                            label="Your password"
                            icon="lock"
                            type="password"
                        />
                        <div className="text-center mt-4 black-text">
                            <MDBBtn color="indigo" gradient="purple" rounded>
                                Sign In
                            </MDBBtn>

                            <p>Or <Link to="/register">register now!</Link></p>



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

    );
};

export default Login;