import React, { Component } from "react";

class LoginAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="content">
        {/* <Login /> */}
        <div className="intro">
          <h2>Thank you!</h2>
          <br />
          <p>
            For registering, your registration will be reviewed by our admin,
            you will receive an email for verification once it has been
            approved.
          </p>
        </div>
      </div>
    );
  }
}

export default LoginAuth;
