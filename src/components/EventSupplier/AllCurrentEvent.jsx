import React, { Component } from "react";
import Card from "./Card";
import Booker from "./Booker";
class AllCurrentEvent extends Component {
  state = {
    showPopup: false,
    data: {}
  };
  displayBooker = e => {
    this.setState({ showPopup: !this.state.showPopup });
    this.setState({ data: e });
  };
  render() {
    //console.log(this.props);
    var trips =
      this.props.data &&
      this.props.data.filter(
        data => (data.Xid && data.Xid === this.props.user ? true : false)
      );
    return (
      <div style={{ display: "-webkit-box" }}>
        {trips &&
          trips.map(data =>
            <Card key={data.id} data={data} open={this.displayBooker} />
          )}
        {this.state.showPopup
          ? <Booker closePopup={this.displayBooker} data={this.state.data} />
          : null}
      </div>
    );
  }
}

export default AllCurrentEvent;
