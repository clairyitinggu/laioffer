import React, { useState, useEffect } from 'react';
import { Input, Select, Button } from 'antd';
import "./form.css";
import { options } from '../constants';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSenderName, setDispatcher, setSenderPhone, setConditionalRender, setSenderAddress, setSenderZip } from '../actions';

const FormOne = props => {
  const { Option } = Select;
  const { name, phone, dispatcher, render, address, zip } = props;
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (name && phone && dispatcher && (!render || (render && address && zip))) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, phone, dispatcher, render, address, zip]);

  const buttonVersion = disabled => {
    if (!disabled) {
      return (
        <div className="btn-right">
          <Link to="/form/2">
            <Button className="btn-right" type="primary" htmlType="submit">
              Next
            </Button>
          </Link>
        </div>
      );
    }
    return (
      <div className="btn-right">
        <Button className="btn-right" type="primary" disabled>
          Next
        </Button>
      </div>
    )
  }

  const onMethodSelected = e => {
    if (e === 'Drop Down') {
      props.setConditionalRender(false);
    } else if (e === 'Pick Up') {
      props.setConditionalRender(true);
    }
  }

  const conditionalRender = render => {
    if (render) {
      return (
        <div id="conditional-render">
          <Input style={{ width: '75%' }} value={address} placeholder="Your Address" onChange={e => props.setSenderAddress(e.target.value)} />
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
            <Input style={{ width: '20%' }} placeholder="ZIPCODE" value={zip} onChange={e => props.setSenderZip(e.target.value)} />
          </Input.Group>
          <br />
        </div>
      )
    }
    return <div></div>;
  }

  return (
    <div>
      <div className="form-container">
        <h2>Where are you shipping from</h2>
        <div className="site-input-group-wrapper">
          <Input style={{ width: '70%' }} placeholder="Name" value={name} onChange={e => props.setSenderName(e.target.value)} />
          <br /><br />
          <Input style={{ width: '40%' }} placeholder="Phone Number" value={phone} onChange={e => props.setSenderPhone(e.target.value)} />
          <br /><br />
          <Select style={{ width: '100%' }} placeholder="Select Dispatcher" value={dispatcher} onSelect={e => props.setDispatcher(e)}>
            <Option value={options[0].label}>{options[0].label}, {options[0].value}</Option>
            <Option value={options[1].label}>{options[1].label}, {options[1].value}</Option>
            <Option value={options[2].label}>{options[2].label}, {options[2].value}</Option>
          </Select>
          <br /><br />
          <Select style={{ width: '50%' }} defaultValue="Drop Down" onSelect={onMethodSelected}>
            <Option value="Drop Down">Drop Down</Option>
            <Option value="Pick Up">Pick Up</Option>
          </Select>
          <br /><br />
          <div>
            {conditionalRender(render)}
          </div>
          {buttonVersion(disabled)}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    name: state.order.senderName,
    dispatcher: state.order.dispatcher,
    phone: state.order.senderPhone,
    render: state.order.render,
    address: state.order.senderAddress,
    zip: state.order.senderZip
  };
}

export default connect(mapStateToProps, { setSenderName, setDispatcher, setSenderPhone, setConditionalRender, setSenderAddress, setSenderZip })(FormOne);