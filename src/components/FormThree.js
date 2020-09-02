import React, { useState, useEffect } from "react";
import { Select, Button } from "antd";
import "./form.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setShippingMethod } from "../actions";
import axios from 'axios';
import {setDirections} from "../actions";

const FormTwo = (props) => {
  const { Option } = Select;
  const [disabled, setDisabled] = useState(true);
  const { method, directions, senderAddress, receiverAddress} = props;

  const submitOrder = () => {
    let route = null;
    if (method == 'Robot') {
        console.log(method);
        console.log("Start: ", directions[0].lat(),':',directions[0].lng());
        console.log("Dis: ", directions[directions.length - 1].lat(),':',directions[directions.length - 1].lng());
        route = directions.map((direction) => {return{
            lat: direction.lat(),
            lng: direction.lng()
        }});
        console.log("route => ",route );
    } else {
        route = directions;
        console.log("route => ",route );
    }
    axios.post('http://localhost:8080/laioffer/placingorder', {
      	username: '1111',
        start: senderAddress,
        destination: receiverAddress,
        route: route,
        method: method
        })
        .then(function (response){
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
      senderAddress : state.order.senderAddress,
      receiverAddress: state.order.receiverAddress
  };
};

export default connect(mapStateToProps, { setShippingMethod })(FormTwo);
