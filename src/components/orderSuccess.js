import React from "react";
import { connect } from "react-redux";
import { Result, Button } from "antd";
import history from "../history";

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
        title="Your order is complete successfully!"
        subTitle={`Order number: ${props.orderID} You can track your order information in tracking now.`}
        extra={[
          <Button type="primary" key="console" onClick={goTracking}>
            Go Tracking
          </Button>,
          <Button key="buy" onClick={goDashBoard}>
            Back To homepage
          </Button>,
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
