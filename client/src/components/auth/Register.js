import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
//import { Link } from "react-router-dom";

//import DatePicker from "react-datepicker";
//import moment from "moment";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // startDate: moment(),
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      dateofbirth: "",
      prcid: "",
      // receipt: "",
      // description: "",
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fileSelectHandler = this.fileSelectHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  fileSelectHandler = event => {
    this.setState({
      receipt: event.target.files[0]
    });
  };

  onChange(e, date) {
    switch (e.target.name) {
      case "receipt":
        this.setState({ receipt: e.target.files[0] });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
    e.preventDefault();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    //   const { description, receipt } = this.state;

    // const selectedFile = e.target.receipt.file[0];
    // console.log("Selected File", selectedFile);
    //  var data = new FormData();
    // data.append("file", selectedFile);
    // console.log("Form Data", data);

    // function getFile(filePath) {
    //   return filePath.substr(filePath.lastIndexOf("\\") + 1);
    // }
    //  const bodyFormData = new FormData();
    //  console.log(this.state.receipt.name);

    // bodyFormData.append("receipt", receipt);
    // bodyFormData.append("description", description);
    // bodyFormData.append("firstname", this.state.firstname);
    // bodyFormData.append("lastname", this.state.lastname);
    // bodyFormData.append("password", this.state.password);
    // bodyFormData.append("dateofbirth", this.state.startDate);
    // bodyFormData.append("email", this.state.email);

    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      prcid: this.state.prcid
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="content">
        <div className="intro clearfix">
          <h1>Create a New REBAP Account</h1>
          <p>Real Estate Brokers Association of the Philippines</p>
          <div className="registration clearfix">
            <form onSubmit={this.onSubmit} encType="multipart/form-data">
              <div className="form-group col-md-6">
                <label htmlFor="lastname">First Name</label>
                <input
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.firstname
                  })}
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Juan"
                  value={this.state.firstname}
                  onChange={this.onChange}
                />
                {errors.firstname && (
                  <div className="invalid-feedback">{errors.firstname}</div>
                )}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="lastname">Last Name</label>

                <input
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.lastname
                  })}
                  type="text"
                  name="lastname"
                  id="last-name"
                  placeholder="Dela Cruz"
                  value={this.state.lastname}
                  onChange={this.onChange}
                />
                {errors.lastname && (
                  <div className="invalid-feedback">{errors.lastname}</div>
                )}
              </div>

              <div className="form-group col-md-12">
                <label htmlFor="username">PIC License Number</label>
                <input
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.prcid
                  })}
                  type="text"
                  name="prcid"
                  id="prcid"
                  value={this.state.prcid}
                  onChange={this.onChange}
                />
                {errors.prcid && (
                  <div className="invalid-feedback">{errors.prcid}</div>
                )}
              </div>

              <div className="form-group col-md-12">
                <label htmlFor="username">Email</label>
                <input
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.email
                  })}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="juan@gmail.com"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="form-group col-md-12">
                <label htmlFor="username">Password</label>
                <input
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password
                  })}
                  type="password"
                  name="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              <div className="form-group col-md-12 btn-container">
                <input
                  type="submit"
                  name="commit"
                  value="Create your account"
                  className="btn-dark btn-rgister"
                  data-disable-with="Create your account"
                />
              </div>
            </form>
            <div className="form-group">
              <p className="policy">
                By creating an account, you agree to REBAP's terms of use and
                privacy policy
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
