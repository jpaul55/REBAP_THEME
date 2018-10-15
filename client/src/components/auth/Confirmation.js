import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Confirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlParam: this.props.match.params.token,
      redirect: false
    };
    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    const paramss = {
      token: this.props.match.params.token
    };
    console.log(paramss.token);

    axios
      .get("/api/users/confirmation/" + paramss.token)
      .then(response => {
        // window.location("/login");
        console.log(response);
        this.setState({ redirect: true });
        // console.log(jwt_decode(this.props.match.params.token));
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/loginconfirmed" />;
    }
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

export default Confirmation;
