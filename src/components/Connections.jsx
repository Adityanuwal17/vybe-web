import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const response = await fetch(BASE_URL + "/user/matches", {
        credentials: "include",
      });
      const result = await response.json();
      console.log(result.data);
      dispatch(addConnections(result.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return;
  }
  if (connections.length) {
    <div className="flex  justify-center my-10">
      <h1 className="text-2xl font-bold">No connections found</h1>
    </div>;
  }
  return (
    <div className="text-center my-10">
      <h1 className="text-4xl font-bold">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, gender, age, about } =
          connection;
        return (
          <div
            key={_id}
            className="flex my-3 p-4 border rounded-lg border-gray-600 bg-black w-1/2 mx-auto"
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
