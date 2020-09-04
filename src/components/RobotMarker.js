import React, {Component} from 'react';
import { Marker} from 'react-google-maps';
//import PropTypes from 'prop-types';
import droneMarkerUrl from '../assets/css/droneMarker.svg';
import robotMarkerUrl from '../assets/css/robotMarker.svg';
import destMarkerUrl from '../assets/css/red-marker.svg';
import axios from 'axios';
import {TOKEN_KEY} from "../constants";
class RobotMarker extends Component {
    state = {
        lat : 41,
        lng : -87,
        counter: 0,
        path:[
            {lat : 0, lng: 0}
        ]
    };

    componentDidMount() {
        setInterval(this.geoUpdate, 2000);
    }
    updateLoc = (lat,lng,path) => {
        this.props.updateLoc(lat,lng,path);
    }
    geoUpdate = (trackNum) => {
        console.log('verify:',this.props.trackNum);
        const token = localStorage.getItem(TOKEN_KEY);
        if (this.props.trackNum != 0) {
            axios.get('http://3.129.204.140/laioffer/location', {
                params: {
                    tracking_number: this.props.trackNum,
                    path: true
                },
                headers: {
                    Authorization: token
                }

            })
                .then(response => {
                    console.log('response -->', response.data)
                    if (response.data.status == "Current order is delivery"){
                        //reset tracking number
                        this.props.resetTrack();
                    } else {
                        //console.log("shipping")
                        this.setState({
                            lat: response.data.location.lat,
                            lng: response.data.location.lng,
                            path: response.data.route
                        })
                        console.log('respond->', response.data.route);
                        this.updateLoc(response.data.location.lat, response.data.location.lng,response.data.route);
                    }
                })
                .catch(error => {
                    console.log('err in fetch history -> ', error);
            })
        }

    }
    render() {
        const { lat, lng ,path} = this.state;
        //console.log("path: ",path[0].lng);
        let destLat = path[path.length - 1].lat;
        let destlng = path[path.length - 1].lng;
        //console.log('render:', lat,': ', lng);
        let markerurl = this.props.method == 'robot' ? robotMarkerUrl : droneMarkerUrl;
        let destMarkerurl = this.props.trackNum == 0 ? '' : destMarkerUrl;
        const customIcon = {
            url: markerurl,
            scaledSize: new window.google.maps.Size(26, 41),
        };
        const destIcon = {
            url: destMarkerurl,
            scaledSize: new window.google.maps.Size(26, 41),
        };

        return (
            <div>
            {
                this.props.trackNum == 0 ? <div> </div> :
                <div>
                    <Marker
                        position={{ lat : lat, lng: lng }}
                        icon = {customIcon}
                    >
                    </Marker>
                    <Marker
                    position={{ lat : destLat, lng: destlng }}
                    icon = {destIcon}
                    >
                    </Marker>
                </div>
            }
            </div>
        );
    }
}

export default RobotMarker;