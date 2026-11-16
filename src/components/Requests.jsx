import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    try {
      const response = await fetch(BASE_URL + "/user/requests/received", {
        credentials: "include",
      });

      const result = await response.json();
      dispatch(addRequests(result.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) {
    return;
  }
  if (requests.length) {
    <div className="flex  justify-center my-10">
      <h1 className="text-2xl font-bold">No request found</h1>
    </div>;
  }
  return (
    <div className="text-center my-10">
      <h1 className="text-4xl font-bold">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, gender, age, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex my-3 justify-between items-center p-4 border rounded-lg border-gray-600 bg-black w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo-url"
                className="w-30 h-30 rounded-full"
                src={photoUrl}
              ></img>
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " , " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-2">Reject</button>
              <button className="btn btn-secondary mx-2">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
