import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const saveProfileHandler = async () => {
    const paylaod = { firstName, lastName, age, gender, about, photoUrl };
    setError("");
    try {
      const res = await fetch(BASE_URL + "/profile/edit", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paylaod),
      });
      console.log(res);
      const result = await res.json();
      console.log(result);
      if (!res.ok) {
        throw new Error("Error: " + res?.status + " - " + result?.message);
      }

      dispatch(addUser(result.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1500);
    } catch (err) {
      setError(err?.message);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>
              <div>
                <fieldset className="fieldset mt-2">
                  <label className="label" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    id="firstName"
                    className="input"
                    placeholder="First Name"
                  />
                </fieldset>
                <fieldset className="fieldset mt-2">
                  <label className="label" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    id="lastName"
                    className="input"
                    placeholder="Last Name"
                  />
                </fieldset>
                <fieldset className="fieldset mt-2">
                  <label className="label" htmlFor="age">
                    Age
                  </label>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    id="age"
                    className="input"
                    placeholder="age"
                  />
                </fieldset>
                <fieldset className="fieldset mt-2">
                  <label className="label" htmlFor="photoUrl">
                    Photo Url
                  </label>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    id="photoUrl"
                    className="input"
                    placeholder="Photo Url"
                  />
                </fieldset>
                <fieldset className="fieldset mt-2">
                  <label className="label" htmlFor="gender">
                    Gender
                  </label>
                  <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    id="gender"
                    className="input"
                    placeholder="gender"
                  />
                </fieldset>
                <fieldset className="fieldset mt-2">
                  <label className="label" htmlFor="about">
                    about
                  </label>
                  <input
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    id="about"
                    className="input"
                    placeholder="about"
                  />
                </fieldset>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button
                  onClick={saveProfileHandler}
                  className="btn btn-primary"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
            profileEdit={true}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
