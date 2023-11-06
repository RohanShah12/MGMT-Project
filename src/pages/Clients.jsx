import React, { useState } from "react";

import { TextField, Button, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import ClientTable from "../components/ClientTable";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { getMethod, postMethod, putMethod } from "../utils/apiCall";
import "./Clients.css";

const Clients = () => {
  const [addbutton, setAddbutton] = useState(true);
  const [clientID, setclientID] = useState("");

  const [loadData, setLoadData] = useState(false);

  const [postData, setPostData] = useState({
    clientName: "",
    location: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("in post ", process.env.REACT_APP_BASE_URL);

    if (addbutton) {
      try {
        const response = await postMethod(
          `${process.env.REACT_APP_BASE_URL}/insertClientDetails`,
          postData
        );

        if (response.clientId !== null) {
          setLoadData(true);
          toast.success("Client data added successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });

          setPostData((postData) => ({
            ...postData,
            clientName: "",
            location: "",
          }));
        }

        console.log("Post response:", response.clientId);
        // Handle success or further actions
      } catch (error) {
        console.error("Error posting data:", error);
        // Handle error
      }
    } else {
      const body = {
        clientId: clientID,
        clientName: postData.clientName,
        location: postData.location,
      };
      console.log("body ", body);
      try {
        const response = await putMethod(
          `${process.env.REACT_APP_BASE_URL}/updateClientDetails`,
          body
        );
        console.log("editdata ", response);
        if (response.clientId !== null) {
          setLoadData(true);
          toast.success("Client data updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });

          setPostData((postData) => ({
            ...postData,
            clientName: "",
            location: "",
          }));
        }

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
      clientName: data.client,
      location: data.location,
    }));
    setclientID(data.clientId);
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
        <div className="Clients_Container" >
          <div>
            <h1 className="Clients_Heading">
              Clients
            </h1>
          </div>
          <hr />
          <div className="clients_form_container" >
            <div className="clients_from_width">
              <div className="border_size"
               
              >
                <React.Fragment>
                  {/* <h2 style={{ fontSize: "18px", marginBottom: "20px" }}>
                Add Clients
              </h2> */}
                  <div style={{ marginBottom: "15px" }}></div>
                  <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                      <TextField
                        type="text"
                        name="clientName"
                        variant="outlined"
                        color="secondary"
                        label="Company Name"
                        onChange={handleInputChange}
                        value={postData.clientName}
                        fullWidth
                        required
                        size="small"
                      />
                      {/* <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Sow"
                        onChange={(e) => setSow(e.target.value)}
                        value={sow}
                        fullWidth
                        required
                        size="small"
                      /> */}
                      <TextField
                        type="text"
                        name="location"
                        variant="outlined"
                        color="secondary"
                        label="Location"
                        onChange={handleInputChange}
                        value={postData.location}
                        fullWidth
                        required
                        size="small"
                        sx={{ mb: 4 }}
                      />
                    </Stack>

                    {/* <TextField
                  type="date"
                  variant="outlined"
                  color="secondary"
                  label="Date of Birth"
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  value={dateOfBirth}
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                /> */}
                    {addbutton ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                      >
                        Add Clients
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
            <ClientTable onDataChange={handleDataChange} message={loadData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Clients;
