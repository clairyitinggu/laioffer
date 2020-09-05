import React from "react";
import { connect } from "react-redux";
import { Result, Button } from "antd";
import history from "../history";
import "../assets/css/style.css"

const orderSuccess = (props) => {
  const goDashBoard = () => {
    history.push("/dashboard");
  };
  const goTracking = () => {
    history.push("/tracking");
  };
  return (
    <div className="success-container">
      <Result
        status="success"
        title={<h1 style={{color: "#fff"}}>Your order is complete successfully!</h1>}
        subTitle={<div style={{color: "#fff"}}>`Order number: ${props.orderID} You can track your order information in tracking now.`</div>} 
        extra={[
          <a href="/tracking">
            <Button type="primary" key="console" onClick={goTracking}>
              Go Tracking
            </Button>
          </a>,
          <a href="/">
            <Button key="buy" onClick={goDashBoard}>
              Back To homepage
            </Button>
          </a>,
        ]}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    orderID: state.order.orderID,
  };
};
export default connect(mapStateToProps)(orderSuccess);
