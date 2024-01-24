import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import logo from "../assets/apmate.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { login } from "../slices/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const state = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await dispatch(
      login({
        email,
        password,
      })
    );
  };
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-8">
          <div className="card border border-light-subtle rounded-3 shadow-sm">
            <div className="card-body p-3 p-md-4 p-xl-5">
              <div className="text-center mb-3">
                <a href="#!">
                  <img src={logo} alt="BootstrapBrain Logo" width="220" />
                </a>
              </div>
              <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                Sign in to your account
              </h2>

              {state.error != null && (
                <div className="alert alert-danger" role="alert">
                  {state.error}
                </div>
              )}

              <form>
                <div className="row gy-2 overflow-hidden">
                  <div className="col-12">
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="name@example.com"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex gap-2 justify-content-between">
                      <a
                        href="#!"
                        className="link-primary text-decoration-none"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-grid my-3">
                      <button
                        className="btn btn-primary btn-lg"
                        onClick={handleLogin}
                      >
                        {state.status == "loading" ? (
                          <div
                            className="spinner-border text-dark"
                            role="status"
                          >
                            {" "}
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          "Log in"
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="col-12">
                    <p className="m-0 text-secondary text-center">
                      Don't have an account?{" "}
                      <a
                        href="#!"
                        className="link-primary text-decoration-none"
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
