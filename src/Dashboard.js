import React from "react";
import {
    MDBMask,
    MDBBtn,
    MDBView,
    MDBContainer,
    MDBAnimation,
} from "mdbreact";
import {
    Link
} from 'react-router-dom';
import LearnMore from "./LearnMore";

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
                <MDBMask className="justify-content-center align-items-center gradient" />
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
                                <Link to="/tracking">
                                    <MDBBtn rounded outline className="btn-block" color="info" size="lg" style={{marginRight: "200px"}}>Order History</MDBBtn>
                                </Link>
                            </MDBAnimation>
                        </div>
                    </MDBContainer>
                </div>
            </MDBView>




        );
    }
}

export default Dashboard;