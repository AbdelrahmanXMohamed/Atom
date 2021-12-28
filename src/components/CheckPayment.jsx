import React, { Component } from "react";
import Success from "./PaymentsResult/Success";
import UnSuccess from "./PaymentsResult/UnSuccess";
import { connect } from "react-redux";
import { gettingResult } from "../Redux/Actions/EventAction";
import { db } from "../config/firebase";
import { Redirect } from "react-router-dom";

class CheckPayment extends Component {
  state = {};
  handleSecure = data => {
    let Vip = db.collection("allCard").doc(`${data.order}`);
    Vip.get().then(async doc => {
      ///code
      let currentData = doc.data(); //all data inside collection
      if (currentData) {
        return true;
      } else {
        return false;
      }
    });
  };
  render() {
    var fullLink = this.props.location.search.replace(/&/g, " ");

    var order, success, massage;

    fullLink.split(" ").sort().map(x => {
      if (x.substring(0, 6) === "order=") return (order = x);
      if (x.substring(0, 13) === "data.message=") return (massage = x);
      if (x.substring(0, 8) === "success=") return (success = x);
      return 0;
    });

    massage = massage
      .slice(massage.indexOf("data.message") + "data.message".length + 1)
      .replace(/\+/g, " ")
      .split(". ");
    order = Number(order.slice(order.indexOf("order") + "order".length + 1));
    success = JSON.parse(
      success.slice(success.indexOf("success") + "success".length + 1)
    );

    let data = { order, success, massage };
    let secureResult = this.handleSecure(data);
    if (secureResult) {
      return <Redirect to="/NotFound" />;
    }
    this.props.gettingResult(data);
    return (
      <div>
        {success ? <Success massages={massage} /> : null}
        {!success ? <UnSuccess massages={massage} /> : null}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    gettingResult: data => dispatch(gettingResult(data))
  };
};
export default connect(null, mapDispatchToProps)(CheckPayment);
//?source_data.type=card&is_capture=false&profile_id=4450&refunded_amount_cents=0&order=3814483&success=true&is_void=false&is_refund=false&is_refunded=false&source_data.sub_type=Visa&txn_response_code=0&is_3d_secure=true&is_standalone_payment=true&amount_cents=798000&captured_amount=0&error_occured=false&currency=EGP&hmac=ab0acc96360c53dd011d5c60d96851f8b13aabc093802f665dcec27dec7d1b49ec3ecad280550b8c1453a292893ea4e873b2810f204c2f6f469859bb7a2d31b4&acq_response_code=00&is_auth=false&owner=5027&has_parent_transaction=false&id=1728055&source_data.pan=8769&created_at=2019-11-07T17%3A02%3A03.250762&pending=false&is_voided=false&integration_id=7209&merchant_order_id=XYZalex&data.message=Approved.
