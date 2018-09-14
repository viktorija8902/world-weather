import React, { Component } from 'react';
import { regionList } from "./data/Regions";
import RegionFilters from "./RegionFilter/RegionFilters";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      selectedPlace: '',
    }
    this.handlePlaceSelection = this.handlePlaceSelection.bind(this)
  }

  handlePlaceSelection(place) {
    console.log("selectedPlace", place)
    this.setState({
      selectedPlace: place
    })
    console.log(this.coordinates(place))
    this.callApi(this.coordinates(place))
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  coordinates = (place) => {
    const region = regionList.find(region => region.name === place);
    return region.coord;
  }

  callApi = async (coordinates) => {
    const response = await fetch(`/api/weather/${coordinates.lonTopLeft},${coordinates.latBottomLeft},${coordinates.lonBottomRight},${coordinates.latTopRight}`);
    const body = await response.json();
    console.log(body)
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="home">
        <React.StrictMode><RegionFilters selectedPlace={this.handlePlaceSelection} regionList={regionList}/></React.StrictMode>
        {/* <div className="App-intro">{this.state.response}</div> */}
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}

export default Home;