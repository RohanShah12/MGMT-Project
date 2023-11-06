import React, { useState, useEffect } from "react";

import { TextField, Button, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import ClientTable from "../components/ClientTable";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import { getMethod, postMethod, putMethod } from "../utils/apiCall";
import ConsultantTable from "../components/ConsultantTable";

const Consultant = () => {
  const [addbutton, setAddbutton] = useState(true);
  const [consultantIdValue, setConsultantIdValue] = useState(true);
  const [project, setProject] = useState([]);
  const [loadData, setLoadData] = useState(false);

  const [postData, setPostData] = useState({
    consultantName: "",
    typeOfEmployement: "",
    reportingManager: "",
    baseLocation: "",
    workLocation: "",
    payRate: "",
    billRatePerHour: "",
    employer: "",
    contractStatus: "",
    remarks: "",
    salary: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getMethod(
        `${process.env.REACT_APP_BASE_URL}/projectDetails`
      );
      setProject(data.content);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("in post ", process.env.REACT_APP_BASE_URL);

    if (addbutton) {
      try {
        const response = await postMethod(
          `${process.env.REACT_APP_BASE_URL}/insertConsultantDetails`,
          postData
        );

        if (response.consultantId !== null) {
          setLoadData(true);
          toast.success("Consultant data added successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });

          setPostData((postData) => ({
            ...postData,
            consultantName: "",
            typeOfEmployement: "",
            reportingManager: "",
            baseLocation: "",
            workLocation: "",
            payRate: "",
            billRatePerHour: "",
            employer: "",
            contractStatus: "",
            remarks: "",
            salary: "",
          }));
        }

        console.log("Post response:", response.clientId);
        // Handle success or further actions
      } catch (error) {
        console.error("Error posting data:", error);
        // Handle error
      }
    } else {
      try {
        const body = {
          ...postData,
          consultantId: consultantIdValue,
        };
        console.log("body ", body);
        const response = await putMethod(
          `${process.env.REACT_APP_BASE_URL}/updateConsultantDetails`,
          body
        );

        if (response.consultantId !== null) {
          setLoadData(true);
          setAddbutton(true);
          toast.success("Consultant data updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });

          setPostData((postData) => ({
            ...postData,
            consultantName: "",
            typeOfEmployement: "",
            reportingManager: "",
            baseLocation: "",
            workLocation: "",
            payRate: "",
            billRatePerHour: "",
            employer: "",
            contractStatus: "",
            remarks: "",
            salary: "",
          }));
        }

        console.log("Post response:", response);
        // Handle success or further actions
      } catch (error) {
        if (error.response.status === 500) {
          console.error("Trying to update Duplicate Entry");
          toast.error("Trying to update Duplicate Entry", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          console.error("Error posting data:", error);
        }
        // Handle error
      }
    }
  };

  const handleDataChange = (data) => {
    setPostData((postData) => ({
      ...postData,
      consultantName: data.consultantName,
      typeOfEmployement: data.typeOfEmployement,
      reportingManager: data.reportingManager,
      baseLocation: data.baseLocation,
      workLocation: data.workLocation,
      payRate: data.payRate,
      billRatePerHour: data.billRatePerHour,
      employer: data.employer,
      contractStatus: data.contractStatus,
      remarks: data.remarks,
      salary: data.salary,
    }));
    setConsultantIdValue(data.consultantId);
    setAddbutton(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setLoadData(false);
  };

  return (
    <>
      <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <div style={{ width: "16%" }}>
          <Sidebar />
        </div>
        <div style={{ width: "80%", paddingLeft: "20px" }}>
          <div>
            <h1
              style={{ fontSize: "21px", height: "40px", paddingTop: "15px" }}
            >
              Consultant
            </h1>
          </div>
          <hr />
          <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
            <div
              style={{
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  border: "1px solid grey",
                  borderRadius: "4px",
                  padding: "15px",
                }}
              >
                <React.Fragment>
                  {/* <h2 style={{ fontSize: "18px", marginBottom: "20px" }}>
                Add Consultant
              </h2> */}
                  <div style={{ marginBottom: "15px" }}></div>
                  <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                      <TextField
                        type="text"
                        name="consultantName"
                        variant="outlined"
                        color="secondary"
                        label="Consultant"
                        onChange={handleInputChange}
                        value={postData.consultantName}
                        fullWidth
                        required
                        size="small"
                      />

                      <FormControl fullWidth>
                        <InputLabel id="employmentType">
                          Employment Type
                        </InputLabel>
                        <Select
                          labelId="employmentType"
                          id="typeOfEmployement"
                          name="typeOfEmployement"
                          value={postData.typeOfEmployement}
                          label="Select EndClient"
                          onChange={handleInputChange}
                          size="small"
                          required
                        >
                          <MenuItem value={"Permanent"}>Permanent</MenuItem>
                          <MenuItem value={"Contract"}>Contract</MenuItem>
                        </Select>
                      </FormControl>

                      <TextField
                        type="text"
                        name="reportingManager"
                        variant="outlined"
                        color="secondary"
                        label="Reporting Manager"
                        onChange={handleInputChange}
                        value={postData.reportingManager}
                        fullWidth
                        required
                        size="small"
                      />
                    </Stack>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                      <TextField
                        type="text"
                        name="baseLocation"
                        variant="outlined"
                        color="secondary"
                        label="Base Location"
                        onChange={handleInputChange}
                        value={postData.baseLocation}
                        fullWidth
                        required
                        size="small"
                      />

                      <TextField
                        type="text"
                        name="workLocation"
                        variant="outlined"
                        color="secondary"
                        label="Work Location"
                        onChange={handleInputChange}
                        value={postData.workLocation}
                        fullWidth
                        required
                        size="small"
                      />

                      <TextField
                        type="text"
                        name="payRate"
                        variant="outlined"
                        color="secondary"
                        label="Pay Rate"
                        onChange={handleInputChange}
                        value={postData.payRate}
                        fullWidth
                        required
                        size="small"
                      />
                    </Stack>

                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                      <TextField
                        type="text"
                        name="billRatePerHour"
                        variant="outlined"
                        color="secondary"
                        label="BillRatePerHour"
                        onChange={handleInputChange}
                        value={postData.billRatePerHour}
                        fullWidth
                        required
                        size="small"
                      />
                      <TextField
                        type="text"
                        name="employer"
                        variant="outlined"
                        color="secondary"
                        label="Employer"
                        onChange={handleInputChange}
                        value={postData.employer}
                        fullWidth
                        required
                        size="small"
                        sx={{ mb: 4 }}
                      />
                      <TextField
                        type="text"
                        name="contractStatus"
                        variant="outlined"
                        color="secondary"
                        label="Contract Status"
                        onChange={handleInputChange}
                        value={postData.contractStatus}
                        fullWidth
                        required
                        size="small"
                        sx={{ mb: 4 }}
                      />
                    </Stack>

                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                      <TextField
                        type="text"
                        name="salary"
                        variant="outlined"
                        color="secondary"
                        label="Salary"
                        onChange={handleInputChange}
                        value={postData.salary}
                        fullWidth
                        required
                        size="small"
                        sx={{ mb: 4 }}
                      />
                      <TextField
                        type="text"
                        name="remarks"
                        variant="outlined"
                        color="secondary"
                        label="Remarks"
                        onChange={handleInputChange}
                        value={postData.remarks}
                        fullWidth
                        required
                        size="small"
                        sx={{ mb: 4 }}
                      />
                    </Stack>

                    {addbutton ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                      >
                        Add Consultant
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                      >
                        Update Consultant
                      </Button>
                    )}
                  </form>
                </React.Fragment>
              </div>
            </div>
          </div>

          <div style={{ width: "100%", marginTop: "10px" }}>
            <ConsultantTable
              onDataChange={handleDataChange}
              message={loadData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Consultant;
