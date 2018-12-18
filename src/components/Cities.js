import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";

class Cities extends Component {
  handleClick(cityId) {
    this.props.showCompanies(cityId);
    this.activeCity(cityId);
  }
  activeCity(id) {
    $("li").removeClass("activeCity");
    $(`li#${id}`).addClass("activeCity");
  }
  render() {
    const cities = this.props.state.initCities.map(city => {
      return (
        <li
          onClick={() => {
            this.handleClick(city.id);
          }}
          key={city.id}
          id={city.id}
        >
          {city.cityName}
        </li>
      );
    });

    return (
      <div className="cities">
        <ul>{cities}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    showCompanies: cityId => {
      dispatch({ type: "SHOW_COMPANIES", id: cityId });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cities);
