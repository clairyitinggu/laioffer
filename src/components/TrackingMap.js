import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Polyline,} from "react-google-maps";
import RobotMarker from "./RobotMarker";
class NormalTrackingMap extends Component {
    state = {
        lat : 37.71909,
        lng : -122.45431,
        path: [],
        zoom: 13
    };

    updateCoordinate = (lat,lng,path) => {
        console.log('Geo: ',lat,lng,path);
        this.setState(presState => ({
            lat: lat,
            lng: lng,
            path: path,
            zoom: 18
        }))
    }

    resetTrackNum = () => {
        console.log('Delivered');
        this.props.resetTrackNum(0);
    }

    render() {
        const {lat,lng,zoom,path} = this.state;
        //console.log('zoom: ',path);
        return (

            <GoogleMap
                ref={this.getMapRef}
                // defaultZoom={zoom}
                defaultCenter={{lat: 37.71909,lng: -122.45431}}
                zoom = {zoom}
                center={{lat,lng}}
            >
                {
                    <RobotMarker
                        trackNum = {this.props.trackNum}
                        method = {this.props.method}
                        updateLoc = {this.updateCoordinate}
                        resetTrack = {this.resetTrackNum}
                    />
                }
                {
                    this.props.trackNum == 0 ? <div></div> : <Polyline path={path} options={{ strokeColor: "#FF0000 " }} />
                }

            </GoogleMap>
        );
    }
}
const TrackingMap = withScriptjs(withGoogleMap(NormalTrackingMap));
export default TrackingMap;