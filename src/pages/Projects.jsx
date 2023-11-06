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
import "./Projects.css";
import { toast } from "react-toastify";
import { getMethod, postMethod, putMethod } from "../utils/apiCall";

const Projects = () => {
  const [options, setOptions] = useState([]);
  //const [selectedOption, setSelectedOption] = useState(null);
  const [postData, setPostData] = useState({
    clientId: "",
    endClientName: "",
    projectName: "",
    technology: "",
    projectSow: "",
    sowStartDate: "",
    sowEndDate: "",
  });

  const [addbutton, setAddbutton] = useState(true);
  const [projectIdValue, setProjectIdValue] = useState(true);
  const [loadData, setLoadData] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (addbutton) {
      try {
        const response = await postMethod(
          `${process.env.REACT_APP_BASE_URL}/insertProjectDetails`,
          postData
        );

        if (response.projectId !== null) {
          setLoadData(true);
          toast.success("Project data added successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });

          setPostData((postData) => ({
            ...postData,
            clientId: "",
            endClientName: "",
            projectName: "",
            technology: "",
            projectSow: "",
            sowStartDate: "",
            sowEndDate: "",
          }));

          console.log("project ", postData);
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
          projectId: projectIdValue,
        };
        console.log("body ", body);
        const response = await putMethod(
          `${process.env.REACT_APP_BASE_URL}/updateProjectDetails`,
          body
        );

        if (response.projectId !== null) {
          setLoadData(true);
          setAddbutton(true);
          toast.success("Project data updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });

          setPostData((postData) => ({
            ...postData,
            clientId: "",
            endClientName: "",
            projectName: "",
            technology: "",
            projectSow: "",
            sowStartDate: "",
            sowEndDate: "",
          }));

          console.log("project ", postData);
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getMethod(
        `${process.env.REACT_APP_BASE_URL}/clientDetails`
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
      clientId: data.clientId,
      endClientName: data.endClientName,
      projectName: data.projectName,
      technology: data.technology,
      projectSow: data.sow,
      sowStartDate: data.sowStartDate,
      sowEndDate: data.sowEndDate,
    }));
    setProjectIdValue(data.projectId);
    setAddbutton(false);
  };

  return (
    <>
      <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <div style={{ width: "16%" }}>
          <Sidebar />
        </div>
        <div className="caonatiner" >
          <div>
            <h1 className="Container_heading"
            >
              Projects
            </h1>
          </div>
          <hr />
          <div className="whole_container" >
            <div className="form_width"
             
            >
              <div className="form_container"
               
              >
                <React.Fragment>
                  <div className="after_form" ></div>
                  <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                      <FormControl  style={{ width: "32%" }}>
                        <InputLabel id="demo-simple-select-label">
                          Select Client
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="client-select"
                          name="clientId"
                          value={postData.clientId}
                          label="Select Client"
                          onChange={handleInputChange}
                          size="small"
                          required
                          style={{ scrollBehavior: "auto" }}
                        >
                          {options.map((option) => (
                            <MenuItem
                              key={option.clientId}
                              value={option.clientId}
                            >
                              {option.clientName}-{option.location}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <TextField
                        type="text"
                        name="endClientName"
                        variant="outlined"
                        color="secondary"
                        label="End Client Name"
                        onChange={handleInputChange}
                        value={postData.endClientName}
                        style={{ width: "32%" }}
                        required
                        size="small"
                      />

                      <TextField
                        type="text"
                        name="projectName"
                        variant="outlined"
                        color="secondary"
                        label="Project Name"
                        onChange={handleInputChange}
                        value={postData.projectName}
                        style={{ width: "32%" }}
                        required
                        size="small"
                      />
                    </Stack>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                      <TextField
                        type="text"
                        name="projectSow"
                        variant="outlined"
                        color="secondary"
                        label="SOW"
                        onChange={handleInputChange}
                        value={postData.projectSow}
                        style={{ width: "32%" }}
                        required
                        size="small"
                      />
                      <TextField
                        type="date"
                        name="sowStartDate"
                        variant="outlined"
                        color="secondary"
                        label="Start Date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleInputChange}
                        value={postData.sowStartDate}
                        required
                        style={{ width: "32%" }}
                        size="small"
                        sx={{ mb: 4 }}
                      />

                      <TextField
                        type="date"
                        name="sowEndDate"
                        variant="outlined"
                        color="secondary"
                        label="End Date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleInputChange}
                        value={postData.sowEndDate}
                        required
                        style={{ width: "32%" }}
                        size="small"
                        sx={{ mb: 4 }}
                      />
                    </Stack>
                    <Stack className="technologuy_css1" spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                      <TextField
                        type="text"
                        name="technology"
                        variant="outlined"
                        color="secondary"
                        label="Technology"
                        onChange={handleInputChange}
                        value={postData.technology}
                        fullWidth
                        required
                        className="technology_css"
                        size="small"
                      />
                    </Stack>

                    {addbutton ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                      >
                        Add Projects
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
                </React.Fragment>
              </div>
            </div>
          </div>

          <div style={{ width: "100%", marginTop: "10px" }}>
            <ProjectTable onDataChange={handleDataChange} message={loadData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
