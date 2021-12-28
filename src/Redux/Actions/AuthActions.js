import { toastr } from "react-redux-toastr";
//                 Sign Up
export const SignUp = NewUser => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const CreatedUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(NewUser.Email, NewUser.Password1);
    console.log(CreatedUser);
    await CreatedUser.user.updateProfile({
      displayName: NewUser.FullName
    });
    let newUser = {
      displayName: NewUser.FullName,
      Apply: NewUser.Apply,
      email: NewUser.Email,
      phone: NewUser.Phone
    };
    await firestore
      .set(`users/${CreatedUser.user.uid}`, { ...newUser })
      .then(() => {
        toastr.success(`Welcome ${NewUser.FullName}`);
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(error => {
        toastr.error(error.message);
        dispatch({ type: "SIGNUP_ERROR", error });
      });
  };
};

//                    Log In
export const Login = loginUser => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    await firebase
      .auth()
      .signInWithEmailAndPassword(loginUser.Email, loginUser.Password)
      .then(data => {
        console.log(data);
        toastr.success(`Welcome ${data.user.displayName}`);

        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(error => {
        toastr.error(error.message);

        dispatch({ type: "LOGIN_ERROR", error });
      });
  };
};
//             Sign Out
export const SignOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        toastr.success(`Sign out Success`);

        dispatch({ type: "SIGNOUT_SUCCESS" });
      })
      .catch(error => {
        toastr.error(error.message);

        dispatch({ type: "SIGNOUT_ERROR", error });
      });
  };
};
//             Forget Password
export const UserForgetPassword = User => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .sendPasswordResetEmail(User)
      .then(() => {
        toastr.success("Please check your email");
        dispatch({ type: "USERFORGETPASSWORD_SUCCESS" });
      })
      .catch(error => {
        toastr.error(error.message);
        dispatch({ type: "USERFORGETPASSWORD_ERROR", error });
      });
  };
};
//Apply Sign Up
export const ApplySignUp = NewUser => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    let allServices = [...NewUser.checkbox];
    allServices = allServices.filter(x => {
      if (x.state === true) {
        return true;
      }
      return false;
    });
    const CreatedUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(NewUser.Email, NewUser.Password1);
    console.log(CreatedUser);
    await CreatedUser.user.updateProfile({
      displayName: NewUser.CompanyName
    });
    let newUser = {
      displayName: NewUser.CompanyName,
      Apply: NewUser.Apply,
      email: NewUser.Email,
      phone: NewUser.Phone,
      Website: NewUser.Website,
      allServices: [...allServices],
      Feedback: []
    };
    await firestore
      .set(`users/${CreatedUser.user.uid}`, { ...newUser })
      .then(
        allServices.map(x =>
          firestore.set(`${x.Name.replace(/ /g, "")}/${CreatedUser.user.uid}`, {
            ...newUser
          })
        )
      )

      .then(() => {
        toastr.success(`Welcome ${NewUser.CompanyName}`);

        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(error => {
        toastr.error(error.message);

        dispatch({ type: "SIGNUP_ERROR", error });
      });
  };
};
// Social Login
export const SocialLogin = selectedProvider => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    firebase
      .login({
        provider: selectedProvider,
        type: "popup"
      })
      .then(data => {
        toastr.success(`Welcome ${data.user.displayName}`);

        dispatch({ type: "SOCIALLOGIN_SUCCESS" });
      })
      .catch(error => {
        toastr.error(error.message);

        dispatch({ type: "SOCIALLOGIN_ERROR", error });
      });
  };
};
// Update Password
export const UpdatePassword = User => {
  return async (dispatch, getState, { getFirebase, db }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    await user
      .updatePassword(User.password1)
      .then(() => {
        toastr.success("Password Updated Success");

        dispatch({ type: "UPDATEPASSWORD_SUCCESS" });
      })
      .catch(error => {
        toastr.error(error.message);

        dispatch({ type: "UPDATEPASSWORD_ERROR", error });
      });
  };
};

export const EventSupplierForm = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const CreatedUser = await firebase.auth().currentUser;
    let Data = {
      displayName: data.CompanyName,
      Website: data.Website,
      email: data.Email,
      phone: data.Phone
    };
    await firestore
      .set(`EventSupplier/${CreatedUser.uid}`, { ...Data })
      .then(() => {
        toastr.success(`Thanks We Will Communicat With You Soon`);
      })
      .catch(error => {
        toastr.error(error.message);
      });
  };
};
