import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await fetch(BASE_URL + "/profile/view", {
        credentials: "include",
      });

      const data = await res.json();
      if (res.status === 401) {
        navigate("/login");
      }
      if (!res.ok) {
        const errorMessage = data?.message;
        throw new Error(errorMessage);
      }

      dispatch(addUser(data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
