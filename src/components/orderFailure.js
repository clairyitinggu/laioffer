import React from "react";
import { Result, Button } from "antd";
import history from "../history";

const orderFailure = () => {
  const goDashBoard = () => {
    history.push("/dashboard");
  };
  const fillAgain = () => {
    history.push("/form/1");
  };
  return (
    <div className="success-container">
      <Result
        status="warning"
        title="There are some problems submitting the form."
        extra={[
          <Button type="primary" key="console" onClick={fillAgain}>
            Fill Again
          </Button>,
          <Button key="buy" onClick={goDashBoard}>
            Back To homepage
          </Button>,
        ]}
      />
    </div>
  );
};

export default orderFailure;
