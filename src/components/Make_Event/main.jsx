import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./main.css";
import { connect } from "react-redux";

const Main = props => {
  if (!props.auth.uid) return <Redirect to="/Login" />;

  return (
    <div className="container">
      <div className="card-columns d-inline-block s4">
        {props.data.map((m, index) => {
          return (
            <div
              key={index}
              className="card"
              style={{backgroundColor:'rgba(0,0,0,0)' ,borderColor:'rgba(0,0,0,0)'}}
            >
              <Link
                to={"/MakeEvent/" + m.replace(/ /g, "")}
                className="card-text"
              >
                <div className="card-body text-center">{m}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return { auth: state.firebase.auth };
};
export default connect(mapStateToProps)(Main);
