import * as React from "react";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import { Checkbox, FormControlLabel } from "@mui/material";

const TermsAndConditions = ({
  formData,
  setFormData,
  activeStep,
  setActiveStep,
  step,
  stepValidity,
  setStepValidity,
}) => {
  const { terms = false } = formData || {};

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  return (
    <div>
      <FormControlLabel
        sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}
        control={
          <Checkbox
            checked={formData["terms"]}
            onChange={handleChange}
            disabled={activeStep < step - 1}
            name={"terms"}
          />
        }
        label={
          <Typography sx={{}} color="textSecondary">
            {"By ticking, you are confirming that you have understood and are agreeing to the details mentioned:"}
          </Typography>
        }
      />
      <Typography color="textSecondary">{<ConfirmationStatements />}</Typography>
    </div>
  );
};
export default TermsAndConditions;

const ConfirmationStatements = () => {
  const confirmationItems = [
    {
      text: "I confirm that I am the authorized person to upload bank statements on behalf of my company",
    },
    {
      text: "I assure you that uploaded bank statements and provided company information match and are of the same company, if there is a mismatch then my report will not be generated",
    },
    {
      text: "I understand that this is a general report based on the bank statements and Credilinq is not providing a solution or guiding me for my business growth",
    },
    {
      text: "I have read and understand the ",
      link: {
        href: "https://smehealthcheck.credilinq.ai/terms-and-conditions",
        text: "Terms & Conditions",
      },
    },
  ];

  return (
    <ul style={{ textAlign: "left", listStyleType: "none", paddingInlineStart: 10 }}>
      {confirmationItems.map((item, index) => (
        <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
          <DoneIcon style={{ marginRight: "8px" }} />
          <span>
            {item.text}
            {item.link && (
              <a href={item.link.href} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "4px" }}>
                {item.link.text}
              </a>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
};
