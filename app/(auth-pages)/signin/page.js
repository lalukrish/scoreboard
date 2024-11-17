"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const loginValidationSchema = Yup.object({
  email: Yup.string().required("email is required"),
  password: Yup.string().required("Password is required"),
});

const page = () => {
  const router = useRouter();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleRouteSignup = () => {
    console.log("object");
    router.push("/signup");
  };

  const handleLogin = async (values) => {
    try {
      const response = await axios
        .post(`${process.env.NEXT_PUBLIC_API_POINT}/user/user-login`, values)
        .then((response) => {
          console.log("object", response);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.data.role);
          localStorage.setItem("USER_ID", response.data.data._id);
          localStorage.setItem("user_name", response.data.data.name);
          localStorage.setItem("userId", response.data.data.userId);
          setSnackbarMessage("Login successful!");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          router.push("/dashboard");
        });
    } catch (error) {
      setSnackbarMessage("Login failed. Please check your credentials.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Box className="w-full h-auto flex flex-col items-center p-6 space-y-6 mb-5">
        <Box display="flex" alignItems="center" mb={4}></Box>

        <Box
          className="w-full max-w-md bg-[#1755A7] rounded-lg mt-5"
          sx={{ boxShadow: 3, p: 3 }}
        >
          <Box className="flex justify-center mb-6">
            <Typography variant="h5" className="text-white font-bold">
              LOGIN
            </Typography>
          </Box>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched }) => (
              <Form>
                <>
                  <Field
                    as={TextField}
                    name="email"
                    label="email"
                    variant="filled"
                    fullWidth
                    sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
                    error={touched.email && Boolean(errors.email)}
                    helperText={<ErrorMessage name="email" />}
                  />
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    variant="filled"
                    type="password"
                    fullWidth
                    sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
                    error={touched.password && Boolean(errors.password)}
                    helperText={<ErrorMessage name="password" />}
                  />
                </>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="w-full h-14 bg-green-400 text-black text-lg font-semibold mt-2 hover:bg-blue hover:text-white"
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>

          <Typography variant="body2" className="text-center mt-6">
            <Link
              href="/signup"
              onClick={handleRouteSignup}
              className="text-white text-lg underline"
            >
              Register
            </Link>
          </Typography>
        </Box>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default page;
