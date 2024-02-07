import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { userChangeEmail } from "store/actions/user.actions";

import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  IconButton,
} from "@mui/material";

import { Close } from "@mui/icons-material";

const errorHelper = (formik, field) => ({
  error: formik.touched[field] && formik.errors[field] ? true : false,
  helperText:
    formik.touched[field] && formik.errors[field] ? formik.errors[field] : "",
});

const EmailStepper = ({ users }) => {
  const [loading, setLoading] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { email: "", newemail: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("This is required")
        .email("This is not a valid email")
        .test("match", "Please check your email", (email) => {
          return email === users.data.email;
        }),
      newemail: Yup.string()
        .required("This is required")
        .email("This is not a valid email")
        .test("match", "Please check your email", (newemail) => {
          return newemail !== users.data.email;
        }),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      dispatch(userChangeEmail(values));
      closeModal();
    },
  });

  const closeModal = () => {
    setEmailModal(false);
    setActiveStep(0);
  };

  const openModal = () => setEmailModal(true);

  const handleNext = async () => {
    const isValid = await formik.validateForm();
  
    if (isValid) {
      if (activeStep === 0) {
        // Check if the entered email matches the current email
        const isEmailMatch = formik.values.email === users.data.email;
  
        if (isEmailMatch) {
          // Move to the next step only if the email matches
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          // Display an error or handle the mismatch case as needed
          console.log("Entered email does not match the current email");
        }
      } else if (activeStep === 1) {
        // Move to the next step as we assume the email check is already done in the first step
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else if (activeStep === 2) {
        const confirmed = window.confirm("Are you sure you want to change your email?");
        if (confirmed) {
          formik.submitForm();
        }
      }
    }
  };
  

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (notifications && notifications.success) {
      console.log("Notifications success:", notifications.success);
      console.log(
        "Users data:",
        users && users.data ? users.data : "No user data"
      );
      closeModal();
    }
  }, [notifications, users]);

  return (
    <>
      <form className="mt-3 article_form" style={{ maxWidth: "250px" }}>
        <div className="form-group">
          <TextField
            style={{ width: "100%", background: 'whitesmoke' }}
            name="emailstatic"
            variant="outlined"
            value={users && users.data ? users.data.email : ""}
            disabled
          />
        </div>
        <br />
        <Button
          className="mb-3"
          variant="contained"
          color="error"
          onClick={openModal}
        >
          Edit email
        </Button>
      </form>

      <Dialog open={emailModal} onClose={closeModal} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Update your email
          <IconButton
            edge="end"
            color="inherit"
            onClick={closeModal}
            aria-label="close"
            sx={{
              marginLeft: "auto",
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            <Step>
              <StepLabel>Enter old email</StepLabel>
            </Step>
            <Step>
              <StepLabel>Enter new email</StepLabel>
            </Step>
            <Step>
              <StepLabel>Confirmation</StepLabel>
            </Step>
          </Stepper>
          {activeStep === 0 ? (
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="email"
                label="Enter your current email"
                variant="outlined"
                {...formik.getFieldProps("email")}
                {...errorHelper(formik, "email")}
              />
            </div>
          ) : null}
          {activeStep === 1 ? (
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="newemail"
                label="Enter your new email"
                variant="outlined"
                {...formik.getFieldProps("newemail")}
                {...errorHelper(formik, "newemail")}
              />
            </div>
          ) : null}
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mt: 3 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleNext}
          >
            {activeStep === 2 ? "Finish" : "Next"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmailStepper;
