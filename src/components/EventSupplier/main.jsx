import React from "react";
import "./main.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { EventSupplierForm } from "../../Redux/Actions/AuthActions";
class EventSupplier extends React.Component {
  state = { CompanyName: "", Phone: "", Email: "", Website: "" };
  submit = event => {
    event.preventDefault();
    this.props.SendDataToFirebase(this.state);
    const state = { CompanyName: "", Phone: "", Email: "", Website: "" };
    this.setState({ state });
  };
  OnChanage = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    if (!this.props.auth.uid) return <Redirect to="/Login" />;

    return (
      <div className="wrapperNew">
        <form onSubmit={this.submit} className="LoginForm" autoComplete="off">
          <p className="LoginHeader">Event Supplier</p>
          <input
            onChange={this.OnChanage}
            type="text"
            className="w3-input"
            name="CompanyName"
            placeholder="Company Name"
          />
          <input
            onChange={this.OnChanage}
            type="tel"
            className="w3-input"
            pattern={"[0-9]{11}"}
            name="Phone"
            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="Phone Number"
          />
          <input
            onChange={this.OnChanage}
            type="email"
            className="w3-input"
            name="Email"
            placeholder="E-mail"
          />
          <input
            onChange={this.OnChanage}
            type="text"
            className="w3-input"
            name="Website"
            placeholder="Website"
          />

          <br />

          <button className="btn btn-primary btnSubmit">Submit</button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    SendDataToFirebase: data => dispatch(EventSupplierForm(data))
  };
};
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventSupplier);
