import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";

class Company extends Component {
  handleClick(companyId) {
    this.props.showMap(companyId);
    this.activeCompany(companyId);
  }
  activeCompany(id) {
    $("li").removeClass("activeCompany");
    $(`li#${id}`).addClass("activeCompany");
  }
  render() {
    const companies = this.props.state.initCompanies.map(company => {
      return (
        <li
          onClick={() => {
            this.handleClick(company.id);
          }}
          key={company.id}
          id={company.id}
        >
          {company.companyName}
        </li>
      );
    });

    return (
      <div className="company">
        <ul>{companies}</ul>
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
    showMap: companyId => {
      dispatch({ type: "SHOW_MAP", id: companyId });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);
