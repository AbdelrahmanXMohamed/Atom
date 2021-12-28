import React from "react";
import "./LoginScreen.css";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { Login } from "./../../Redux/Actions/AuthActions";
import { Redirect, Switch } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ForgetPassword from "./ForgetPassword";
import ApplyForServiceSignUp from "./ApplyForServiceSignUp";
const LoginScreen = props => {
  if (props.login.uid) {
    return <Redirect to="/" />;
  }
  return (
    <div className="centerlized">
      <div>
        <div className="FlexImage">
          <img src={props.logo} alt={props.title} className="LoginImage" />

          <div className="clearfix" />
          <Switch>
            <Route component={SignUp} path="/SignUp" />
            <Route component={SignIn} path="/Login" />
            <Route component={ForgetPassword} path="/ForgetPassword" />
            <Route component={ApplyForServiceSignUp} path="/ApplyForServices" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    login: state.firebase.auth,
    error: state.Auth.AuthError
  };
};
const mapDispatchToProps = dispatch => {
  return { Login: loginUser => dispatch(Login(loginUser)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
