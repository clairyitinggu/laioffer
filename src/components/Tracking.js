import React, {Component} from 'react';
import TrackingMap from "./TrackingMap";
import HistoryTable from "./HistoryTable";
class Tracking extends Component {
    state = {
        TrackNum : 0
    };
    render() {
        return (
            <div className="trackingMap">
                <HistoryTable/>
                <TrackingMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA8zTbtsplF9DYW1LLgKwYTR1OFszEgK6g&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `600px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}

export default Tracking;