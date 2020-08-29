import React, { useState, useEffect } from "react";
import { Input, Select, Button } from "antd";
import "./form.css";
import { options } from "../constants";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Geocode from "react-geocode";
import {
  setSenderName,
  setDispatcher,
  setSenderPhone,
  setConditionalRender,
  setSenderAddress,
  setSenderZip,
  setDispatcherMarker,
  setSenderMarker,
  setMarkersConfig,
} from "../actions";

Geocode.setApiKey("{PUT_YOUR_KEY}");
const FormOne = (props) => {
  const { Option } = Select;
  const { name, phone, dispatcher, render, address, zip, senderMarker } = props;
  const {
    setSenderName,
    setDispatcher,
    setSenderPhone,
    setConditionalRender,
    setSenderAddress,
    setSenderZip,
    setDispatcherMarker,
    setSenderMarker,
    setMarkersConfig,
  } = props;
  const [disabled, setDisabled] = useState(true);
  const [debouncedAddress, setDebouncedAddress] = useState(null);

  useEffect(() => {
    if (
      name &&
      phone &&
      dispatcher &&
      (!render || (render && address && zip))
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, phone, dispatcher, render, address, zip]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedAddress(address);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [address]);

  useEffect(() => {
    if (!debouncedAddress) {
      return;
    }
    const search = () => {
      Geocode.fromAddress(`${debouncedAddress}, San Francisco`).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setSenderMarker({
            lat: lat,
            lng: lng,
            idx: 2,
            visible: true,
            message: "Sender",
          });
          setMarkersConfig();
        },
        (error) => {
          console.error(error);
        }
      );
    };
    search();
  }, [debouncedAddress]);

  useEffect(() => {
    if (!senderMarker) {
      return;
    }
    if (!render) {
      setSenderMarker({ ...senderMarker, visible: false });
      setMarkersConfig();
    } else {
      setSenderMarker({ ...senderMarker, visible: true });
      setMarkersConfig();
    }
  }, [render]);

  const buttonVersion = (disabled) => {
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
    );
  };

  const onMethodSelected = (e) => {
    if (e === "Drop Down") {
      setConditionalRender(false);
    } else if (e === "Pick Up") {
      setConditionalRender(true);
    }
  };

  const handleOnSelect = (e) => {
    setDispatcher(options[e].value);
    setDispatcherMarker({
      lat: options[e].lat,
      lng: options[e].lng,
      idx: 1,
      visible: true,
      message: "Dispatcher",
    });
    setMarkersConfig();
  };

  const conditionalRender = (render) => {
    if (render) {
      return (
        <div id="conditional-render">
          <Input
            style={{ width: "75%" }}
            value={address}
            placeholder="Your Address"
            onChange={(e) => setSenderAddress(e.target.value)}
          />
          <br />
          <br />
          <Input.Group compact>
            <Select style={{ width: "25%" }} defaultValue="San Francisco">
              <Option value="San Francisco">San Francisco</Option>
              <Option value="disabled" disabled>
                N/A
              </Option>
            </Select>
            <Select style={{ width: "15%" }} defaultValue="CA">
              <Option value="CA">CA</Option>
              <Option value="disabled" disabled>
                N/A
              </Option>
            </Select>
            <Input
              style={{ width: "20%" }}
              placeholder="ZIPCODE"
              value={zip}
              onChange={(e) => setSenderZip(e.target.value)}
            />
          </Input.Group>
          <br />
        </div>
      );
    }
    return <div></div>;
  };

  return (
    <div>
      <div className="form-container">
        <h2>Where are you shipping from</h2>
        <div className="site-input-group-wrapper">
          <Input
            style={{ width: "70%" }}
            placeholder="Name"
            value={name}
            onChange={(e) => setSenderName(e.target.value)}
          />
          <br />
          <br />
          <Input
            style={{ width: "40%" }}
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setSenderPhone(e.target.value)}
          />
          <br />
          <br />
          <Select
            style={{ width: "100%" }}
            placeholder="Select Dispatcher"
            value={dispatcher}
            onSelect={handleOnSelect}
          >
            <Option value={options[0].idx}>
              {options[0].label}, {options[0].value}
            </Option>
            <Option value={options[1].idx}>
              {options[1].label}, {options[1].value}
            </Option>
            <Option value={options[2].idx}>
              {options[2].label}, {options[2].value}
            </Option>
          </Select>
          <br />
          <br />
          <Select
            style={{ width: "50%" }}
            defaultValue="Drop Down"
            onSelect={onMethodSelected}
          >
            <Option value="Drop Down">Drop Down</Option>
            <Option value="Pick Up">Pick Up</Option>
          </Select>
          <br />
          <br />
          <div>{conditionalRender(render)}</div>
          {buttonVersion(disabled)}
          <br />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.order.senderName,
    dispatcher: state.order.dispatcher,
    phone: state.order.senderPhone,
    render: state.order.render,
    address: state.order.senderAddress,
    zip: state.order.senderZip,
    senderMarker: state.route.senderMarker,
  };
};

export default connect(mapStateToProps, {
  setSenderName,
  setDispatcher,
  setSenderPhone,
  setConditionalRender,
  setSenderAddress,
  setSenderZip,
  setDispatcherMarker,
  setSenderMarker,
  setMarkersConfig,
})(FormOne);
