import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstnce from "../api/axiosInstance";

// login request
type LoginRequest = {
  email: string;
  password: string;
};

type UserToken = {
  token: string;
};

type AuthApiState = {
  token?: string | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

const initialState: AuthApiState = {
  token: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.rejected, (state, action: PayloadAction<unknown>) => {
        state.error =
          (action.payload as FailedResponse).error || "Login Failed";
        state.status = "failed";
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserToken>) => {
        state.error = null;
        state.status = "idle";
        state.token = action.payload.token;
      });
  },
});

export interface FailedResponse {
  error: string;
}

// login
export const login = createAsyncThunk<
  UserToken,
  LoginRequest,
  { rejectValue: FailedResponse }
>("login", async (data: LoginRequest, thunkAPI) => {
  try {
    const login = await axiosInstnce.post("/users/login", data);
    const resData = login.data;
    if (resData.status == "01") {
      throw new Error(resData.message);
    }

    return resData;
  } catch (err) {
    console.log("====");
    console.log(err);
    if (err instanceof Error) {
      return thunkAPI.rejectWithValue({ error: err.message });
    } else {
      return thunkAPI.rejectWithValue({
        error: "An unknown error occurred.",
      });
    }
  }
});

export default authSlice.reducer;
