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
          <a href="/form/1">
            <Button type="primary" key="console" onClick={fillAgain}>
              Fill Again
            </Button>
          </a>,
          <a href="/">
            <Button key="buy" onClick={goDashBoard}>
              Back To homepage
            </Button>
            ,
          </a>,
        ]}
      />
    </div>
  );
};

export default orderFailure;
