import React, { useState, useEffect } from "react";

import { TextField, Button, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ProjectTable from "../components/ProjectTable";
import ClientTable from "../components/ClientTable";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { getMethod, postMethod, putMethod } from "../utils/apiCall";
import SowmapTable from "../components/SowmapTable";

const Mapsow = () => {
  const [addbutton, setAddbutton] = useState(true);
  const [sowMapId, setSowMapId] = useState("");

  const [sowOptions, setSowOptions] = useState([]);
  const [consultantOptions, setConsultantOptions] = useState([]);
  const [loadData, setLoadData] = useState(false);

  const [postData, setPostData] = useState({
    sowId: "",
    consultantId: "",
  });

  useEffect(() => {
    fetchProjectData();
    fetchConsultantData();
  }, []);

  const fetchProjectData = async () => {
    try {
      const data = await getMethod(
        `${process.env.REACT_APP_BASE_URL}/sowDetails`
      );
      setSowOptions(data.content);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const fetchConsultantData = async () => {
    try {
      const data = await getMethod(
        `${process.env.REACT_APP_BASE_URL}/consultantDetails`
      );
      setConsultantOptions(data.content);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("in post ", process.env.REACT_APP_BASE_URL);
    const newBody = {
      sowDetails: {
        sowId: postData.sowId,
      },
      consultantDetails: {
        consultantId: postData.consultantId,
      },
    };
    if (addbutton) {
      try {
        const response = await postMethod(
          `${process.env.REACT_APP_BASE_URL}/insertSowMappingDetails`,
          newBody
        );

        if (response.clientId !== null) {
          setLoadData(true);
          toast.success("Sow Map data added successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });

          setPostData((postData) => ({
            ...postData,
            sowId: "",
            consultantId: "",
          }));
        }

        console.log("Post response:", response);
        // Handle success or further actions
      } catch (error) {
        console.error("Error posting data:", error);
        // Handle error
      }
    } else {
      const body = {
        id: sowMapId,
        sowDetails: {
          sowId: postData.sowId,
        },
        consultantDetails: {
          consultantId: postData.consultantId,
        },
      };
      console.log("body ", body);
      try {
        const response = await putMethod(
          `${process.env.REACT_APP_BASE_URL}/updateSowMappingDetails`,
          body
        );
        console.log("editdata ", response);
        //if (response.clientId !== null) {
        setLoadData(true);
        setAddbutton(true);
        toast.success("Sow map data updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setPostData((postData) => ({
          ...postData,
          sowId: "",
          consultantId: "",
        }));
        //}

        console.log("Post response:", response.clientId);
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
      sowId: data.sowId,
      consultantId: data.consultantId,
    }));
    setSowMapId(data.sowMapId);
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
              Mapping PO
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
                Add Clients
              </h2> */}
                  <div style={{ marginBottom: "15px" }}></div>
                  <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                      <FormControl style={{ width: "50%" }}>
                        <InputLabel id="demo-simple-select-label">
                          Select PO
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="client-select"
                          name="sowId"
                          value={postData.sowId}
                          label="Select PO"
                          onChange={handleInputChange}
                          size="small"
                          required
                          style={{ scrollBehavior: "auto" }}
                        >
                          {sowOptions.map((option) => (
                            <MenuItem key={option.sowId} value={option.sowId}>
                              {option.sowName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl style={{ width: "50%" }}>
                        <InputLabel id="demo-simple-select-label">
                          Select Consultant
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="client-select"
                          name="consultantId"
                          value={postData.consultantId}
                          label="Select Consultant"
                          onChange={handleInputChange}
                          size="small"
                          required
                          style={{ scrollBehavior: "auto" }}
                        >
                          {consultantOptions.map((option) => (
                            <MenuItem
                              key={option.consultantId}
                              value={option.consultantId}
                            >
                              {option.consultantName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Stack>

                    {addbutton ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                      >
                        Add Data
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                      >
                        Update
                      </Button>
                    )}
                  </form>
                  {/* <small>
                Already have an account? <Link to="/login">Login Here</Link>
              </small> */}
                </React.Fragment>
              </div>
            </div>
          </div>

          <div style={{ width: "100%", marginTop: "10px" }}>
            <SowmapTable onDataChange={handleDataChange} message={loadData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Mapsow;
