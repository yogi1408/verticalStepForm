import React from "react";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

const ApplicantInfo = ({ formData, setFormData, activeStep, setActiveStep, step, stepValidity, setStepValidity }) => {
  const { email = "", phoneNumber = "", confirmEmail = "", name = "", position = "" } = formData || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fields = [
    {
      label: "Email",
      name: "email",
      type: "text",
      value: email,
      isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      helperText: "Invalid email address",
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      type: "number",
      value: phoneNumber,
      isValid: /^[6|8|9]\d{7}$/.test(phoneNumber),
      helperText: "Invalid Singapore phone number. It should start with 6, 8, or 9 and be followed by 7 digits",
    },
    {
      label: "Full Name",
      name: "name",
      type: "text",
      value: name,
      isValid: /^[a-zA-Z ]+$/.test(name),
      helperText: "Name should be at least 1 characters",
    },
    {
      label: "Confirm Email",
      name: "confirmEmail",
      type: "text",
      value: confirmEmail,
      isValid: email.length !== 0 && email === confirmEmail,
      helperText: "Email not matched",
    },
    {
      label: "Position",
      name: "position",
      type: "text",
      value: position,
      isValid: /^[a-zA-Z]+$/.test(position) && position.length >= 2,
      helperText: "Position should be at least 2 characters",
    },
  ];

  return (
    <Grid container spacing={2}>
      {fields.map((field) => (
        <Grid item xs={12} md={6} key={field.name}>
          <TextField
            label={field.label}
            name={field.name}
            type={field.type}
            value={field.value}
            onChange={handleChange}
            error={field.value.length !== 0 && activeStep === step - 1 && !field.isValid}
            helperText={field.value.length !== 0 && activeStep === step - 1 && !field.isValid && field.helperText}
            disabled={activeStep < step - 1}
            fullWidth
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ApplicantInfo;
