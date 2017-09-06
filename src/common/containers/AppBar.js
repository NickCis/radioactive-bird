import { connect } from 'react-redux';
import AppBarComponent from '../components/AppBar';

const mapStateToProps = state => ({
  query: state.search.query,
});

export default connect(mapStateToProps)(AppBarComponent);
