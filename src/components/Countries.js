import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";

class Countries extends Component {
  handleClick = countryId => {
    this.props.showCities(countryId);
    this.activeCountry(countryId);
  };

  activeCountry(id) {
    $("li").removeClass("activeCountry");
    $(`li#${id}`).addClass("activeCountry");
  }

  render() {
    const countries = this.props.state.all.map(country => {
      return (
        <li
          key={country.id}
          id={country.id}
          onClick={() => {
            this.handleClick(country.id);
          }}
        >
          {country.country}
        </li>
      );
    });

    return (
      <div className="countries">
        <ul>{countries}</ul>
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
    showCities: countryId => {
      dispatch({ type: "SHOW_CITIES", id: countryId });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Countries);
