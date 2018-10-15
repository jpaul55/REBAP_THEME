import React, { Component } from "react";
import logo from "../../rebap_logo.jpg";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { logoutUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorsLogin: {},
      isPath: "",
      isOnpage: false,
      isError: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  //this is shit
  onLogoutClick(e) {
    this.props.logoutUser();
    // this.props.history.push("/");
    this.props.history.push("/");
  }

  onLogoGuest() {
    const currentPaths = window.location.pathname;
    if (currentPaths.includes("loginconfirmed")) {
      this.setState({ isPath: "" });
    } else {
      this.setState({ isPath: "" });
    }
    this.props.history.push("/");
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillMount() {
    const currentPathss = window.location.pathname;

    if (currentPathss.includes("/loginconfirmed")) {
      this.setState({ isPath: "hide" });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
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

    const currentPathss = window.location.pathname;

    if (currentPathss.includes("/loginconfirmed")) {
      this.setState({ isPath: "hide" });
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const currentPath = window.location.pathname;

    if (
      (this.state.isPath === "" && currentPath.includes("loginconfirmed")) ||
      currentPath.includes("loginauth")
    ) {
      this.state.isPath = "hide";
    }

    const styleObj = {
      display: this.state.isPath
    };

    const authLinks = (
      <button className="btn-dark" onClick={this.onLogoutClick.bind(this)}>
        Log out
      </button>
    );

    const guestLinks = (
      <form
        className={"form-inline login-form " + this.state.isPath}
        onSubmit={this.onSubmit}
      >
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

    /* {!currentPath.includes("loginconfirmed") && <Login /> &&
          (!currentPath.includes("loginauth") && <Login />)} */

    // if (isAuthenticated) {
    //   return (
    //     <a href="#" onClick={this.onLogoutClick.bind(this)}>
    //       Log out
    //     </a>
    //   );
    // } else {
    //   return <Login />;
    // }

    const logoAuth = (
      <Link to="/dashboard">
        <img src={logo} alt="logo" />{" "}
      </Link>
    );

    const logoGuest = (
      <a onClick={this.onLogoGuest.bind(this)}>
        <img src={logo} alt="logos" />{" "}
      </a>
    );

    return (
      <div className="header">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <div className="logo">
                {isAuthenticated ? logoAuth : logoGuest}
              </div>
            </div>
            <div className="col-md-10">
              <div className={"login-container"}>
                {isAuthenticated ? authLinks : guestLinks}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errorsLogin: PropTypes.object.isRequired,
  passEmailAuth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errorsLogin: state.errorsLogin,
  passEmailAuth: state.passEmailAuth
});

export default connect(
  mapStateToProps,
  {
    loginUser,
    logoutUser
  }
)(withRouter(Header));
