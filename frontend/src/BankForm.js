import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import { Button } from "@mui/material";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CompanyInfo from "./component/CompanyInfo";
import ApplicantInfo from "./component/ApplicantInfo";
import UploadDocuments from "./component/UploadDocuments";
import TermsAndConditions from "./component/TermsAndConditions";

export default function BankForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    companyUEN: "",
    companyName: "",
    email: "",
    confirmEmail: "",
    phoneNumber: "",
    position: "",
    name: "",
    files: [],
    terms: false,
  });
  const [stepValidity, setStepValidity] = React.useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const steps = [
    {
      label: "Company Information",
      component: CompanyInfo,
      step: 1,
    },
    {
      label: "Applicant Information",
      component: ApplicantInfo,
      step: 2,
    },
    {
      label: "Upload Documents",
      component: UploadDocuments,
      step: 3,
    },
    {
      label: "Terms & Conditions",
      component: TermsAndConditions,
      step: 4,
    },
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8080/company/create", {
        companyUEN: formData.companyUEN,
        companyName: formData.companyName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        name: formData.name,
        files: formData.files,
        terms: formData.terms,
        position: formData.position,
      });
      if (response.data && response.data.status === 200) {
        alert("Successfully created company");
        navigate("/detail");
      } else {
        alert("Something went wrong");
        setActiveStep(0);
      }
    } catch (error) {
      console.error("Error creating company:", error);
      alert("An error occurred while creating company");
      setActiveStep(0);
    } finally {
      setLoading(false);
      setActiveStep(0);
      setFormData({
        companyUEN: "",
        companyName: "",
        email: "",
        confirmEmail: "",
        phoneNumber: "",
        position: "",
        name: "",
        files: [],
        terms: false,
      });
    }
  };

  React.useEffect(() => {
    const updatedValidity = {
      1: true,
      2: formData.companyUEN.length == 9 && formData.companyName.length >= 2,
      3:
        (formData.email.length > 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) &&
        formData.position.length >= 2 &&
        /^[6|8|9]\d{7}$/.test(formData.phoneNumber) &&
        formData.email == formData.confirmEmail,
      4: formData.files.length > 0,
      5: formData.terms == true,
    };
    setStepValidity(updatedValidity);

    const validSteps = Object.keys(updatedValidity).filter((key) => updatedValidity[key]);
    if (validSteps.length > 0) {
      setActiveStep(validSteps.length - 1);
    }
  }, [formData]);

  const allStepsValid = Object.values(stepValidity).every((valid) => valid);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", backgroundColor: "#D3D3D3" }}>
          <Box sx={{ maxWidth: 1000, backgroundColor: "white", padding: 8 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step
                  key={step.label}
                  expanded={true}
                  sx={{
                    "& .MuiStepLabel-root .Mui-completed": {
                      color: "green",
                    },
                    "& .MuiStepLabel-root .Mui-active": {
                      color: "red",
                    },
                  }}
                >
                  <StepLabel>
                    <Box
                      sx={{
                        backgroundColor: "purple",
                        padding: "8px",
                        borderRadius: "4px",
                        color: "white",
                        marginBottom: "4px",
                      }}
                    >
                      {step.label}
                    </Box>
                  </StepLabel>
                  <StepContent>
                    <step.component
                      formData={formData}
                      setFormData={setFormData}
                      activeStep={activeStep}
                      setActiveStep={setActiveStep}
                      step={step.step}
                      stepValidity={stepValidity}
                      setStepValidity={setStepValidity}
                    />
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button variant="contained" disabled={!allStepsValid} onClick={handleFormSubmit}>
                Submit
              </Button>
            </div>
          </Box>
        </div>
      )}
    </>
  );
}
