import React, { Component } from "react";
import { connect } from "react-redux";

// COULD NOT FIND THE SOLUTION TO SHOW THE COMPANY ADDRRES IN THE G-MAPS EMBED
class GoogleMap extends Component {
  render() {
    const mapUrl = `https://maps.google.com/maps?q=${
      this.props.state.initMap
    }&t=&z=17&ie=UTF8&iwloc=&output=embed`;
    return (
      <div className="googleMap">
        <iframe src={mapUrl} title="google map" />
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
