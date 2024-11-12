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
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const signupValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const SignupPage = () => {
  const router = useRouter();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSignup = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_POINT}/create-user`,
        values
      );

      setSnackbarMessage("Signup successful!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      router.push("/signin");
    } catch (error) {
      setSnackbarMessage("Signup failed. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Box className="w-full h-auto flex flex-col items-center p-6 space-y-6 mb-5">
        <Box
          className="w-full max-w-md bg-[#1755A7] rounded-lg mt-5"
          sx={{ boxShadow: 3, p: 3 }}
        >
          <Box className="flex justify-center mb-6">
            <Typography variant="h5" className="text-white font-bold">
              SIGN UP
            </Typography>
          </Box>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={signupValidationSchema}
            onSubmit={handleSignup}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  variant="filled"
                  fullWidth
                  sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
                  error={touched.name && Boolean(errors.name)}
                  helperText={<ErrorMessage name="name" />}
                />
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  variant="filled"
                  fullWidth
                  sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
                  error={touched.email && Boolean(errors.email)}
                  helperText={<ErrorMessage name="email" />}
                />
                <div style={{ position: "relative" }}>
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    variant="filled"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
                    error={touched.password && Boolean(errors.password)}
                    helperText={<ErrorMessage name="password" />}
                  />
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: "10px", top: "10%" }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </div>
                <div style={{ position: "relative" }}>
                  <Field
                    as={TextField}
                    name="confirmPassword"
                    label="Confirm Password"
                    variant="filled"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={<ErrorMessage name="confirmPassword" />}
                  />
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ position: "absolute", right: "10px", top: "10%" }}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="w-full h-14 bg-green-400 text-black text-lg font-semibold mt-2 hover:bg-blue hover:text-white"
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>

          <Typography variant="body2" className="text-center mt-6">
            <Link href="/signin" className="text-white text-lg underline">
              Already have an account? Login
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

export default SignupPage;
