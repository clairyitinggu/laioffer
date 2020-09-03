import React, { useState, useEffect } from "react";
import { Select, Button, Descriptions } from "antd";
import "./form.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setShippingMethod, setEstimateTime, setMoney } from "../actions";
import axios from "axios";
import { robot, prone } from "../constants";

const parseTime = (time) => {
  const totalMin = time * 60;
  const hour = Math.floor(totalMin / 60);
  const min = Math.floor(totalMin % 60);
  return `${hour} hours ${min} minutes`;
}

const FormThree = (props) => {
  const { Option } = Select;
  const [disabled, setDisabled] = useState(true);
  const {
    method,
    directions,
    senderAddress,
    receiverAddress,
    estimateTime,
    money,
    distance,
    secondDistance,
  } = props;

  const submitOrder = () => {
    let route = null;
    if (method == "Robot") {
      console.log(method);
      console.log("Start: ", directions[0].lat(), ":", directions[0].lng());
      console.log(
        "Dis: ",
        directions[directions.length - 1].lat(),
        ":",
        directions[directions.length - 1].lng()
      );
      route = directions.map((direction) => {
        return {
          lat: direction.lat(),
          lng: direction.lng(),
        };
      });
      console.log("route => ", route);
    } else {
      route = directions;
      console.log("route => ", route);
    }
    axios
      .post("http://localhost:8080/laioffer/placingorder", {
        username: "1111",
        start: senderAddress,
        destination: receiverAddress,
        route: route,
        method: method,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (method) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [method]);

  useEffect(() => {
    if (method === "Robot") {
      props.setEstimateTime(
        distance / robot.KMPerHour + secondDistance / robot.KMPerHour
      );
      props.setMoney(
        distance * robot.dollarPerKM + secondDistance * robot.dollarPerKM
      );
      console.log(distance);
    } else {
      props.setEstimateTime(
        distance / prone.KMPerHour + secondDistance / prone.KMPerHour
      );
      props.setMoney(
        distance * prone.dollarPerKM + secondDistance * prone.dollarPerKM
      );
    }
  }, [distance, secondDistance]);

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
            <Option value="Drone">Drone</Option>
          </Select>
          <br />
          <br />
          {method && (
            <React.Fragment>
              <div className="description-container">
                <Descriptions title={`Info for ${method}`}>
                  <Descriptions.Item label="Estimate Time">
                    {parseTime(estimateTime)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Price">{`$${Number.parseFloat(money).toFixed(2)}`}</Descriptions.Item>
                </Descriptions>
              </div>
              <br />
              <br />
            </React.Fragment>
          )}
          {buttonVersion(disabled)}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    method: state.order.shippingMethod,
    directions: state.route.directions,
    senderAddress: state.order.senderAddress,
    receiverAddress: state.order.receiverAddress,
    estimateTime: state.route.estimateTime,
    money: state.route.money,
    distance: state.route.distance,
    secondDistance: state.route.secondDistance,
  };
};

export default connect(mapStateToProps, {
  setShippingMethod,
  setEstimateTime,
  setMoney,
})(FormThree);
