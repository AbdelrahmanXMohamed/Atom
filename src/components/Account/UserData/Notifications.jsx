import React from "react";
import "../MyProfile.css";
import { Acception } from "../../../Redux/Actions/ContactAndFeedbackAction";
import moment from "moment";
import { connect } from "react-redux";
import ChatRoom from "./../ChatRoom";
import { sendChatId } from "../../../Redux/Actions/ContactAndFeedbackAction";
import { pagination } from "../../../pagination";
import Pagnation from "../../CreateEventAccount/Pagnation";

const mapDispatchToProps = dispatch => {
  return {
    Acception1: data => dispatch(Acception(data)),
    sendIdToState: (id, name, xid) => dispatch(sendChatId(id, name, xid))
  };
};
class Notifications extends React.Component {
  state = { current: 1, data: null };
  Acception = (e, Accept, userId) => {
    e.preventDefault();
    let data = { Accept, userId };
    console.log(data);
    this.props.Acception1(data);
  };
  UNSAFE_componentWillMount() {
    if (this.props.data.notifications) {
      let reverse = this.props.data.notifications.reverse();

      this.setState({ data: reverse });
    } //this.setState({ Clonedata: this.props.user.Feedback });
  }
  displayChatRoom = (ChatRoom, Name, id) => {
    console.log(ChatRoom);
    this.props.sendIdToState(ChatRoom, Name, id);

    console.log(this.props.DisplayPopUp);
  };
  handlePageChange = num => {
    this.setState({ current: num });
  };
  render() {
    if (this.props.data.notifications === undefined) {
      return (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    } else if (this.props.data.notifications.length === 0) {
      return <p>No Notifications</p>;
    }
    // console.log(this.props.data.notifications.reverse());
    let AllNotification = pagination(this.state.data, this.state.current, 4);
    console.log(this.state.current, AllNotification);

    return (
      <div>
        <ul className="w3-ul" style={{ textAlign: "left" }}>
          {AllNotification &&
            AllNotification.map((x, index) =>
              <li key={index} style={{ backgroundColor: "aliceblue" }}>
                <h5 style={{ color: "#0062cc" }}>
                  {x.Name} {x.Place || x.Services}
                </h5>
                {x.Type === "AskForServices"
                  ? <React.Fragment>
                      {x.Check
                        ? <small>
                            {x.Accept
                              ? <React.Fragment>
                                  <p style={{ color: "green", margin: "0px" }}>
                                    Accepted
                                  </p>
                                  <p style={{ margin: "0px" }}>
                                    Chat Room Link :{" "}
                                    <span
                                      onClick={() =>
                                        this.displayChatRoom(
                                          x.ChatRoomId,
                                          x.Name,
                                          x.ApplyId
                                        )}
                                    >
                                      Go
                                    </span>
                                  </p>{" "}
                                </React.Fragment>
                              : <p style={{ color: "red" }}>Refused</p>}
                          </small>
                        : <small>Waiting Acception....</small>}
                    </React.Fragment>
                  : null}
                {x.Type === "Services"
                  ? <React.Fragment>
                      <small>{x.Name}</small>
                      <details>
                        <summary>More Details</summary>
                        <h5>
                          Description: <p>{x.Description}</p>
                        </h5>
                      </details>
                      {x.Check
                        ? <span>
                            {x.Accept
                              ? <p style={{ margin: "0px" }}>
                                  Chat Room Link :{" "}
                                  <span
                                    onClick={() =>
                                      this.displayChatRoom(
                                        x.ChatRoomId,
                                        x.Name,
                                        x.userId
                                      )}
                                  >
                                    Go
                                  </span>
                                </p>
                              : <p>Has Been Canceled</p>}
                          </span>
                        : <React.Fragment>
                            <button
                              className="btn btn-success"
                              onClick={e => this.Acception(e, true, x.userId)}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={e => this.Acception(e, false, x.userId)}
                            >
                              Cancel
                            </button>
                          </React.Fragment>}{" "}
                    </React.Fragment>
                  : null}
                {x.Type === "Pending"
                  ? <small>
                      {" "}Payment : {x.PendingPayment ? "Pending" : "Booked"}
                    </small>
                  : null}
                <small style={{ display: "block" }}>
                  {" "}{moment(x.date.toDate()).fromNow("hh")}
                </small>
              </li>
            )}
        </ul>
        {this.props.DisplayPopUp
          ? <ChatRoom
              displayChatRoom={this.displayChatRoom}
              ChatRoom={this.props.allChatRoom.find(
                x => x.id === this.props.ChatRoom
              )}
              allUsers={this.props.allUsers.find(
                x => x.id === this.props.xid || x.id === this.props.xid
              )}
              Name={this.props.Name}
            />
          : null}
        <br />
        <Pagnation
          dataCount={this.state.data.length}
          current={this.state.current}
          OnPageChange={this.handlePageChange}
          Size={4}
        />
      </div>
    );
  }
}
const mapState = state => {
  return {
    DisplayPopUp: state.Apply.DisplayPopUp,
    xid: state.Apply.AD,
    ChatRoom: state.Apply.ChatID
  };
};

export default connect(mapState, mapDispatchToProps)(Notifications);
