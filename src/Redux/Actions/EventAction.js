// Card Event Payment
export const UnAuthEvent = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    // const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      let Currentdata = data;
      await firestore.set(`${data.place}/${data.order_id}`, { ...Currentdata });
      await firestore.set(`allCard/${data.order_id}`, {
        ...Currentdata,
        Success: false,
        Massage: "",
        type: "Event"
      });
    } catch (e) {
      //console.log(e);
    }
  };
};
// Kisok Event Payment

export const kisokUnAuthEvent = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    // const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      let Currentdata = data;
      await firestore.set(`${data.place}/${data.order_id}`, { ...Currentdata });
      await firestore.set(`kisok${data.place}/${data.order_id}`, {
        ...Currentdata
      });
    } catch (e) {
      //console.log(e);
    }
  };
};

// Result Card
export const gettingResult = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    // const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      let Vip = db.collection("allCard").doc(`${data.order}`);
      Vip.get().then(async doc => {
        try {
          ///code
          let currentData = doc.data(); //all data inside collection
          let copyOfData = {
            ...currentData,
            Success: data.success,
            Massage: data.massage
          };
          if (data.success && currentData.type === "Event") {
            await firestore.set(`${currentData.place}Success/${data.order}`, {
              ...copyOfData
            });
            db.collection("allCard").doc(`${data.order}`).delete();
            db.collection(`${currentData.place}`).doc(`${data.order}`).delete();
          } else if (data.success && currentData.type === "Trip") {
            await firestore.set(
              `${copyOfData.Xid + copyOfData.tripName}/${data.order_id}`,
              {
                ...copyOfData
              }
            );
            db.collection("allCard").doc(`${data.order}`).delete();
            db.collection(`${currentData.place}`).doc(`${data.order}`).delete();
          } else if (data.success === false && currentData.type === "Event") {
            await firestore.set(`${currentData.place}failed/${data.order}`, {
              ...copyOfData
            });
            db.collection("allCard").doc(`${data.order}`).delete();
          }
        } catch (e) {
          ///code
          //console.log(e);
        }
      });
      /* let Currentdata = data;
        await firestore.set(`${data.Place}/${data.order_id}`, { ...Currentdata });
        await firestore.set(`allCard/${data.order_id}`, {
          ...Currentdata,
          Success: false,
          Massage: ""
        });*/
    } catch (e) {
      //console.log(e);
    }
  };
};
// secure payment result

export const securePaymentResult = data => {
  return async (dispatch, getState, { getFirebase, getFirestore, db }) => {
    // const firebase = getFirebase();
    //    const firestore = getFirestore();
    try {
      let Vip = await db.collection("allCard").doc(`${data.order}`);
      Vip.get().then(async doc => {
        try {
          ///code
          let currentData = doc.data(); //all data inside collection
          if (currentData) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          ///code
          //console.log(e);
        }
      });
    } catch (e) {
      //console.log(e);
    }
  };
};
