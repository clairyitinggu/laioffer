import React, { useState } from "react";
import "./form.css";
import { Descriptions, Button, Modal } from "antd";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { setOrderID } from "../actions";
import history from "../history";
import {TOKEN_KEY} from "../constants";

const parseTime = (time) => {
  const totalMin = time * 60;
  const hour = Math.floor(totalMin / 60);
  const min = Math.floor(totalMin % 60);
  return `${hour} hours ${min} minutes`;
};

const FormFour = (props) => {
  const {
    senderName,
    dispatcher,
    senderPhone,
    render,
    senderAddress,
    senderZip,
    receiverName,
    receiverPhone,
    receiverAddress,
    receiverZip,
    shippingMethod,
    estimateTime,
    money,
    directions,
  } = props;

  const [visible, setVisible] = useState(false);
  const [bRedirect, setRedirect] = useState(false);
  const submitOrder = () => {
    let route = null;
    const token = localStorage.getItem(TOKEN_KEY);
    if (shippingMethod == "Robot") {
      console.log(shippingMethod);
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
      .post("http://3.129.204.140/laioffer/placingorder", {
        headers: {
          Authorization: token
        },
        dispatcher: dispatcher,
        start: senderAddress,
        destination: receiverAddress,
        route: route,
        method: shippingMethod,
      })
      .then(function (response) {
        console.log("submit response--> ", response.data);
        const obj = response.data;
        props.setOrderID(obj.tracking_number);
        history.push('/success');
        //redirect();
      })
      .catch(function (error) {
        console.log(error);
        history.push('/failure');
      });
  };

  const data = (() => {
    if (!render) {
      return {
        Sender_Name: senderName,
        Dispatcher: dispatcher,
        Sender_Phone: senderPhone,
        Receiver_Name: receiverName,
        Receiver_Phone: receiverPhone,
        Receiver_Address: `${receiverAddress}, San Francisco, CA, ${receiverZip}`,
        Shipping_Method: shippingMethod,
        Estimate_Time: parseTime(estimateTime),
        price: `$${Number.parseFloat(money).toFixed(2)}`,
      };
    }
    return {
      Sender_Name: senderName,
      Dispatcher: dispatcher,
      Sender_Phone: senderPhone,
      Sender_Address: `${senderAddress}, San Francisco, CA, ${senderZip}`,
      Receiver_Name: receiverName,
      Receiver_Phone: receiverPhone,
      Receiver_Address: `${receiverAddress}, San Francisco, CA, ${receiverZip}`,
      Shipping_Method: shippingMethod,
      Estimate_Time: parseTime(estimateTime),
      price: `$${Number.parseFloat(money).toFixed(2)}`,
    };
  })();

  const redirect = () => {
    setRedirect(true);
  }

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    submitOrder();
    setVisible(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };

  const renderAll = (() => {
    const arr = [];
    for (const [key, value] of Object.entries(data)) {
      arr.push(
        <Descriptions.Item key={key} label={key}>
          {value}
        </Descriptions.Item>
      );
    }
    return arr;
  })();
  if (bRedirect) {
    return <Redirect to="/dashboard"/>;
  }
  return (
    <div className="form-container ">
      <Descriptions className="description-container" title="User Info">
        {renderAll}
      </Descriptions>
      <br />
      <br />
      <div className="btn-group">
        <Link to="/form/3">
          <Button className="btn-left" type="primary" htmlType="submit">
            Previous
          </Button>
        </Link>
        <Button type="primary" onClick={showModal}>
          Submit
        </Button>
        <Modal
          title="Basic Modal"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Are you sure you want to submit this form?</p>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    senderName: state.order.senderName,
    dispatcher: state.order.dispatcher,
    senderPhone: state.order.senderPhone,
    render: state.order.render,
    senderAddress: state.order.senderAddress,
    senderZip: state.order.senderZip,
    receiverName: state.order.receiverName,
    receiverPhone: state.order.receiverPhone,
    receiverAddress: state.order.receiverAddress,
    receiverZip: state.order.receiverZip,
    shippingMethod: state.order.shippingMethod,
    money: state.route.money,
    estimateTime: state.route.estimateTime,
    directions: state.route.directions,
  };
};
export default connect(mapStateToProps, { setOrderID })(FormFour);
