import React, { Component } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Booker extends Component {
  state = {};
  render() {
    console.log(this.props);

    return (
      <div className="popup fixed">
        <div className="popup\_inner" style={{ textAlign: "center" }}>
          <FontAwesomeIcon icon={faTimes} onClick={this.props.closePopup} />

          {<p>ccc</p>}
        </div>
      </div>
    );
  }
}

export default Booker;
