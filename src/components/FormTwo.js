import React, { useState, useEffect } from 'react';
import { Input, Select, Button } from 'antd';
import "./form.css";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setReceiverName, setReceiverPhone, setReceiverAddress, setReceiverZip } from '../actions';

const FormTwo = props => {
  const { Option } = Select;
  const { name, phone, address, zip } = props;
  const [disabled, setDisabled] = useState(true);
  
  useEffect(() => {
    if (name && phone && address && zip) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, phone, address, zip]);

  const buttonVersion = disabled => {
    if (!disabled) {
      return (
        <div className="btn-group">
          <Link to="/form/1">
            <Button className="btn-left" type="primary" htmlType="submit">
              Previous
            </Button>
          </Link>
          <Link to="/form/3">
            <Button className="btn-right" type="primary" htmlType="submit">
              Next
            </Button>
          </Link>
        </div>
      );
    }
    return (
      <div className="btn-group">
        <Link to="/form/1">
          <Button className="btn-left" type="primary" htmlType="submit">
            Previous
              </Button>
        </Link>
        <Button className="btn-right" type="primary" disabled>
          Next
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="form-container">
        <h2>Where are you shipping To</h2>
        <div className="site-input-group-wrapper">
          <Input style={{ width: '70%' }} placeholder="Name" value={name} onChange={e => props.setReceiverName(e.target.value)} />
          <br /><br />
          <Input style={{ width: '40%' }} placeholder="Phone Number" value={phone} onChange={e => props.setReceiverPhone(e.target.value)} />
          <br /><br />
          <Input style={{ width: '75%' }} value={address} placeholder="Your Address" onChange={e => props.setReceiverAddress(e.target.value)} />
          <br /><br />
          <Input.Group compact>
            <Select style={{ width: '25%' }} defaultValue="San Francisco">
              <Option value="San Francisco">San Francisco</Option>
              <Option value="disabled" disabled>N/A</Option>
            </Select>
            <Select style={{ width: '15%' }} defaultValue="CA">
              <Option value="CA">CA</Option>
              <Option value="disabled" disabled>N/A</Option>
            </Select>
            <Input style={{ width: '20%' }} placeholder="ZIPCODE" value={zip} onChange={e => props.setReceiverZip(e.target.value)} />
          </Input.Group>
          <br />
          {buttonVersion(disabled)}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    name: state.order.receiverName,
    phone: state.order.receiverPhone,
    address: state.order.receiverAddress,
    zip: state.order.receiverZip
  };
}

export default connect(mapStateToProps, { setReceiverName, setReceiverPhone, setReceiverAddress, setReceiverZip })(FormTwo);