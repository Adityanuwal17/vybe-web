import React, { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const loginPayload = {
      emailId: emailId,
      password: password,
    };
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginPayload),
      });

      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }

      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error("Error: " + err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div>
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
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="input"
                placeholder="Password"
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
