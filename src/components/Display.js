/*global google*/
import React, { Component } from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import Sidebar from './Sidebar';

const MyMapComponent=withScriptjs(withGoogleMap(props=>(
    <GoogleMap role="application" aria-label="map" defaultZoom={12}
    defaultCenter={{lat: 28.5383, lng:-81.3792}}>
    {props.markers&&props.markers.filter(marker=>marker.isVisible).map((marker,index,ARR)=>{
      const venueInfo=props.venues.find(venue=>venue.id===marker.id);
      return(
        <Marker key={index} position={{lat:marker.lat, lng:marker.lng}}
      onClick={()=>props.handleMarkerClick(marker)} animation={ARR.length===1?google.maps.Animation.BOUNCE:google.maps.Animation.DROP}>
        {marker.isOpen && venueInfo.bestPhoto &&(
          <InfoWindow>
            <React.Fragment>
               <p>{venueInfo.name}</p>
                <img src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`}alt={"venue"}/>
            </React.Fragment>
          </InfoWindow>
        )}
        </Marker>
      );
      })}
    </GoogleMap>
  )),
);

  const mapHeight = window.innerHeight;//https://github.com/tomchentw/react-google-maps/issues/323#issuecomment-396312747
  export default class Display extends Component {
    render(){
    return(
      <Sidebar style={{width:`25%`}}/>,
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCPqUYJs_qpIFyGTMnSP-c_E6OVKuzBXSQ"
        loadingElement={<div style={{height: `100%`}}/>} containerElement={<div style={{height:mapHeight, width:"100%"}}/>}
        mapElement={<div style={{height:`100%`}}/>}/>
    );
  }
}
