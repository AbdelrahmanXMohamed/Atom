import React, { Component } from "react";

import PopUp from "../PopUp";
import "./trips.css";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import BookingForm from "./../BookingForm";
import { Redirect } from "react-router-dom";
import Card from "../Card";

const mapState = state => {
  return {
    data: state.firestore.ordered.Trips,
    auth: state.firebase.auth
  };
};

class Trips extends Component {
  state = {
    data: this.props.data,
    Filter: false,
    Max: 0,
    Min: 0,
    RateMin: 1,
    RateMax: 5,
    dataBackUp: this.props.data,
    showPopup: false,
    showBookingForm: false
  };

  updateState = () => {
    const now = Date.parse(new Date()) / 1000;
    console.log(now);
    let dumy = this.props.data.filter(x => (x.StartTime > now ? true : false));
    console.log(dumy);
  };
  FilterByrate = () => {
    let maxPrice = this.state.Max.length > 0 ? true : false;
    let minPrice = this.state.Min.length > 0 ? true : false;
    let maxRate = this.state.RateMax.length > 0 ? true : false;
    let minRate = this.state.RateMin.length > 0 ? true : false;

    const clone = [...this.state.dataBackUp];
    let data = clone.filter(x => {
      if (
        maxPrice &&
        minPrice &&
        maxRate &&
        minRate &&
        (x.Price <= this.state.Max &&
          x.Price >= this.state.Min &&
          x.Rate >= this.state.RateMin &&
          x.Rate <= this.state.RateMax)
      ) {
        /* console.log(
          "(x.Price<=this.state.Max && x.Price>=this.state.Min &&x.Rate >= this.state.RateMin&& x.Rate <=  this.state.RateMax)"
        );*/
        return true;
      } else if (
        (!maxPrice &&
          !minPrice &&
          maxRate &&
          minRate &&
          x.Rate >= this.state.RateMin &&
          x.Rate <= this.state.RateMax) ||
        (!maxRate &&
          !minRate &&
          maxPrice &&
          minPrice &&
          x.Price <= this.state.Max &&
          x.Price >= this.state.Min)
      ) {
        return true;
      } else {
        return false;
      }
    });
    this.setState({ data });
    /// console.log(this.state.data.S);
  };

  DesSortByPrice = () => {
    const clone = [...this.state.data];
    clone.sort((x, y) => x.Price - y.Price);

    this.setState({ data: clone, SortPrice: !this.state.SortPrice });
  };
  AscSortByPrice = () => {
    const clone = [...this.state.data];
    clone.sort((x, y) => x.Price - y.Price);

    clone.reverse();
    this.setState({ data: clone, SortPrice: !this.state.SortPrice });
  };
  AscSortByRate = () => {
    const clone = [...this.state.data];
    clone.sort((x, y) => x.Price - y.Price);
    this.setState({ data: clone, SortRate: !this.state.SortRate });
  };
  DesSortByRate = () => {
    const clone = [...this.state.data];
    clone.sort((x, y) => x.Price - y.Price);

    clone.reverse();
    this.setState({ data: clone, SortRate: !this.state.SortRate });
  };

  HandleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  ReSet = () => {
    this.setState({ data: this.state.dataBackUp });
  };
  togglePopup = e => {
    console.log(e);
    this.setState({
      showPopup: !this.state.showPopup,
      data: e
    });
  };
  toggleBookingForm = e => {
    console.log(e);
    if (this.state.showPopup) {
      this.setState({ showPopup: !this.state.showPopup });
    }
    this.setState({
      showBookingForm: !this.state.showBookingForm,
      data: e
    });
  };

  render() {
    if (!this.props.auth.uid) {
      return <Redirect to="/Login" />;
    }
    if (this.props.data === undefined) {
      return (
        <div style={{ textAlign: "center" }}>
          <div className="spinner-border text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
    this.updateState();
    return (
      <div>
        <div Style="text-align:center ;margin-top: 4%;">
          {this.props.data && this.props.data.length > 0 ? (
            this.props.data.map(x => {
              return (
                <Card
                  key={x.id}
                  data={x}
                  toggleBookingForm={this.toggleBookingForm}
                  togglePopup={this.togglePopup}
                />
              );
            })
          ) : (
            <p>No Trips Available Check Later</p>
          )}
        </div>
        {this.state.showPopup ? (
          <PopUp
            data={this.state.data}
            OpenBooking={this.toggleBookingForm}
            closePopup={this.togglePopup}
          />
        ) : null}
        {this.state.showBookingForm ? (
          <BookingForm
            data={this.state.data}
            closePopup={this.toggleBookingForm}
          />
        ) : null}
      </div>
    );
  }
}

export default compose(
  connect(mapState),
  firestoreConnect([{ collection: "Trips" }])
)(Trips);

/*
       <div className="w3-container" Style="    text-align: -webkit-center;">
          <h4 className="w3-center">Upcoming Event</h4>
          <div className="container-fluid">
            <Button
              variant="secondary"
              Style="float:left;"
              onClick={() => this.setState({ Filter: !this.state.Filter })}
            >
              Filter
            </Button>
            <div Style="clear:both" />
            <div Style={this.state.Filter ? "display:block;" : "display:none"}>
              <label Style="Color:#fff; float:left;">Price Range:</label>
              <input
                id="Min"
                type="number"
                onChange={this.HandleInput}
                className="form-control form-control-sm mt-2"
                Style="background-color:#000"
                min="0"
                placeholder="Min"
              />
              <input
                id="Max"
                type="number"
                onChange={this.HandleInput}
                className="form-control form-control-sm mt-2"
                Style="background-color:#000"
                min="1"
                placeholder="Max"
              />
              <div Style="clear:both" />
              <label Style="Color:#fff; float:left;">Rate Range:</label>
              <input
                id="RateMin"
                type="number"
                onChange={this.HandleInput}
                className="form-control form-control-sm mt-2"
                Style="background-color:#000"
                min="0"
                placeholder="Min"
              />
              <input
                id="RateMax"
                type="number"
                onChange={this.HandleInput}
                className="form-control form-control-sm mt-2"
                Style="background-color:#000"
                min="1"
                placeholder="Max"
              />
              <Button
                variant="secondary"
                Style="float:left;"
                onClick={this.FilterByrate}
              >
                Done
              </Button>
              <Button
                variant="secondary"
                Style="float:left;"
                onClick={this.ReSet}
              >
                ReSet
              </Button>
            </div>
          </div>
          <div className="clearfix" />
          ....
          </div>*/
