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
    this.setState({
      selectedPlace: place
    })
    this.callApi(this.coordinates(place))
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  coordinates = (place) => {
    const list = regionList.map(region => {
      return region.parts.concat(region.main);
    });
    const preparedList = [].concat(...list);
    const region = preparedList.find(region => {
      return region.name === place;
    })
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
        <React.StrictMode><RegionFilters onPlaceSelection={this.handlePlaceSelection} regionList={regionList}/></React.StrictMode>
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}

export default Home;