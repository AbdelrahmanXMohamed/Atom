import React, { Component } from "react";
import { Button, Carousel } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";
import moment from "moment";
import { connect } from "react-redux";

const mapState = state => {
  return {
    Booked: state.firebase.profile.notifications
  };
};
class Card extends Component {
  state = { AllBookedId: [], data: {} };
  componentDidMount() {
    //   console.log(this.props.Booked);
    if (this.props.Booked === undefined) {
      this.setState({ AllBookedId: null });
    } else {
      let AllBookedId = [];
      AllBookedId = this.props.Booked.map(x => x.TripsId);
      this.setState({ AllBookedId });
      //  console.log(AllBookedId);
    }
  }

  render() {
    /// const now = Date.parse(new Date()) / 1000;
    const { data: x, open: togglePopup } = this.props;
    if (x !== undefined) {
      //   console.log(x.Place, x);
    } else {
      //let z = x.StartTime.toString();
      // console.log(z);
      this.setState({ data: x });
    }
    return (
      <div className="w3-show-inline-block">
        {" "}<div className="w3-card-3  w3-border MobileMarge">
          <Carousel
            interval="1000"
            nextIcon={<span />}
            style={{
              height: "16.7rem",
              width: "20.5rem",
              textAlign: "center"
            }}
            prevIcon={<span />}
            pauseOnHover="true"
          >
            {x.Images.map((x, index) =>
              <Carousel.Item key={index}>
                <img src={x} className="card-img-size" alt={x.name} />
              </Carousel.Item>
            )}
          </Carousel>

          <div className="w3-container w3-center w3-white">
            <ul className="w3-ul">
              <li Style="border-bottom:0px">
                {x.Name}
              </li>
              <li Style="border-bottom:0px">
                {x.Place}
              </li>
              <li Style="border-bottom:0px">
                {typeof x.StartTime === typeof ""
                  ? moment(new Date(x.StartTime)).format("Do  MMM  YY")
                  : moment(x.StartTime.toDate()).format("Do  MMM  YY")}{" "}
                -{" "}
                {typeof x.EndTime === typeof ""
                  ? moment(new Date(x.EndTime)).format("Do  MMM  YY")
                  : moment(x.EndTime.toDate()).format("Do  MMM  YY")}
              </li>
              <li Style="border-bottom:0px">
                {x.Price} EGP
              </li>
              <li Style="border-bottom:0px">
                <StarRatingComponent value={x.Rate} editing={false} />
              </li>

              <Button variant="danger" onClick={() => togglePopup(x)}>
                All Booker
              </Button>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapState)(Card);
