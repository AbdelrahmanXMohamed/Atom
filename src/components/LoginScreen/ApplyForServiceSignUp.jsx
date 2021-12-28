import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { ApplySignUp } from "./../../Redux/Actions/AuthActions";
import { toastr } from "react-redux-toastr";

class ApplyForServicesSignUp extends Component {
  state = {
    CompanyName: "",
    Phone: "",
    Email: "",
    Website: "",
    Password1: "",
    Password2: "",
    error: null,
    Apply: true,
    checkbox: [
      {
        Name: "Create Whole Event",
        state: false,
        AvgPrice: null,
        AvgTime: null,
        Rate: 0,
        TotalRate: 0,
        FeedBack: []
      },
      {
        Name: "Wedding",
        state: false,
        AvgPrice: null,
        AvgTime: null,
        Rate: 0,
        TotalRate: 0,
        FeedBack: []
      },
      {
        Name: "Marketing Services",
        state: false,
        AvgPrice: null,
        AvgTime: null,
        Rate: 0,
        TotalRate: 0,
        FeedBack: []
      },
      {
        Name: "Badegting Services",
        state: false,
        AvgPrice: null,
        AvgTime: null,
        Rate: 0,
        TotalRate: 0,
        FeedBack: []
      },
      {
        Name: "Venue",
        state: false,
        AvgPrice: null,
        AvgTime: null,
        Rate: 0,
        TotalRate: 0,
        FeedBack: []
      },
      {
        Name: "Online Payment",
        state: false,
        AvgPrice: null,
        AvgTime: null,
        Rate: 0,
        TotalRate: 0,
        FeedBack: []
      },
      {
        Name: "Online Tickets",
        state: false,
        AvgPrice: null,
        AvgTime: null,
        Rate: 0,
        TotalRate: 0,
        FeedBack: []
      },
      {
        Name: "Media Coverage",
        state: false,
        AvgPrice: null,
        AvgTime: null,
        Rate: 0,
        TotalRate: 0,
        FeedBack: []
      },
      {
        Name: "Web App",
        state: false,
        AvgPrice: null,
        AvgTime: null,
        Rate: 0,
        TotalRate: 0,
        FeedBack: []
      },
      {
        Name: "Sponsors",
        state: false,
        AvgPrice: null,
        AvgTime: null,
        Rate: 0,
        TotalRate: 0,
        FeedBack: []
      }
    ]
  };
  submit = event => {
    event.preventDefault();
    let clone = [...this.state.checkbox];
    clone = clone.filter(x => (x.state ? true : false));
    if (clone.length <= 0) {
      toastr.error("You Must Choose at least one Services");
    } else {
      this.props.SignUp(this.state);
    }
  };

  OnChanage = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  };
  handleCheckBox = name => {
    const clone = [...this.state.checkbox].map(x => {
      if (x.Name === name) {
        return { ...x, state: !x.state };
      } else return x;
    });

    this.setState({ checkbox: clone });
    console.log(clone);
  };
  onChangeServices = (event, index) => {
    const clone = [...this.state.checkbox];
    if (event.target.name === "AvgPrice") {
      clone[index].AvgPrice = event.target.value;
    } else {
      clone[index].AvgTime = event.target.value;
    }

    this.setState({ checkbox: clone });
  };
  render() {
    const { Password1, Password2 } = this.state;
    const isValid = Password1 !== Password2;

    if (this.props.auth.uid) return <Redirect to="/" />;
    return (
      <form onSubmit={this.submit} className="LoginForm" autoComplete="off">
        <p className="LoginHeader">Sign Up</p>
        <input
          onChange={this.OnChanage}
          type="text"
          className="w3-input"
          name="CompanyName"
          placeholder="Company Name"
          required="on"
        />
        <input
          onChange={this.OnChanage}
          type="text"
          className="w3-input"
          name="Website"
          placeholder="Website"
          required="on"
        />
        <input
          onChange={this.OnChanage}
          type="tel"
          className="w3-input"
          name="Phone"
          pattern={"[0-9]{11}"}
          // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="Phone Number"
          required="on"
        />
        <input
          onChange={this.OnChanage}
          type="email"
          className="w3-input"
          name="Email"
          placeholder="E-mail"
          required="on"
        />
        <input
          onChange={this.OnChanage}
          type="password"
          className="w3-input"
          name="Password1"
          placeholder="Password"
          required="on"
        />
        <input
          onChange={this.OnChanage}
          type="password"
          //className="form-control form-control-sm mt-2"
          className="w3-input"
          name="Password2"
          placeholder="Confrim Password"
          required={"on"}
        />
        <br />
        <div style={{ textAlign: "left", color: " rgba(92, 145, 184, 1)" }}>
          {this.state.checkbox.map((x, index) => {
            return (
              <React.Fragment key={x.Name}>
                <input
                  type="checkbox"
                  name={x.Name}
                  onClick={() => this.handleCheckBox(x.Name)}
                />
                {x.Name}
                <div
                  style={{
                    display: this.state.checkbox[index].state ? "block" : "none"
                  }}
                >
                  <br />
                  <input
                    type="number"
                    className="w3-input"
                    placeholder="Avg Time (in Hour)"
                    name="AvgTime"
                    required={this.state.checkbox[index].state ? true : false}
                    onChange={event => this.onChangeServices(event, index)}
                  />
                  <input
                    type="number"
                    className="w3-input"
                    placeholder="Avg Price (in EGP)"
                    name="AvgPrice"
                    required={this.state.checkbox[index].state ? true : false}
                    onChange={event => this.onChangeServices(event, index)}
                  />
                </div>
                <br />
              </React.Fragment>
            );
          })}
        </div>

        <button disabled={isValid} className="btn btn-primary btnSubmit">
          Submit
        </button>
        <p className="or">
          Already a member?<Link to="/Login"> Log In</Link>
        </p>
      </form>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return { SignUp: NewUser => dispatch(ApplySignUp(NewUser)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyForServicesSignUp);
