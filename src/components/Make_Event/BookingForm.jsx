import React, { Component } from "react";
import "./BookingForm.css";
import "./PopUp.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookingTrip } from "../../Redux/Actions/TripsActions";
import { connect } from "react-redux";
class BookingForm extends Component {
  state = {
    FullName: "",
    Phone: "",
    Email: "",
    Number: 1,
    Location: "",
    data: this.props.data
  };
  OnChanage = event => {
    if (event.target.name === "Number" && event.target.value < 1) {
      this.setState({ [event.target.name]: 1 });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };
  submit = e => {
    e.preventDefault();
    this.props.BookingForm(this.state);
  };
  render() {
    const isValid =
      this.state.FullName === "" ||
      this.state.Phone === "" ||
      this.state.Email === "" ||
      this.state.Location === "";
    return (
      <div className="popup fixed">
        <div className="popup\_inner" style={{ textAlign: "center" }}>
          <FontAwesomeIcon icon={faTimes} onClick={this.props.closePopup} />
          <h2 className="heading" style={{ textAlign: "center" }}>
            Booking Form
          </h2>

          <form autoComplete="off" onSubmit={this.submit}>
            <div className="BookingForm">
              <input
                onChange={this.OnChanage}
                type="text"
                className="w3-input"
                style={{ color: "#000" }}
                name="FullName"
                placeholder="Fullname"
              />
              <input
                onChange={this.OnChanage}
                type="tel"
                className="w3-input"
                style={{ color: "#000" }}
                pattern={"[0-9]{11}"}
                name="Phone"
                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="Phone Number"
              />
              <input
                onChange={this.OnChanage}
                type="email"
                className="w3-input"
                style={{ color: "#000" }}
                name="Email"
                placeholder="E-mail"
              />
              <input
                onChange={this.OnChanage}
                type="number"
                className="w3-input"
                style={{ color: "#000" }}
                min="1"
                name="Number"
                placeholder="Number of Tickets"
              />
            </div>
            <br />
            <div className="BookingForm">
              <h2 className="heading" style={{ textAlign: "center" }}>
                Way of Payment
              </h2>
              <p>Meeting Point</p>
              <input
                onChange={this.OnChanage}
                type="text"
                className="w3-input"
                style={{ color: "#000" }}
                name="Location"
                placeholder="Location"
              />
            </div>
            <p>Total Price: {this.state.Number * this.props.data.Price}</p>
            <br />

            <button
              disabled={isValid}
              className="btn btn-primary btnSubmit BookingForm"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    BookingForm: data => dispatch(BookingTrip(data))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(BookingForm);
/*
        <div class="form-group">
              <h2 class="heading">Booking Form</h2>
              <div class="controls">
                <input type="text" id="name" class="floatLabel" name="name" />
                <label for="name">Name</label>
              </div>
              <div class="controls">
                <input type="text" id="email" class="floatLabel" name="email" />
                <label for="email">Email</label>
              </div>
              <div class="controls">
                <input type="tel" id="phone" class="floatLabel" name="phone" />
                <label for="phone">Phone</label>
              </div>
              <div class="grid">
                <div class="col-2-3">
                  <div class="controls">
                    <input
                      type="text"
                      id="street"
                      class="floatLabel"
                      name="street"
                    />
                    <label for="street">Street</label>
                  </div>
                </div>
                <div class="col-1-3">
                  <div class="controls">
                    <input
                      type="number"
                      id="street-number"
                      class="floatLabel"
                      name="street-number"
                    />
                    <label for="street-number">Number</label>
                  </div>
                </div>
              </div>
              <div class="grid">
                <div class="col-2-3">
                  <div class="controls">
                    <input
                      type="text"
                      id="city"
                      class="floatLabel"
                      name="city"
                    />
                    <label for="city">City</label>
                  </div>
                </div>
                <div class="col-1-3">
                  <div class="controls">
                    <input
                      type="text"
                      id="post-code"
                      class="floatLabel"
                      name="post-code"
                    />
                    <label for="post-code">Post Code</label>
                  </div>
                </div>
              </div>
              <div class="controls">
                <input
                  type="text"
                  id="country"
                  class="floatLabel"
                  name="country"
                />
                <label for="country">Country</label>
              </div>
            </div>
            <div class="form-group">
              <h2 class="heading">Details</h2>
              <div class="grid">
                <div class="col-1-4 col-1-4-sm">
                  <div class="controls">
                    <input
                      type="date"
                      id="arrive"
                      class="floatLabel"
                      name="arrive"
                      value="<?php echo date('Y-m-d'); ?>"
                    />
                    <label for="arrive" class="label-date">
                      <i class="fa fa-calendar" />
                      &nbsp;&nbsp;Arrive
                    </label>
                  </div>
                </div>
                <div class="col-1-4 col-1-4-sm">
                  <div class="controls">
                    <input
                      type="date"
                      id="depart"
                      class="floatLabel"
                      name="depart"
                      value="<?php echo date('Y-m-d'); ?>"
                    />
                    <label for="depart" class="label-date">
                      <i class="fa fa-calendar" />
                      &nbsp;&nbsp;Depart
                    </label>
                  </div>
                </div>
              </div>
              <div class="grid">
                <div class="col-1-3 col-1-3-sm">
                  <div class="controls">
                    <i class="fa fa-sort" />
                    <select class="floatLabel">
                      <option value="blank" />
                      <option value="1">1</option>
                      <option value="2" selected>
                        2
                      </option>
                      <option value="3">3</option>
                    </select>
                    <label for="fruit">
                      <i class="fa fa-male" />
                      &nbsp;&nbsp;People
                    </label>
                  </div>
                </div>
                <div class="col-1-3 col-1-3-sm">
                  <div class="controls">
                    <i class="fa fa-sort" />
                    <select class="floatLabel">
                      <option value="blank" />
                      <option value="deluxe" selected>
                        With Bathroom
                      </option>
                      <option value="Zuri-zimmer">Without Bathroom</option>
                    </select>
                    <label for="fruit">Room</label>
                  </div>
                </div>

                <div class="col-1-3 col-1-3-sm">
                  <div class="controls">
                    <i class="fa fa-sort" />
                    <select class="floatLabel">
                      <option value="blank" />
                      <option value="single-bed">Zweibett</option>
                      <option value="double-bed" selected>
                        Doppelbett
                      </option>
                    </select>
                    <label for="fruit">Bedding</label>
                  </div>
                </div>
              </div>
              <div class="grid">
                <p class="info-text">
                  Please describe your needs e.g. Extra beds, children's cots
                </p>
                <br />
                <div class="controls">
                  <textarea name="comments" class="floatLabel" id="comments" />
                  <label for="comments">Comments</label>
                </div>
                <button type="submit" value="Submit" class="col-1-4">
                  Submit
                </button>
              </div>
            </div>*/
