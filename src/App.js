import React from "react";
import Main from './Main';
import TopBar from "./TopBar";
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

class ClassicFormPage extends React.Component {
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
          <TopBar />
          <Main />

      </div>
    );
  }
}

export default ClassicFormPage;