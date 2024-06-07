import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import useAuth from "../../app/hooks/useAuth";
import { UserRegisterValues } from "../../app/models/user";

const CreateUser = () => {
  const { register } = useAuth();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    roleId: 0,
  };

  const YupValidation = yup.object().shape({
    firstName: yup
      .string()
      .min(3, "Too Short !")
      .max(30, "Too Long !")
      .required("First Name is Required"),

    lastName: yup
      .string()
      .min(3, "Too Short !")
      .max(30, "Too Long !")
      .required("Lastname is Required"),

    email: yup
      .string()
      .email("Enter a Vaid Email")
      .required("Email is Required"),

    password: yup
      .string()
      .required("Enter Your Password")
      .min(8, "Password Should be minimum 8 character")
      .max(50, "Too long"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password does not matched")
      .required("Confirm Password is Required"),
  });

  const handleSubmit = (values: UserRegisterValues, props) => {
    values.roleId = parseInt(values.role!);
    register(values);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Register Employee
      </Typography>

      <div className="flex justify-center items-center">
        <Card sx={{ minWidth: 800 }}>
          <CardContent>
            <Formik
              initialValues={initialValues}
              validationSchema={YupValidation}
              onSubmit={handleSubmit}
            >
              {(props) => {
                return (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Field
                          as={TextField}
                          label="First Name"
                          type="text"
                          name="firstName"
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          helperText={<ErrorMessage name="firstName" />}
                          error={
                            props.errors.firstName && props.touched.firstName
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          as={TextField}
                          label="Last Name"
                          type="text"
                          name="lastName"
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          helperText={<ErrorMessage name="lastName" />}
                          error={
                            props.errors.lastName && props.touched.lastName
                          }
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <Field
                          as={TextField}
                          label="Email"
                          type="Email"
                          name="email"
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          helperText={<ErrorMessage name="email" />}
                          error={props.errors.email && props.touched.email}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label-role">
                            Role
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label-role"
                            id="demo-simple-select-role"
                            value={props.values.role}
                            label="Role"
                            onChange={props.handleChange}
                            name="role"
                            error={props.errors.role && props.touched.role}
                          >
                            <MenuItem value="1">Admin</MenuItem>
                            <MenuItem value="2">User</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          as={TextField}
                          label="Password"
                          name="password"
                          type="password"
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          helperText={<ErrorMessage name="password" />}
                          error={
                            props.errors.password && props.touched.password
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          as={TextField}
                          label="Confirm Password"
                          name="confirmPassword"
                          type="password"
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          helperText={<ErrorMessage name="confirmPassword" />}
                          error={
                            props.errors.confirmPassword &&
                            props.touched.confirmPassword
                          }
                        />
                      </Grid>

                      <Grid item xs={3}>
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          //   disabled={registerBtn && !registerError}
                          sx={{ padding: "10px" }}
                        >
                          {/* {registerBtn && !registerError ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : (
                        "Register"
                      )} */}
                          Register
                        </Button>
                      </Grid>

                      <CardContent />
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CreateUser;
