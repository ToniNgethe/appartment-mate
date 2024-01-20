import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
// import userReducer from "./slices/userSlice";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     user: userReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;

import counterReducer from "./slices/counterSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;