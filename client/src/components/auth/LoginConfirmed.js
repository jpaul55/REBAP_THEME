import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import { emailPass } from "../../actions/authActions";
import classnames from "classnames";

class LoginConfirmed extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      errorsLogin: {},
      passEmailAuth: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorsLogin) {
      this.setState({ errorsLogin: nextProps.errorsLogin });
      if (nextProps.passEmailAuth.email) {
        this.setState({ email: nextProps.passEmailAuth.email });
      }
    }

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/loginauth");
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  }

  render() {
    const { errorsLogin } = this.state;

    // if (this.props.passEmailAuth.email != "") {
    //   this.state.email = this.props.passEmailAuth.email;
    // } else {
    //   this.state.email = this.state.email;
    // }

    const pStyle = {
      textAlign: "center"
    };

    return (
      <div className="intro login-con">
        <h2>Login into REBAP</h2>
        <p>{this.props.data}</p>
        <div className="login clearfix">
          <form className="form-inline login-form" onSubmit={this.onSubmit}>
            {errorsLogin.approve && (
              <div className={pStyle}>{errorsLogin.approve}</div>
            )}
            <div className="form-group col-md-6 col-md-offset-3">
              <input
                type="text"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errorsLogin.email
                })}
                placeholder="Email"
                name="email"
                onChange={this.onChange}
                value={this.state.email}
              />
              {errorsLogin.email && (
                <div className="invalid-feedback">{errorsLogin.email}</div>
              )}
            </div>

            <div className="form-group col-md-6 col-md-offset-3">
              <input
                type="password"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errorsLogin.password
                })}
                name="password"
                placeholder="Password"
                onChange={this.onChange}
                value={this.state.password}
              />
              {errorsLogin.password && (
                <div className="invalid-feedback">{errorsLogin.password}</div>
              )}
            </div>

            <div className="form-group col-md-6 col-md-offset-3 btn-container">
              <input
                type="submit"
                name="commit"
                value="Create your account"
                className="btn-dark btn-rgister"
                data-disable-with="Log In"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

LoginConfirmed.propTypes = {
  loginUser: PropTypes.func.isRequired,
  emailPass: PropTypes.func.isRequired,
  passEmailAuth: PropTypes.object.isRequired,
  errorsLogin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  errorsLogin: state.errorsLogin,
  passEmailAuth: state.passEmailAuth
});

export default connect(
  mapStateToProps,
  {
    loginUser,
    emailPass
  }
)(withRouter(LoginConfirmed));
