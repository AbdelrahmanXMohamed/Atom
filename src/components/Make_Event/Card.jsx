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
  state = { AllBookedId: [] };
  componentDidMount() {
    console.log(this.props.Booked);
    if (this.props.Booked === undefined) {
      this.setState({ AllBookedId: null });
    } else {
      let AllBookedId = [];
      AllBookedId = this.props.Booked.map(x => x.TripsId);
      this.setState({ AllBookedId });
      console.log(AllBookedId);
    }
  }

  render() {
    const now = Date.parse(new Date()) / 1000;
    const { data: x, toggleBookingForm, togglePopup } = this.props;
    console.log(x.Place, x.StartTime.seconds - now);

    return (
      <div className="w3-show-inline-block">
        {" "}
        <div className="w3-card-3  w3-border MobileMarge">
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
            {x.Images.map((x, index) => (
              <Carousel.Item key={index}>
                <img src={x} className="card-img-size" alt={x.name} />
              </Carousel.Item>
            ))}
          </Carousel>

          <div className="w3-container w3-center w3-white">
            <ul className="w3-ul">
              <li Style="border-bottom:0px">{x.Name}</li>
              <li Style="border-bottom:0px">{x.Place}</li>
              <li Style="border-bottom:0px">
                {moment(x.StartTime.toDate()).format("Do  MMM  YY")} -{" "}
                {moment(x.EndTime.toDate()).format("Do  MMM  YY")}
              </li>
              <li Style="border-bottom:0px">{x.Price} EGP</li>
              <li Style="border-bottom:0px">
                <StarRatingComponent value={x.Rate} editing={false} />
              </li>
              {x.StartTime.seconds - now > 1728 ? (
                <Button
                  variant="primary"
                  onClick={
                    this.state.AllBookedId.find(y => y === x.id)
                      ? null
                      : () => toggleBookingForm(x)
                  }
                >
                  {this.state.AllBookedId.find(y => y === x.id)
                    ? "Pending..."
                    : "Book Now"}
                </Button>
              ) : (
                <Button
                  variant="secondary
                "
                >
                  Not Available
                </Button>
              )}
              <Button variant="danger " onClick={() => togglePopup(x)}>
                More details
              </Button>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapState)(Card);
