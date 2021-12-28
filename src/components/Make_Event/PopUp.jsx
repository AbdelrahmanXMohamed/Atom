import React from "react";
import "./PopUp.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";
import moment from "moment";
import { connect } from "react-redux";
const mapState = state => {
  return {
    Booked: state.firebase.profile.notifications
  };
};
class Popup extends React.Component {
  state = {
    AllBookedId: []
  };
  componentWillMount() {
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
    /*console.log(
      this.props.data.EndTime.toDate().getTime() -
        this.props.data.StartTime.toDate().getTime()
    );
    console.log(
      moment().diff(moment(this.props.data.StartTime.toDate()), "days")
    );
*/
    const now = Date.parse(new Date()) / 1000;
    console.log(this.props);
    return (
      <div className="popup">
        <div className="popup\_inner" style={{ textAlign: "center" }}>
          <FontAwesomeIcon icon={faTimes} onClick={this.props.closePopup} />
          <h2 className="heading" style={{ textAlign: "center" }}>
            More Information
          </h2>

          <div className="container">
            <div>
              <div className="container-fliud">
                <div className="wrapperx row">
                  <div className="preview col-md-6">
                    <div className="preview-pic tab-content">
                      <Carousel
                        interval="1000"
                        nextIcon={<span />}
                        style={{
                          height: "17em",
                          width: "-webkit-fill-available",
                          textAlign: "center"
                        }}
                        prevIcon={<span />}
                        pauseOnHover="true"
                      >
                        {this.props.data.Images.map((x, index) => (
                          <Carousel.Item key={index}>
                            <img src={x} className="dC" alt={x.name} />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    </div>
                  </div>
                  <div className="details col-md-6">
                    <h3 className="product-title">{this.props.data.Name}</h3>
                    <h4 className="product-title">{this.props.data.Place}</h4>

                    <div className="rating">
                      <span className="review-no">
                        <StarRatingComponent
                          name={this.props.data.name}
                          value={this.props.data.Rate}
                          editing={false}
                        />
                      </span>
                    </div>

                    <h4 className="price">
                      price: <span>{this.props.data.Price + " EGP"}</span>
                    </h4>
                    <div>
                      <h5 style={{ display: "inline" }}>Start At : </h5>
                      <h6 style={{ display: "inline" }}>
                        {moment(this.props.data.StartTime.toDate()).format(
                          "Do  MMM  , h:mm a "
                        )}
                      </h6>
                    </div>
                    <div>
                      <h5 style={{ display: "inline" }}>End At : </h5>
                      <h6 style={{ display: "inline" }}>
                        {moment(this.props.data.EndTime.toDate()).format(
                          "Do  MMM  , h:mm a "
                        )}
                      </h6>
                    </div>
                    <div>
                      <h5 style={{ display: "inline" }}>Remaining : </h5>
                      <h6 style={{ display: "inline" }}>
                        {moment(this.props.data.StartTime.toDate()).fromNow(
                          "hh	"
                        )}
                      </h6>
                    </div>
                    {this.props.data.StartTime.seconds - now > 1728 ? (
                      <div className="action">
                        {this.state.AllBookedId.find(
                          y => y === this.props.data.id
                        ) ? (
                          <button className="btn btn-secondary">Booked</button>
                        ) : (
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              this.props.OpenBooking(this.props.data)
                            }
                          >
                            Book now
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="action">
                        <p style={{ color: "red" }}>Out of Stock</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2
              className="heading"
              style={{
                textAlign: "center",
                width: "50%",
                margin: "auto",
                paddingTop: "15px"
              }}
            >
              Descriptions
            </h2>
            <div
              style={{ margin: "15px 0" }}
              dangerouslySetInnerHTML={{ __html: this.props.data.Description }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapState)(Popup);
