const initialState = {
  data: [
    {
      name: "Atom",
      loction: "Cairo",
      StartDurtion: [20, " ", "JUNE", " ", "10", ":", "50"],
      EndDurtion: [22, " ", "JUNE", " ", "12", ":", "50"],
      image: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTrnIPRE4-_4n1ChzMSKPW-wc12UDm0OMRxQFq7fKxypsYPmydlJt7dOpW",
        "https://cdn.vox-cdn.com/thumbor/EjQXgW4zGd5jgsPFLHb69PKVxJY=/0x0:1370x781/1200x800/filters:focal(576x282:794x500)/cdn.vox-cdn.com/uploads/chorus_image/image/56644651/iphone_ten.0.png",
        "https://assets.pcmag.com/media/images/472037-iphone-x.jpg?width=1150&height=647"
      ],
      Price: 55,
      Rate: 5,
      owner: "Atom-2"
    },
    {
      name: "Atom",
      loction: "Cairo",
      //                   year/month/day/hour/min
      StartDurtion: [20, " ", "JUNE", " ", "10", ":", "50"],
      EndDurtion: [22, " ", "JUNE", " ", "12", ":", "50"],
      image: [
        "https://www.c-learning.net/storage/app/media/img/buttons/google-login-button.png",
        "https://cdn.vox-cdn.com/thumbor/EjQXgW4zGd5jgsPFLHb69PKVxJY=/0x0:1370x781/1200x800/filters:focal(576x282:794x500)/cdn.vox-cdn.com/uploads/chorus_image/image/56644651/iphone_ten.0.png",
        "https://assets.pcmag.com/media/images/472037-iphone-x.jpg?width=1150&height=647"
      ],
      Price: 5000,
      Rate: 5,
      owner: "Atom-1"
    },
    {
      name: "Atom",
      loction: "Cairo",
      StartDurtion: [20, " ", "JUNE", " ", "10", ":", "50"],
      EndDurtion: [22, " ", "JUNE", " ", "12", ":", "50"],
      image: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTrnIPRE4-_4n1ChzMSKPW-wc12UDm0OMRxQFq7fKxypsYPmydlJt7dOpW",
        "https://cdn.vox-cdn.com/thumbor/EjQXgW4zGd5jgsPFLHb69PKVxJY=/0x0:1370x781/1200x800/filters:focal(576x282:794x500)/cdn.vox-cdn.com/uploads/chorus_image/image/56644651/iphone_ten.0.png",
        "https://assets.pcmag.com/media/images/472037-iphone-x.jpg?width=1150&height=647"
      ],
      Price: 500,
      Rate: 5,
      owner: "Atom-2"
    }
  ]
};

const Trips = (state = initialState, action) => {
  return state;
};

export default Trips;
