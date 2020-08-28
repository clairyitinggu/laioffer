import React from "react";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBMask,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBBtn,
    MDBView,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBFormInline,
    MDBAnimation,
} from "mdbreact";
import {
    Route,
    Link,
    Switch, Redirect
} from 'react-router-dom';
// import Routes from "./Routes";

// import "./ClassicFormPage.css";

class TopBar extends React.Component {
    state = {
        collapseID: "",
        isLoggedIn: false
    };
    handleLoginSucceed = () => {
        // localStorage.setItem(TOKEN_KEY, token)
        this.setState({ isLoggedIn: true });
    }

    toggleCollapse = (collapseID) => () =>
        this.setState((prevState) => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : "",
        }));
    closeCollapse = (collID) => () => {
        const { collapseID } = this.state;
        window.scrollTo(0, 0);
        collapseID === collID && this.setState({ collapseID: "" });
    };

    componentDidMount() {
        document.querySelector("nav").style.height = "65px";
    }

    componentWillUnmount() {
        document.querySelector("nav").style.height = "auto";
    }

    render() {
        const { collapseID } = this.state;
        const overlay = (
            <div
                id="sidenav-overlay"
                style={{ backgroundColor: "transparent" }}
                onClick={this.toggleCollapse("navbarCollapse")}
            />
        );

        return (

            <div id="classicformpage">

                <div>
                    <MDBNavbar
                        dark
                        expand="md"
                        scrolling
                        fixed="top"
                        style={{ marginTop: "0px" }}
                    >
                        <MDBContainer>
                            <MDBNavbarBrand>
                                <strong className="white-text">Delivery4You</strong>
                            </MDBNavbarBrand>
                            <MDBNavbarToggler
                                onClick={this.toggleCollapse("navbarCollapse")}
                            />

                            <MDBCollapse id="navbarCollapse" isOpen={collapseID} navbar>
                                <MDBNavbarNav left>
                                    <MDBNavItem active>
                                        <MDBNavLink to="/">Home</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="/dashboard">User Dashboard</MDBNavLink>
                                    </MDBNavItem>

                                    <MDBNavItem>
                                        <MDBNavLink to="#!"></MDBNavLink>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                                <MDBNavbarNav right>
                                    <MDBNavItem>
                                        <MDBFormInline waves>
                                            <div className="md-form my-0">
                                                <input
                                                    className="form-control mr-sm-2"
                                                    type="text"
                                                    placeholder="Check tracking"
                                                    aria-label="Search"
                                                />
                                            </div>
                                        </MDBFormInline>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                            </MDBCollapse>
                        </MDBContainer>
                    </MDBNavbar>
                    {collapseID && overlay}
                </div>


            </div>
        );
    }
}

export default TopBar;