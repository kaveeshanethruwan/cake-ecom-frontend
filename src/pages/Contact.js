import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";

function Contact() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [message, setMessage] = useState("");
   const [resMsg, setResponseMessage] = useState("");

   const location = {
      address: "Fury Cake Shop",
      center: { lat: 6.8613105, lng: 79.913649 },
      zoom: 12,
      pin: { lat: 6.862946, lng: 79.8991493 },
   };
   const LocationPin = ({ text }) => (
      <div className="pin">
         <img
            src="https://res.cloudinary.com/thushal/image/upload/v1629407235/placeholder_ij98ee.png"
            alt="new"
            style={{ width: 40, height: 40 }}
         />{" "}
         <p className="pin-text">{text}</p>
      </div>
   );
   const sendMsgFun = () => {
      axios
         .post("http://localhost:4000/furycontact", {
            fullName: name,
            email: email,
            message: message,
         })
         .then(
            (response) => {
               setResponseMessage(response.data.message);
               setName("");
               setMessage("");
               setEmail("");
            },
            (error) => {
               console.log(error.response.data);
               setResponseMessage(error.response.data);
            }
         );
   };
   // Getting email
   const onEmailChange = (event) => {
      setEmail(event.target.value);
   };

   // Getting Name
   const onNameChange = (event) => {
      setName(event.target.value);
   };
   // Getting Message
   const onMessageChange = (event) => {
      setMessage(event.target.value);
   };
   return (
      <div className="container mx-auto">
         <div className="bg-gray-200 text-gray-100 px-8 py-1">
            <div className="max-w-screen-xl mt-24 px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg">
               <div className="flex flex-col justify-between">
                  <div>
                     <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                        Lets talk about everything!
                     </h2>
                     {resMsg == "" ? (
                        <div className="text-gray-700 mt-8">
                           Fill This form for futher Details
                        </div>
                     ) : resMsg == "SuccessFully Send Contact" ? (
                        <div className="text-green-500 font-extrabold mt-8 ">
                           {resMsg}
                        </div>
                     ) : (
                        <div className="text-red-500 mt-8">{resMsg}</div>
                     )}
                  </div>
               </div>
               <div className="">
                  <div>
                     <span className="uppercase text-sm text-gray-600 font-bold">
                        Full Name
                     </span>
                     <input
                        className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text"
                        value={name}
                        onChange={onNameChange}
                        placeholder="Enter Full Name"
                     />
                  </div>
                  <div className="mt-8">
                     <span className="uppercase text-sm text-gray-600 font-bold">
                        Email
                     </span>
                     <input
                        className="w-full bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        value={email}
                        onChange={onEmailChange}
                        type="text"
                        placeholder="Enter Email"
                     />
                  </div>
                  <div className="mt-8">
                     <span className="uppercase text-sm text-gray-600 font-bold">
                        Message
                     </span>
                     <textarea
                        value={message}
                        onChange={onMessageChange}
                        className="w-full h-32 bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                     ></textarea>
                  </div>
                  <div className="mt-8">
                     <button
                        onClick={sendMsgFun}
                        className="uppercase text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
                     >
                        Send Message
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <div style={{ height: "80vh", width: "100%" }}>
            <GoogleMapReact
               bootstrapURLKeys={{
                  key: process.env.REACT_APP_GOOGLEMAP_API,
               }}
               defaultCenter={location.center}
               defaultZoom={location.zoom}
            >
               <LocationPin
                  lat={location.pin.lat}
                  lng={location.pin.lng}
                  text={location.address}
               />
            </GoogleMapReact>
         </div>
      </div>
   );
}

export default Contact;
