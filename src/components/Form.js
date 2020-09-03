import React from "react";
import { Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import "./form.css";
import Map from "./Map";
import FormOne from "./FormOne";
import FormTwo from "./FormTwo";
import FormThree from "./FormThree";
import FormFour from "./FormFour";
import reducers from "../reducers";
import thunk from "redux-thunk";
import orderSuccess from "./orderSuccess";
import orderFailure from "./orderFailure";
import history from "../history";
import Tracking from "./Tracking";
import Dashboard from "../Dashboard";

export default () => {
  const store = createStore(reducers, applyMiddleware(thunk));
  const MapComponent = () => {
    return (
      <div className="map-container">
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `70vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  };

  return (
    <Provider store={store}>
      <div className="outer-container">
        <Router history={history}>
          <div className="route-container">
            <Route path="/form/1" exact component={FormOne} />
            <Route path="/form/2" exact component={FormTwo} />
            <Route path="/form/3" exact component={FormThree} />
            <Route path="/form/4" exact component={FormFour} />
            <Route path="/form" component={MapComponent} />
            <Route path="/success" exact component={orderSuccess} />
            <Route path="/failure" exact component={orderFailure} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/tracking" exact component={Tracking}/>
          </div>
        </Router>
      </div>
    </Provider>
  );
};
