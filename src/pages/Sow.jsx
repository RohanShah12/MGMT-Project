import React, { useCallback, useEffect, useRef, useState } from "react";

import { TextField, Button, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import ClientTable from "../components/ClientTable";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ProjectTable from "../components/ProjectTable";
import Sidebar from "../components/Sidebar";

import { toast } from "react-toastify";
import { getMethod, postMethod, putMethod } from "../utils/apiCall";
import SowTable from "../components/SowTable";

const Sow = () => {
  const [options, setOptions] = useState([]);
  const [sowIdValue, setSowIdValue] = useState([]);
  const [loadData, setLoadData] = useState(false);

  //const [selectedOption, setSelectedOption] = useState(null);
  const [postData, setPostData] = useState({
    sowName: "",
    projectId: "",
    payRate: "",
    contractStatus: "",
    projectStatus: "",
    clientManagerName: "",
    clientEmail: "",
    scrumMasterName: "",
    scrumMasterEmail: "",
    productOwnerName: "",
    productOwnerEmail: "",
    remarks: "",
  });

  const [addbutton, setAddbutton] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (addbutton) {
      try {
        const response = await postMethod(
          `${process.env.REACT_APP_BASE_URL}/insertSowDetails`,
          postData
        );
        //console.log("response ", response);
        if (response.projectId !== null) {
          setLoadData(true);
          toast.success("Sow data added successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });

          setPostData((postData) => ({
            ...postData,
            sowName: "",
            projectId: "",
            payRate: "",
            contractStatus: "",
            projectStatus: "",
            clientManagerName: "",
            clientEmail: "",
            scrumMasterName: "",
            scrumMasterEmail: "",
            productOwnerName: "",
            productOwnerEmail: "",
            remarks: "",
          }));
        }

        console.log("Post response:", response);
        // Handle success or further actions
      } catch (error) {
        console.error("Error posting data:", error);
        // Handle error
      }
    } else {
      try {
        const body = {
          ...postData,
          sowId: sowIdValue,
        };
        const response = await putMethod(
          `${process.env.REACT_APP_BASE_URL}/updateSowDetails`,
          body
        );
        //console.log("response ", response);
        //if (response.projectId !== null) {
        setLoadData(true);
        setAddbutton(true);
        toast.success("Sow data updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setPostData((postData) => ({
          ...postData,
          sowName: "",
          projectId: "",
          payRate: "",
          contractStatus: "",
          projectStatus: "",
          clientManagerName: "",
          clientEmail: "",
          scrumMasterName: "",
          scrumMasterEmail: "",
          productOwnerName: "",
          productOwnerEmail: "",
          remarks: "",
        }));
        //}

        console.log("Post response:", response, body);
        // Handle success or further actions
      } catch (error) {
        console.log("error.response.status ", error.response.status);
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getMethod(
        `${process.env.REACT_APP_BASE_URL}/projectDetails`
      );
      setOptions(data.content);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setLoadData(false);
  };

  const handleDataChange = (data) => {
    setPostData((postData) => ({
      ...postData,
      sowName: data.sowName,
      projectId: data.projectId,
      payRate: data.payRate,
      contractStatus: data.contractStatus,
      projectStatus: data.projectStatus,
      clientManagerName: data.clientManagerName,
      clientEmail: data.clientEmail,
      scrumMasterName: data.scrumMasterName,
      scrumMasterEmail: data.scrumMasterEmail,
      productOwnerName: data.productOwnerName,
      productOwnerEmail: data.productOwnerEmail,
      remarks: data.remarks,
    }));
    setSowIdValue(data.sowId);
    setAddbutton(false);
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
              Purchase Order
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
                  <div style={{ marginBottom: "15px" }}></div>
                  <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                      <TextField
                        type="text"
                        name="sowName"
                        variant="outlined"
                        color="secondary"
                        label="PO Name"
                        onChange={handleInputChange}
                        value={postData.sowName}
                        style={{ width: "32%" }}
                        required
                        size="small"
                      />
                      <FormControl style={{ width: "32%" }}>
                        <InputLabel id="demo-simple-select-label">
                          Select Project
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="client-select"
                          name="projectId"
                          value={postData.projectId}
                          label="Select Project"
                          onChange={handleInputChange}
                          size="small"
                          required
                          style={{ scrollBehavior: "auto" }}
                        >
                          {options.map((option) => (
                            <MenuItem
                              key={option.projectId}
                              value={option.projectId}
                            >
                              {option.projectName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <TextField
                        type="text"
                        name="payRate"
                        variant="outlined"
                        color="secondary"
                        label="PayRate"
                        onChange={handleInputChange}
                        value={postData.payRate}
                        style={{ width: "32%" }}
                        required
                        size="small"
                      />
                    </Stack>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                      <TextField
                        type="text"
                        name="contractStatus"
                        variant="outlined"
                        color="secondary"
                        label="ContractStatus"
                        onChange={handleInputChange}
                        value={postData.contractStatus}
                        style={{ width: "32%" }}
                        required
                        size="small"
                      />
                      <TextField
                        type="text"
                        name="projectStatus"
                        variant="outlined"
                        color="secondary"
                        label="ProjectStatus"
                        onChange={handleInputChange}
                        value={postData.projectStatus}
                        required
                        style={{ width: "32%" }}
                        size="small"
                      />
                      <TextField
                        type="text"
                        name="clientManagerName"
                        variant="outlined"
                        color="secondary"
                        label="ClientManagerName"
                        onChange={handleInputChange}
                        value={postData.clientManagerName}
                        style={{ width: "32%" }}
                        required
                        size="small"
                      />
                    </Stack>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                      <TextField
                        type="text"
                        name="clientEmail"
                        variant="outlined"
                        color="secondary"
                        label="ClientEmail"
                        onChange={handleInputChange}
                        value={postData.clientEmail}
                        fullWidth
                        style={{ width: "32%" }}
                        required
                        size="small"
                      />
                      <TextField
                        type="text"
                        name="scrumMasterName"
                        variant="outlined"
                        color="secondary"
                        label="ScrumMasterName"
                        onChange={handleInputChange}
                        value={postData.scrumMasterName}
                        fullWidth
                        style={{ width: "32%" }}
                        required
                        size="small"
                      />
                      <TextField
                        type="text"
                        name="scrumMasterEmail"
                        variant="outlined"
                        color="secondary"
                        label="ScrumMasterEmail"
                        onChange={handleInputChange}
                        value={postData.scrumMasterEmail}
                        fullWidth
                        style={{ width: "32%" }}
                        required
                        size="small"
                      />
                    </Stack>

                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                      <TextField
                        type="text"
                        name="productOwnerName"
                        variant="outlined"
                        color="secondary"
                        label="ProductOwnerName"
                        onChange={handleInputChange}
                        value={postData.productOwnerName}
                        fullWidth
                        style={{ width: "32%" }}
                        required
                        size="small"
                      />
                      <TextField
                        type="text"
                        name="productOwnerEmail"
                        variant="outlined"
                        color="secondary"
                        label="ProductOwnerEmail"
                        onChange={handleInputChange}
                        value={postData.productOwnerEmail}
                        fullWidth
                        style={{ width: "32%" }}
                        required
                        size="small"
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
                        style={{ width: "32%" }}
                        required
                        size="small"
                      />
                    </Stack>

                    {addbutton ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                      >
                        Add PO
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                      >
                        Update Sow
                      </Button>
                    )}
                  </form>
                </React.Fragment>
              </div>
            </div>
          </div>

          <div style={{ width: "100%", marginTop: "10px" }}>
            <SowTable onDataChange={handleDataChange} message={loadData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sow;
