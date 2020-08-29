import React, { useEffect } from "react";
import "./form.css";
import { Descriptions, Button } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { robot, prone } from "../constants";
import { setEstimateTime, setMoney } from "../actions";

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
    distance,
    secondDistance,
    estimateTime,
    money,
  } = props;
  useEffect(() => {
    if (shippingMethod === "Robot") {
      props.setEstimateTime(
        distance / robot.KMPerHour + secondDistance / robot.KMPerHour
      );
      props.setMoney(
        distance * robot.dollarPerKM + secondDistance * robot.dollarPerKM
      );
    } else {
      props.setEstimateTime(
        distance / prone.KMPerHour + secondDistance / prone.KMPerHour
      );
      props.setMoney(
        distance * prone.dollarPerKM + secondDistance * prone.dollarPerKM
      );
    }
  }, []);

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
        Estimate_Time: `${estimateTime} hr`,
        money: `$${money}`,
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
      Estimate_Time: `${estimateTime} hr`,
      money: `${money}`,
    };
  })();

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

  return (
    <div className="form-container ">
      <Descriptions title="User Info">{renderAll}</Descriptions>
      <br />
      <br />
      <div className="btn-group">
        <Link to="/form/3">
          <Button className="btn-left" type="primary" htmlType="submit">
            Previous
          </Button>
        </Link>
        <Link to="/form/4">
          <Button className="btn-right" type="primary" htmlType="submit">
            Submit
          </Button>
        </Link>
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
    distance: state.route.distance,
    secondDistance: state.route.secondDistance,
    money: state.route.money,
    estimateTime: state.route.estimateTime,
  };
};
export default connect(mapStateToProps, { setEstimateTime, setMoney })(
  FormFour
);
