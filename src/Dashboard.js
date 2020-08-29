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
import TopBar from "./TopBar";
import LearnMore from "./LearnMore";
import Form from "./components/Form"


class Dashboard extends React.Component {
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
            <MDBView>
                <MDBMask className="d-flex justify-content-center align-items-center gradient" />
                <div>
                    <MDBContainer
                        style={{ height: "100%", width: "100%", paddingTop: "10rem" }}
                        className="mt-5  d-flex justify-content-center align-items-center"
                    >
                        <LearnMore />
                        <div>
                            <MDBAnimation type="fadeInRight" delay=".3s">
                                <Link to="/form/1">
                                    <MDBBtn rounded outline className="btn-block" color="info" size="lg" style={{marginRight: "200px", marginBottom:"80px"}}>Submit a New Order</MDBBtn>
                                </Link>

                                <MDBBtn rounded outline className="btn-block" color="info" size="lg" style={{marginRight: "200px"}}>Order History</MDBBtn>

                            </MDBAnimation>
                        </div>
                    </MDBContainer>
                </div>
            </MDBView>




        );
    }
}

export default Dashboard;