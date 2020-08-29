import React, { useEffect } from 'react';
import "./form.css";
import { Descriptions, Button } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEstimateTime, fetchMoney, fetchOrderID } from '../actions'

const FormFour = props => {
  const { senderName, dispatcher, senderPhone, render, senderAddress, senderZip, receiverName, receiverPhone, receiverAddress, receiverZip, shippingMethod, estimateTime, money, orderID } = props;
  useEffect(() => {
    const fetch = async () => {
      props.fetchEstimateTime();
      props.fetchMoney();
      props.fetchOrderID();
    }
    fetch();
  }, []);

  const data = (() => {
    console.log(render);
    if (!render) {
      return {
        Sender_Name: senderName,
        Dispatcher: dispatcher,
        Sender_Phone: senderPhone,
        Receiver_Name: receiverName,
        Receiver_Phone: receiverPhone,
        Receiver_Address: `${receiverAddress}, San Francisco, CA, ${receiverZip}`,
        Shipping_Method: shippingMethod,
        Estimate_DELIVERY_Time: estimateTime,
        Money: money,
        Order_ID: orderID
      }
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
      Estimate_DELIVERY_Time: estimateTime,
      Money: money,
      Order_ID: orderID
    }
  })();

  const renderAll = (() => {
    const arr = [];
    for (const [key, value] of Object.entries(data)) {
      arr.push(<Descriptions.Item key={key} label={key}>{value}</Descriptions.Item>)
    }
    return arr;
  })();

  return (
    <div className="form-container ">
      <Descriptions title="User Info">
        {renderAll}
      </Descriptions>
      <br /><br />
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

}

const mapStateToProps = state => {
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
    estimateTime: state.order.estimateTime,
    money: state.order.money,
    orderID: state.order.orderID
  }
}
export default connect(mapStateToProps, { fetchEstimateTime, fetchMoney, fetchOrderID })(FormFour);