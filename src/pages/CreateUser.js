import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken, setToCheckOut } from "../redux/userSlice";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function CreateUser() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressNo, setAddressNo] = useState("");
  const [laneName, setLaneName] = useState("");
  const [city, setCity] = useState("");
  const [resMsg, setResponseMessage] = useState("");

  const dispatch = useDispatch();
  const { user } = useAuth0();
  let history = useHistory();
  const { toCheckout } = useSelector((state) => state.userX);

  // Getting Name
  const onNameChange = (event) => {
    setName(event.target.value);
  };

  // Getting Phone Number
  const onPhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  // Getting Address
  const onAddressNoChange = (event) => {
    setAddressNo(event.target.value);
  };
  // Getting Lane Name
  const onLaneNameChange = (event) => {
    setLaneName(event.target.value);
  };
  // Getting City
  const onCityChange = (event) => {
    setCity(event.target.value);
  };

  const signUp = () => {
    axios.post("http://localhost:4000/fury/users", {
      name: name,
      email: user ? user.email : null,
      phone_number: phoneNumber,
      address: {
        address_No: addressNo,
        lane: laneName,
        city: city,
      },
      userType: "user",
    })
      .then(
        (response) => {
          dispatch(setUserToken(response.data.token));
          setResponseMessage("");
          if (toCheckout) {

            history.push("/checkout");
          }
          else {
            dispatch(setToCheckOut(true));
            history.push("/");
          }

        },
        (error) => {
          setResponseMessage(error.response.data);
        }
      );
  };
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-7/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Provide your shipping details here
            </h1>
            <div className="my-1 border-b text-center">
              {resMsg == "" ? (
                <div className="leading-none px-2 inline-block text-sm text-red-600 tracking-wide font-medium bg-white transform translate-y-1/2"></div>
              ) : (
                <div className="leading-none px-2 inline-block text-sm text-red-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  {resMsg}
                </div>
              )}
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-md">
                <p className="text-yellow-500  mb-2 font-bold	 text-base">
                  Signed Email as
                </p>
                <input
                  className="cursor-not-allowed w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-5"
                  type="email"
                  placeholder="Email"
                  value={user ? user.email : null}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={onNameChange}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={onPhoneNumberChange}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  placeholder="Address Lane No"
                  value={addressNo}
                  onChange={onAddressNoChange}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  placeholder="Lane Name"
                  value={laneName}
                  onChange={onLaneNameChange}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={onCityChange}
                />

                <button
                  onClick={signUp}
                  className="mt-5 tracking-wide font-semibold bg-yellow-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <span className="mr-3">NEXT</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-yellow-50 text-center hidden lg:flex">
          <img
            src="https://res.cloudinary.com/thushal/image/upload/v1629528460/Birthday_cake-amico_hseb4q.svg"
            className="w-96 mx-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
