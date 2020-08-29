import React, { useState, useEffect } from "react";
import { Select, Button } from "antd";
import "./form.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setShippingMethod } from "../actions";

const FormTwo = (props) => {
  const { Option } = Select;
  const [disabled, setDisabled] = useState(true);
  const { method } = props;

  useEffect(() => {
    if (method) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [method]);

  const buttonVersion = (disabled) => {
    if (!disabled) {
      return (
        <div className="btn-group">
          <Link to="/form/2">
            <Button className="btn-left" type="primary" htmlType="submit">
              Previous
            </Button>
          </Link>
          <Link to="/form/4">
            <Button className="btn-right" type="primary" htmlType="submit">
              Next
            </Button>
          </Link>
        </div>
      );
    }
    return (
      <div className="btn-group">
        <Link to="/form/2">
          <Button className="btn-left" type="primary" htmlType="submit">
            Previous
          </Button>
        </Link>
        <Button className="btn-right" type="primary" disabled>
          Next
        </Button>
      </div>
    );
  };

  return (
    <div>
      <div className="form-container">
        <h2>What you want to ship by</h2>
        <div className="site-input-group-wrapper">
          <Select
            style={{ width: "80%" }}
            value={method}
            placeholder="Select Shipping Option"
            onSelect={(e) => props.setShippingMethod(e)}
          >
            <Option value="Robot">Robot</Option>
            <Option value="Prone">Prone</Option>
          </Select>
          <br />
          <br />
          {buttonVersion(disabled)}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    method: state.order.shippingMethod,
  };
};

export default connect(mapStateToProps, { setShippingMethod })(FormTwo);
