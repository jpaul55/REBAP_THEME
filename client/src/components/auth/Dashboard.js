import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorsLogin: {},
      isError: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {}

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e, dispatch) {}

  render() {
    return (
      <div className="container">
        <h1>Please complete your profile.</h1>
      </div>
    );
  }
}

// Login.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   //emailUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errorsLogin: PropTypes.object.isRequired,
//   passEmailAuth: PropTypes.object.isRequired
// };

// const mapStateToProps = (state, dispatch) => ({
//   auth: state.auth,
//   errorsLogin: state.errorsLogin,
//   passEmailAuth: state.passEmailAuth
// });

export default connect()(withRouter(Dashboard));
