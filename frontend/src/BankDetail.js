import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const BankDetail = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:8080/company/companies");
        setCompanies(response.data.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div style={{ padding: "4px", width: "80%", margin: "auto", marginBottom: "20px" }}>
      <h3>Companies Details</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Company UEN</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.length > 0 &&
              companies.map((company, index) => (
                <TableRow key={company.id}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.companyUEN}</TableCell>
                  <TableCell>{company.companyName}</TableCell>
                  <TableCell>{company.phoneNumber}</TableCell>
                  <TableCell>{company.email}</TableCell>
                  <TableCell>{company.position}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BankDetail;
