import React from "react";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

const CompanyInfo = ({ formData, setFormData, activeStep, step }) => {
  const { companyUEN = "", companyName = "" } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fields = [
    {
      label: "Company UEN",
      name: "companyUEN",
      value: companyUEN,
      isValid: /^\d{8}[a-zA-Z]$/.test(companyUEN),
      helperText: "Company UEN should consist of 8 digits followed by a letter",
    },
    {
      label: "Company Name",
      name: "companyName",
      value: companyName,
      isValid: /^[a-zA-Z]+$/.test(companyName) && companyName.length >= 2,
      helperText: "Company Name should be at least 2 characters",
    },
  ];

  return (
    <Grid container spacing={2}>
      {fields.map((field) => (
        <Grid item xs={12} md={6} key={field.name}>
          <TextField
            label={field.label}
            name={field.name}
            type="text"
            value={field.value}
            onChange={handleChange}
            error={field.value.length !== 0 && activeStep === step - 1 && !field.isValid}
            helperText={field.value.length !== 0 && activeStep === step - 1 && !field.isValid && field.helperText}
            fullWidth
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CompanyInfo;
