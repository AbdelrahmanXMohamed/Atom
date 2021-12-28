import { toastr } from "react-redux-toastr";
export const BookingTrip = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    let user = firebase.auth().currentUser;
    try {
      console.log(data);
      const ApplierForTrip = {
        name: data.FullName,
        email: data.Email,
        phone: data.Phone,
        location: data.Location,
        numberOfTickets: data.Number,
        price: data.Number * data.data.Price
      };

      await firestore.set(
        `${data.data.Name + "" + data.data.Place}/${user.uid}`,
        {
          ...ApplierForTrip
        }
      );
      let userData = db.collection("users").doc(user.uid);
      userData.get().then(async doc => {
        try {
          console.log(doc.data());
          let notifications = [];
          if (doc.data().notifications === undefined) {
            notifications = [
              {
                date: new Date(),
                PendingPayment: true,
                Type: "Pending",
                Name: data.data.Name,
                Place: data.data.Place,
                TripsId: data.data.id
              }
            ];
            await firestore.set(
              `users/${user.uid}`,
              {
                notifications
              },
              { merge: true }
            );
          } else {
            notifications = [
              ...doc.data().notifications,
              {
                date: new Date(),
                PendingPayment: true,
                Type: "Pending",
                Name: data.data.Name,
                Place: data.data.Place,
                TripsId: data.data.id
              }
            ];
            await firestore
              .update(`users/${user.uid}`, { notifications })
              .then(() => toastr.success("Booked Success"));
          }
        } catch (error) {
          toastr.error(error.message);
        }
      });
    } catch (error) {
      toastr.error(error.message);
    }
  };
};
