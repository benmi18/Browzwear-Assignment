import React, { Component } from "react";
import { connect } from "react-redux";

// COULD NOT FIND THE SOLUTION TO SHOW THE COMPANY ADDRRES IN THE G-MAPS EMBED
class GoogleMap extends Component {
  mapUrl = "https://www.google.com/maps/embed?pb=" + this.props.state.initMap;
  render() {
    return (
      <div className="googleMap">
        <iframe src={this.mapUrl} title="google map" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};
export default connect(mapStateToProps)(GoogleMap);
