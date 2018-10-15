import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";

class Login extends Component {
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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/loginauth");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/loginauth");
    }

    if (nextProps.errorsLogin) {
      this.setState({ isError: true });
    }

    // console.log(nextProps);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.props.passEmailAuth.email = this.state.email;
    this.props.passEmailAuth.password = this.state.password;
  }

  onSubmit(e, dispatch) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.passEmailAuth.email = this.state.email;
    this.props.passEmailAuth.password = this.state.password;

    this.props.loginUser(userData, this.props.history);
  }

  render() {
    return (
      <form className="form-inline login-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="input-small form-control"
          placeholder="Email"
          value={this.state.email}
          name="email"
          onChange={this.onChange}
        />
        <input
          type="password"
          className="input-small form-control"
          value={this.state.password}
          name="password"
          onChange={this.onChange}
          placeholder="Password"
        />
        <button type="submit" className="btn-dark">
          Sign in
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  //emailUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errorsLogin: PropTypes.object.isRequired,
  passEmailAuth: PropTypes.object.isRequired
};

const mapStateToProps = (state, dispatch) => ({
  auth: state.auth,
  errorsLogin: state.errorsLogin,
  passEmailAuth: state.passEmailAuth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
