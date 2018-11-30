import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import landmarks from './data/landmarks.json';
import Display from './components/Display';
import Foursquare from './API/';
import Sidebar from './components/Sidebar';

class MapApp extends Component {
  state={markers:[], venues:[], center:[]};

  closeAllMarkers=()=>{
    const markers = this.state.markers.map(marker=>{
      marker.isOpen=false;
      return marker;
    });
    this.setState({markers:Object.assign(this.state.markers, markers)});
  };
  handleMarkerClick=marker=>{
    this.closeAllMarkers();
    marker.isOpen=true;
    this.setState({markers:Object.assign(this.state.markers, marker)});
    const venue=this.state.venues.find(venue=>venue.id===marker.id);

    Foursquare.getVenueDetails(marker.id).then(res=>{
      const newVenue=Object.assign(venue, res.response.venue);
      this.setState({venues: Object.assign(this.state.venues, newVenue)});
      console.log(newVenue);
    });
  };
  handleListItemClick=venue=>{
    console.log(venue)
  }
  componentDidMount(){
    Foursquare.search({
      near: "Orlando, Florida",
      query: "beer",
      categoryId:"4bf58dd8d48988d117941735",
      limit: 10
    }).then(results=>{
      const {venues}=results.response;
      const {center}=results.response.geocode.feature.geometry;
      const markers=venues.map(venue=>{
        return{
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({venues,center,markers});
    });
  }
  render(){
    return(
      <div className="MapApp">
        <header className="MapApp-header">
          <h1 className="MapApp-title">Orlando Brews</h1>
          <Sidebar {...this.state} handleListItemClick={this.handleListItemClick}/>
        </header>
        <Display {...this.state} handleMarkerClick={this.handleMarkerClick}/>
      </div>
    );
  }
}

export default MapApp;
