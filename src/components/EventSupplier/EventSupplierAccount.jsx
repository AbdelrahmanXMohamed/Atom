import React, { Component } from "react";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRatingComponent from "react-star-rating-component";
import { Route, Switch, Redirect } from "react-router-dom";
import AllCurrentEvent from "./AllCurrentEvent";
import CreateTripForm from "./CreateTripForm";
import DataBox from "./DataBox";
import { compose } from "redux";
import { connect } from "react-redux";

import { firestoreConnect } from "react-redux-firebase";
class EventSupplierAccount extends Component {
  state = {};
  render() {
    if (!this.props.Profile.isLoaded) return <div />;
    return (
      <div className="container containerXz emp-profile">
        <form>
          <div className="row">
            <div className="col-md-4">
              <div className="containerImage profile-img ">
                <img
                  src={
                    this.props.Apply.uid === this.props.auth.uid
                      ? this.props.Apply.uid
                      : this.props.auth.photoURL ||
                        "https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png"
                  }
                  alt={this.props.auth.displayName}
                />
                <div className="file btn btn-lg btn-primary content">
                  <FontAwesomeIcon icon={faCamera} />{" "}
                  <input
                    type="file"
                    name="file"
                    onChange={this.handlingChangeImage}
                  />
                </div>
              </div>
            </div>

            <DataBox data={this.props.Profile} />
          </div>
          <div className="row">
            <div className="col-md-4">
              {this.props.Profile.Apply && this.props.Profile.Apply
                ? <div className="profile-work">
                    <p>Your Applyed Services</p>{" "}
                    <ul style={{ padding: 0 }}>
                      {this.props.Profile.allServices &&
                        this.props.Profile.allServices.map((x, index) => {
                          return (
                            <li key={index}>
                              <small>
                                {x.Name}
                              </small>
                              <div>
                                <StarRatingComponent
                                  name={x.Name}
                                  value={x.Rate / x.TotalRate}
                                  starCount={5}
                                  editing={false}
                                />
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                : null}
            </div>
            <div className="col-md-8">
              <Switch>
                <Route
                  component={() =>
                    <AllCurrentEvent
                      data={this.props.allTrips}
                      user={this.props.auth.uid}
                    />}
                  path="/EventSupplier/CurrentEvent"
                />
                <Route
                  component={() =>
                    <CreateTripForm
                      data={this.props.Profile.EventData.displayName}
                    />}
                  path="/EventSupplier/CreateTrip"
                />
                <Redirect />
              </Switch>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    Profile: state.firebase.profile,
    auth: state.firebase.auth,
    Apply: state.Apply,
    Image: state,
    allUsers: state.firestore.ordered.users,
    allChatRoom: state.firestore.ordered.ChatRoom,
    allTrips: state.firestore.ordered.Trips
  };
};
/*const mapDispatchToProps = dispatch => {
  return {
    ProfileImage: data => dispatch(ProfileImage(data)),
    UploadImageToNav: data => dispatch(getProps(data))
  };
};*/

export default compose(
  connect(mapStateToProps, null),
  firestoreConnect([
    { collection: "users" },
    { collection: "ChatRoom" },
    { collection: "Trips" }
  ])
)(EventSupplierAccount);
