import React from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


export const GoogleMapWrapper = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={4}
    defaultCenter={{ lat: props.averageLat, lng: props.averageLon }}
  >
    {props.isMarkerShown && props.markers.map(marker => <Marker key={marker.name} position={{ lat: marker.coord.Lat, lng: marker.coord.Lon}} />)}
  </GoogleMap>
)