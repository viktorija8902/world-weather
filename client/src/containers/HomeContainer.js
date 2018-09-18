import { connect } from 'react-redux'
import Home from '../components/Home'


const mapStateToProps = state => ({
    regionData: state.region.regionData,
})

export default connect(
    mapStateToProps,
    undefined
)(Home)
