import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      const res = await fetch(BASE_URL + "/feed", {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const feedData = await res.json();
      dispatch(addFeed(feedData));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!feed) {
      getFeed();
    }
  }, []);

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users found!</h1>;
  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
