import { connect } from 'react-redux'
import { selectRegion, getWeatherData } from '../actions/actionCreators'
import RegionFilter from '../components/regionFilter/RegionFilters'


const mapDispatchToProps = dispatch => ({
    selectRegion: selectedRegion => dispatch(selectRegion(selectedRegion)),
    getWeatherData: selectedRegion => dispatch(getWeatherData(selectedRegion))
});

export default connect(
    undefined,
    mapDispatchToProps
)(RegionFilter);