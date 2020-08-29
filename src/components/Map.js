import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
  Polyline,
} from "react-google-maps";

import {
  setDirections,
  setSecondDirections,
  setDistance,
  setSecondDistance,
} from "../actions";

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const haversine_distance = (mk1, mk2) => {
  let R = 6371.0710; // Radius of the Earth in miles
  let rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
  let rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
  let difflat = rlat2 - rlat1; // Radian difference (latitudes)
  let difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  let d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d;
};

const Map = withScriptjs(
  withGoogleMap((props) => {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const { markersConfig, method, directions, secondDirections } = props;
    const google = window.google;

    useEffect(() => {
      if (!method) {
        return;
      }
      if (method === "Robot") {
        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route(
          {
            origin: new google.maps.LatLng(
              markersConfig[0].lat,
              markersConfig[0].lng
            ),
            destination: new google.maps.LatLng(
              markersConfig[1].lat,
              markersConfig[1].lng
            ),
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              props.setDistance(result.routes[0].legs[0].distance.value / 1000);
              props.setDirections(result.routes[0].overview_path);
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
        if (markersConfig[2]) {
          const DirectionsService = new google.maps.DirectionsService();
          DirectionsService.route(
            {
              origin: new google.maps.LatLng(
                markersConfig[1].lat,
                markersConfig[1].lng
              ),
              destination: new google.maps.LatLng(
                markersConfig[2].lat,
                markersConfig[2].lng
              ),
              travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                props.setSecondDistance(result.routes[0].legs[0].distance.value / 1000);
                props.setSecondDirections(result.routes[0].overview_path);
              } else {
                console.error(`error fetching directions ${result}`);
              }
            }
          );
        }
      } else {
        props.setDirections([
          { lat: markersConfig[0].lat, lng: markersConfig[0].lng },
          { lat: markersConfig[1].lat, lng: markersConfig[1].lng },
        ]);
        props.setDistance(
          haversine_distance(
            { lat: markersConfig[0].lat, lng: markersConfig[0].lng },
            { lat: markersConfig[1].lat, lng: markersConfig[1].lng }
          )
        );

        if (markersConfig[2]) {
          props.setSecondDirections([
            { lat: markersConfig[1].lat, lng: markersConfig[1].lng },
            { lat: markersConfig[2].lat, lng: markersConfig[2].lng },
          ]);
          props.setSecondDistance(
            haversine_distance(
              { lat: markersConfig[1].lat, lng: markersConfig[1].lng },
              { lat: markersConfig[2].lat, lng: markersConfig[2].lng }
            )
          );
        }
      }
    }, [method, markersConfig]);

    return (
      <GoogleMap defaultZoom={12} defaultCenter={center}>
        {markersConfig.map((marker) => {
          return (
            <Marker
              key={marker.idx}
              position={{ lat: marker.lat, lng: marker.lng }}
              visible={marker.visible}
              onClick={() => setSelectedMarker(marker)}
            >
              {selectedMarker === marker && (
                <InfoWindow
                  onCloseClick={() => {
                    setSelectedMarker(null);
                  }}
                  position={{
                    lat: selectedMarker.lat,
                    lng: selectedMarker.lng,
                  }}
                >
                  <div>{selectedMarker.message}</div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}

        {directions && (
          <Polyline
            path={directions}
            geodesic={true}
            options={{
              strokeColor: "#ff2343",
              strokeOpacity: 0.8,
              strokeWeight: 5,
              clickable: true,
            }}
          />
        )}

        {secondDirections && (
          <Polyline
            path={secondDirections}
            geodesic={true}
            options={{
              strokeColor: "#4a89f3",
              strokeOpacity: 0.8,
              strokeWeight: 5,
              clickable: true,
            }}
          />
        )}
      </GoogleMap>
    );
  })
);

const mapStateToProps = (state) => {
  return {
    markersConfig: state.route.markersConfig,
    method: state.order.shippingMethod,
    directions: state.route.directions,
    secondDirections: state.route.secondDirections,
  };
};

export default connect(mapStateToProps, {
  setDirections,
  setSecondDirections,
  setDistance,
  setSecondDistance,
})(Map);
