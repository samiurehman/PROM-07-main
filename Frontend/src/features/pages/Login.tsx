import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Alert } from "antd";
import { useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../app/hooks/useAuth";
import useAuthContext from "../../app/hooks/useAuthContext";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loginError, setLoginError] = useState<null | string>(null);
  const { login, error, isLoading } = useAuth();
  const {
    state: { isLoggedIn },
  } = useAuthContext();
  const location = useLocation();

  const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailRef.current?.value) {
      setLoginError("Email is required");
    } else if (!passwordRef.current?.value) {
      setLoginError("Password is required");
    } else {
      const values = {
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
      };

      emailRef.current.value = "";
      passwordRef.current.value = "";

      login(values);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return (
    <div className="masthead">
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}></Grid>
        <Grid item xs={6} md={6}>
          <div className="flex justify-center items-center ">
            <Card style={{ minWidth: "500px", marginTop: "20%" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Sign in to Durham Constabulary
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  To sign in, please type in the email address for your account
                </Typography>
                {(loginError || error) && (
                  <Alert message={loginError || error} type="error" showIcon />
                )}

                <form
                  className="max-w-lg mx-auto"
                  onSubmit={handleFormSubmission}
                >
                  <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium  ">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="user@durhampolice.com"
                      required
                      ref={emailRef}
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium  ">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      ref={passwordRef}
                    />
                  </div>

                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Login
                  </button>
                </form>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
