import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
} from "../slices/counterSlice";

const Home = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div>
        <h2>{count}</h2>
        <div>
          <button onClick={() => dispatch(increment())}>Increament</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
          <button onClick={() => dispatch(incrementAsync(10))}>
            Increament By 10
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
