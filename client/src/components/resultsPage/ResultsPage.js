import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCustomWeatherData } from '../../actions/actionCreators';
import Wind from "./wind/Wind";
import Rain from "./rain/Rain";
import Clouds from "./clouds/Clouds";
import Temperature from './temperature/Temperature';
import MapWrapper from "./MapWrapper";
import Summary from "./Summary";

class ResultsPage extends Component {
  constructor(props) {
    super(props);
    this.handleCoordSelect = this.handleCoordSelect.bind(this);
  }

  handleCoordSelect(coord) {
    this.props.getCustomWeatherData({
      lonTopLeft: coord[0].Lon,
      latBottomLeft: coord[1].Lat,
      lonBottomRight: coord[2].Lon,
      latTopRight: coord[3].Lat
    });
  }

  render() {
    let results;
    if (this.props.noDataCustomSearch) {
      results = <div>No data found. Try different points.</div>
    } else {
      results = <div>
        <Summary 
          wind={this.props.results.windData.windSummary}
          rain={this.props.results.rainData.rainSummary}
          cloud={this.props.results.cloudData.cloudSummary}
        />
        <Wind windData={this.props.results.windData} />
        <Rain rainData={this.props.results.rainData} />
        <Clouds cloudData={this.props.results.cloudData} />
        <Temperature temperatureData={this.props.results.temperatureData} />
      </div>
    }  
    return (
      <div>
        <MapWrapper 
          cities={this.props.results.cities}
          onCustomSelect={this.handleCoordSelect}
        />
        {results}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  noDataCustomSearch: state.region.noDataCustomSearch,
})

const mapDispatchToProps = dispatch => ({
  getCustomWeatherData: coordinates => dispatch(getCustomWeatherData(coordinates))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsPage);
