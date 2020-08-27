import React, {Component} from 'react';
import { Marker} from 'react-google-maps';
//import PropTypes from 'prop-types';
import robotMarkerUrl from '../assets/css/droneMarker.svg';

class RobotMarker extends Component {
    state = {
        lat : 41,
        lon : -87,
        counter: 0,
    }

    ;

    componentDidMount() {
        setInterval(this.geoUpdate, 1000);
    }

    geoUpdate = () => {
        const { lat, lon, counter } = this.state;
        if (lat < 44 && lon > -90)  {
            //console.log(counter,":", lat, lon);
            this.setState((prevState) => ({counter: counter + 1, lat : prevState.lat + 0.01, lon : prevState.lon - 0.01}));
        } else {
            this.setState((prevState) => ({lat : 41, lon : -87}));
        }
    }
    render() {
        const { lat, lon } = this.state;

        const customIcon = {
            url: robotMarkerUrl,
            scaledSize: new window.google.maps.Size(26, 41),
        };

        return (
            <Marker
                position={{ lat : lat, lng: lon }}
                icon = {customIcon}
            >
            </Marker>
        );
    }
}

export default RobotMarker;