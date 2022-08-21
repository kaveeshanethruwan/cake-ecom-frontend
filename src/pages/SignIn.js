import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "../redux/userSlice";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

function SignIn() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [resMsg, setResponseMessage] = useState("");
   const [loader, setLoader] = useState(false);
   const dispatch = useDispatch();

   let history = useHistory();

   // Getting Email
   const onEmailChange = (event) => {
      setEmail(event.target.value);
   };
   // Getting Password
   const onPasswordChange = (event) => {
      setPassword(event.target.value);
   };
   const signIn = () => {
      setLoader(true);
      axios
         .post("http://localhost:4000/fury/users/login", {
            email: email,
            password: password,
         })
         .then(
            (response) => {
               dispatch(setUserToken(response.data.token));
               history.push("/checkout");
               setResponseMessage("");
               setLoader(false);
            },
            (error) => {
               console.log(error.response.data);
               setResponseMessage(error.response.data);
               setLoader(false);
            }
         );
   };
   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
         <div className="max-w-md w-full space-y-8">
            <div>
               {loader ? (
                  <svg
                     className="mx-auto animate-spin bg-purple-400 h-10 w-10"
                     viewBox="0 0 24 24"
                  ></svg>
               ) : (
                  <img
                     className="mx-auto h-12 w-auto"
                     src="https://res.cloudinary.com/thushal/image/upload/v1628543789/cake_fvmavh.png"
                     alt="Workflow"
                  />
               )}

               <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Sign in to Your Account
               </h2>
               {resMsg == "" ? (
                  <p className="mt-2 text-center text-sm text-gray-600">
                     Or{" "}
                     <Link to="/signup">
                        <a className="font-medium text-indigo-600 hover:text-indigo-500">
                           sign up to Our Cake Store
                        </a>
                     </Link>
                  </p>
               ) : (
                  <p className="mt-2 text-center text-sm text-red-600">{resMsg}</p>
               )}
            </div>
            <div className="mt-8 space-y-6">
               <input type="hidden" name="remember" defaultValue="true" />
               <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                     <label htmlFor="email-address" className="sr-only">
                        Email address
                     </label>
                     <input
                        id="email-address"
                        name="email"
                        type="email"
                        value={email}
                        onChange={onEmailChange}
                        autoComplete="email"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                     />
                  </div>
                  <div>
                     <label htmlFor="password" className="sr-only">
                        Password
                     </label>
                     <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={onPasswordChange}
                        autoComplete="current-password"
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                     />
                  </div>
               </div>

               <div className="flex items-center justify-between">
                  <div className="flex items-center">
                     <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                     />
                     <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                     >
                        Remember me
                     </label>
                  </div>
               </div>

               <div>
                  <button
                     onClick={signIn}
                     className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                     <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                     Sign in
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default SignIn;
