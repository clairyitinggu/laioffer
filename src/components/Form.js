import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
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

export default () => {
  const store = createStore(reducers, applyMiddleware(thunk));
  const MapComponent = () => {
    return (
      <div className="map-container">
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?key={PUT_YOUR_KEY}&v=3.exp&libraries=geometry,drawing,places"
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
        <BrowserRouter>
          <div className="route-container">
            <Route path="/form/1" exact component={FormOne} />
            <Route path="/form/2" exact component={FormTwo} />
            <Route path="/form/3" exact component={FormThree} />
            <Route path="/form/4" exact component={FormFour} />
            <Route path="/form" component={MapComponent} />
          </div>
        </BrowserRouter>
      </div>
    </Provider>
  );
};
