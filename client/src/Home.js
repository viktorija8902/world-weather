import React, { Component } from 'react';
import { regionList } from "./data/Regions";
import RegionFilters from "./RegionFilters";

class Home extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    console.log(body)
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="home">
        <React.StrictMode><RegionFilters regionList={regionList}/></React.StrictMode>
        {/* <p className="App-intro">{this.state.response}</p> */}
      </div>
    );
  }
}

export default Home;