import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Polyline,} from "react-google-maps";
import RobotMarker from "./RobotMarker";
class NormalTrackingMap extends Component {
    path = [
        {lat: 41, lng: -87},
        {lat: 41.1, lng: -87.1},
        {lat: 41.2, lng: -87.2},
        {lat: 42, lng: -88},
        {lat: 44, lng: -90}
    ];
    render() {
        const { lat, lng } = {lat: 41, lng: -87}
        return (

            <GoogleMap
                ref={this.getMapRef}
                defaultZoom={8}
                defaultCenter={{lat , lng}}
            >
                {
                    <RobotMarker />
                }
                <Polyline path={this.path} options={{ strokeColor: "#FF0000 " }} />
            </GoogleMap>
        );
    }
}
const TrackingMap = withScriptjs(withGoogleMap(NormalTrackingMap));
export default TrackingMap;