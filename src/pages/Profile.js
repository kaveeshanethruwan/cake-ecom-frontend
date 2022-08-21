import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { emailEncrypt } = useParams();
  const [_id, set_id] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [addressNo, setAddressNo] = useState("");
  const [lane, setLane] = useState("");
  const [city, setCity] = useState("");
  const [userType, setUserType] = useState("");
  const [message, setMessage] = useState("");
  const [colorGreen, setColorGreen] = useState(true);
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const onChangeName = (e) => {
    setName(e.target.value);
    setDisabled(false);
  };
  const onChangePhone = (e) => {
    setPhoneNo(e.target.value);
    setDisabled(false);
  };
  const onChangeAddressNo = (e) => {
    setAddressNo(e.target.value);
    setDisabled(false);
  };

  const onChangeLane = (e) => {
    setLane(e.target.value);
    setDisabled(false);
  };

  const onChangeCity = (e) => {
    setCity(e.target.value);
    setDisabled(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/fury/users/verify/${emailEncrypt}`)
      .then((res) => {
        set_id(res.data._id);
        setName(res.data.name);
        setEmail(res.data.email);
        setPhoneNo(res.data.phone_number);
        setAddressNo(res.data.address.address_No);
        setLane(res.data.address.lane);
        setCity(res.data.address.city);
        setUserType(res.data.userType);
      });
  }, []);

  const updateUser = (userId) => {
    setMessage("");
    setColorGreen(true);
    setVisible(false);

    axios
      .put(`http://localhost:4000/fury/users/${userId}`, {
        name: name,
        phone_number: phoneNo,
        address: { address_No: addressNo, lane: lane, city: city },
      })
      .then(
        (res) => {
          setMessage(res.data);
          setColorGreen(true);
          setVisible(true);
        },
        (error) => {
          setMessage(error.response.data);
          setColorGreen(false);
          setVisible(true);
        }
      );
  };

  return (
    <div className="md:grid md:gap-6 px-96">
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6 items-center">
            <div className="avatar placeholder col-span-6">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-32 h-32">
                <span className="text-3xl">{name.charAt(0).toUpperCase()}</span>
              </div>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                className="input input-sm input-bordered block w-full "
                value={name}
                onChange={onChangeName}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="input input-sm input-bordered block w-full"
                value={email}
                disabled="true"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="input input-sm input-bordered block w-full"
                value={phoneNo}
                onChange={onChangePhone}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                User Type
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="input input-sm input-bordered block w-full"
                value={userType}
                disabled="true"
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium text-gray-700"
              >
                Street address
              </label>
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <label
                htmlFor="address_no"
                className="block text-sm font-medium text-gray-700"
              >
                Address no
              </label>
              <input
                type="text"
                name="address_no"
                id="address_no"
                className="input input-sm input-bordered block w-full"
                value={addressNo}
                onChange={onChangeAddressNo}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                htmlFor="lane"
                className="block text-sm font-medium text-gray-700"
              >
                Lane
              </label>
              <input
                type="text"
                name="lane"
                id="lane"
                className="input input-sm input-bordered block w-full"
                value={lane}
                onChange={onChangeLane}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className="input input-sm input-bordered block w-full"
                value={city}
                onChange={onChangeCity}
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            className="btn btn-primary btn-active"
            onClick={() => updateUser(_id)}
            disabled={disabled}
          >
            Update
          </button>
        </div>
        {!visible ? null : (
          <div
            className={`${colorGreen ? "alert alert-success" : "alert alert-error"
              }`}
          >
            <div className="flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-6 h-6 mx-2 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                ></path>
              </svg>
              <label>{message}</label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Profile;
