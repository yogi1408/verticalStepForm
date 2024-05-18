import * as React from "react";
import Chip from "@mui/material/Chip";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DoneIcon from "@mui/icons-material/Done";
import Typography from "@mui/material/Typography";

const UploadDocuments = ({ formData, setFormData, activeStep, setActiveStep, step, stepValidity, setStepValidity }) => {
  const { files = [] } = formData || {};

  const onDrop = async (acceptedFiles) => {
    const pdfFiles = acceptedFiles.filter((file) => file.type === "application/pdf");
    if (pdfFiles.length === 0) {
      alert("Please upload only PDF files.");
      return;
    }
    const filesWithMetadata = pdfFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      data: file,
      base64: null,
      status: "",
    }));

    await Promise.all(
      filesWithMetadata.map(
        (file, index) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const base64Data = reader.result.split(",")[1];
              filesWithMetadata[index].base64 = base64Data;
              resolve();
            };
            reader.onerror = () => {
              console.error("Error reading file:", file);
              reject(new Error("Failed to read file"));
            };
            reader.readAsDataURL(file.data);
          })
      )
    );

    try {
      const response = await axios.post("http://localhost:8080/company/upload", {
        companyUEN: formData.companyUEN,
        name: filesWithMetadata[0].name,
        content: filesWithMetadata[0].base64,
      });
      if (response.data.status === 200) {
        filesWithMetadata[0].status = "success";
      } else {
        filesWithMetadata[0].status = "error";
      }
    } catch (error) {
      console.log(error);
      filesWithMetadata[0].status = "error";
    }

    setFormData((prevData) => ({
      ...prevData,
      files: [...prevData.files, ...filesWithMetadata],
    }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: activeStep < 2 || files.length >= 6,
  });

  React.useEffect(() => {
    const updatedValidity = {
      1: true,
      2: formData.companyUEN.length == 9 && formData.companyName.length >= 2,
      3:
        (formData.email.length > 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) &&
        formData.position.length >= 2 &&
        /^[6|8|9]\d{7}$/.test(formData.phoneNumber) &&
        formData.email == formData.confirmEmail,
    };
    setStepValidity(updatedValidity);

    const validSteps = Object.keys(updatedValidity).filter((key) => updatedValidity[key]);
    if (validSteps.length > 0) {
      setActiveStep(validSteps.length - 1);
    }
  }, [formData]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed #cccccc",
              padding: "20px",
              textAlign: "center",
              backgroundColor: isDragActive ? "#f0f0f0" : "#fafafa",
              cursor: activeStep < step - 1 ? "not-allowed" : "pointer",
            }}
          >
            <input {...getInputProps()} />
            <UploadFileIcon />
            {<p>Click to upload or drag and drop Bank Statements</p>}
            <div>{files.length > 6 && <p>You have reached the maximum limit of files.</p>}</div>
          </div>
          <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {files.map((file, index) => (
              <div key={index} style={{ margin: "10px 0" }}>
                <Chip color={file.status} label={file.name} variant="outlined"></Chip>
              </div>
            ))}
          </div>
        </div>
        <UploadIconInfo />
      </div>
    </div>
  );
};

export default UploadDocuments;

const UploadIconInfo = () => {
  const infoItems = [
    {
      text: "PDFs (not scanned copies) of company's operating bank current account(s) statements for the past 6 months. Example: If today is 18 May 24, then please upload bank statements from Nov 23 to Apr 24 (both months inclusive)",
    },
    {
      text: "If your company is multi-banked, then please upload 6 months bank statements for each bank account",
    },
    {
      text: "If your file is password protected, we request you to remove the password and upload the file to avoid submission failure",
    },
    {
      text: "In case if you are facing any issue while uploading bank statements, Please contact us on ",
      link: {
        href: "mailto:support@credilinq.ai",
        text: "support@credilinq.ai",
      },
    },
  ];

  return (
    <div style={{ flex: 1 }}>
      <Typography color="textSecondary">
        <ul style={{ textAlign: "left", listStyleType: "none", paddingInlineStart: 10 }}>
          {infoItems.map((item, index) => (
            <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <DoneIcon style={{ marginRight: "8px" }} />
              <span>
                {item.text}
                {item.link && (
                  <a href={item.link.href} style={{ marginLeft: "4px" }}>
                    {item.link.text}
                  </a>
                )}
              </span>
            </li>
          ))}
        </ul>
      </Typography>
    </div>
  );
};
