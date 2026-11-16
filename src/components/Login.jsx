import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError("");
    try {
      const signUpPayload = {
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
        password: password,
      };
      const response = await fetch(BASE_URL + "/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpPayload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error("Error: " + response?.status + " - " + result?.message);
      }
      dispatch(addUser(result.data));
      navigate("/profile");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };
  const handleLogin = async () => {
    const loginPayload = {
      emailId: emailId,
      password: password,
    };
    try {
      const response = await fetch(BASE_URL + "/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginPayload),
      });

      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        throw new Error("Error: " + response?.status + " - " + result?.message);
      }
      dispatch(addUser(result.data));
      navigate("/");
      return;
    } catch (err) {
      setError(err?.message || "something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">{isLoginForm ? "Login" : "Sign Up"}</h2>
          <div>
            {!isLoginForm && (
              <>
                <fieldset className="fieldset">
                  <label className="label" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    id="firstName"
                    className="input"
                    placeholder="first Name"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <label className="label" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    id="lastName"
                    className="input"
                    placeholder="Last name"
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset">
              <label className="label" htmlFor="emailId">
                Email Id
              </label>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                id="emailId"
                className="input"
                placeholder="Email Id"
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="input"
                placeholder="Password"
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="cursor-pointer m-auto py-2 hover:bg-gray-600 rounded-lg px-2"
            onClick={() => setIsLoginForm(!isLoginForm)}
          >
            {isLoginForm
              ? "New User? Sign up here!"
              : "Existing User? Login Here!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
