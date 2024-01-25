import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Navigate } from "react-router-dom";

const Home = () => {
  const homeState = useSelector((state: RootState) => state.auth);
  if (homeState.token == null) {
    return <Navigate replace to="/login" />;
  }
  return (
    <>
      <h1>Welcome to apartment mate</h1>
    </>
  );
};

export default Home;
