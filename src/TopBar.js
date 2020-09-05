import React from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBContainer,
} from "mdbreact";
import { LogoutOutlined } from "@ant-design/icons";

class TopBar extends React.Component {
  state = {
    collapseID: "",
    isLoggedIn: false,
  };

  toggleCollapse = (collapseID) => () =>
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));

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
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    {this.props.isLoggedIn ? (
                      <a onClick={this.props.handleLogout}>
                        <LogoutOutlined /> Logout
                      </a>
                    ) : null}
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
