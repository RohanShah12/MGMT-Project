import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getMethod, postMethod } from "../utils/apiCall";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import { VscGraph } from "react-icons/vsc";
import { BsPeople } from "react-icons/bs";
import { FiUserCheck } from "react-icons/fi";

const Dashboard = () => {
  const [totalClientRecords, setTotalClientRecords] = useState(0);
  const [totalProjectRecords, setTotalProjectRecords] = useState(0);
  const [totalConsultantRecords, setTotalConsultantRecords] = useState(0);

  useEffect(() => {
    fetchClientData();
    fetchProjectData();
    fetchConsultantData();
  }, []);

  const fetchClientData = async () => {
    try {
      const data = await getMethod(
        `${process.env.REACT_APP_BASE_URL}/clientDetails`
      );
      console.log("data.content ", data);
      setTotalClientRecords(data.totalElements);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const fetchProjectData = async () => {
    try {
      const data = await getMethod(
        `${process.env.REACT_APP_BASE_URL}/projectDetails`
      );
      console.log("data.content ", data);
      setTotalProjectRecords(data.totalElements);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const fetchConsultantData = async () => {
    try {
      const data = await getMethod(
        `${process.env.REACT_APP_BASE_URL}/consultantDetails`
      );
      console.log("data.content ", data);
      setTotalConsultantRecords(data.totalElements);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <div style={{ width: "16%" }}>
          <Sidebar />
        </div>
        <div
          style={{
            width: "80%",
            paddingLeft: "20px",
          }}
        >
          <div>
            <h1
              style={{ fontSize: "21px", height: "40px", paddingTop: "15px" }}
            >
              Dashboard
              <div className="content" style={{ marginTop: "60px" }}>
                <Row>
                  <Col lg="3" md="6" sm="6">
                    <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <Col md="4" xs="5">
                            <div
                              className="icon-big text-center icon-warning"
                              style={{
                                fontSize: "35px",
                                color: "#f03e76",
                              }}
                            >
                              <BsPeople />
                            </div>
                          </Col>
                          <Col md="8" xs="7">
                            <div className="numbers">
                              <p className="card-category">Clients</p>
                              <CardTitle tag="p">
                                {totalClientRecords}
                              </CardTitle>
                              <p />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                      <CardFooter
                        style={{
                          backgroundColor: " #ebeded ",
                          fontSize: "15px",
                        }}
                      >
                        <div className="stats">
                          <i className="fas fa-sync-alt" /> Total Clients
                        </div>
                      </CardFooter>
                    </Card>
                  </Col>
                  <Col lg="3" md="6" sm="6">
                    <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <Col md="4" xs="5">
                            <div
                              className="icon-big text-center icon-warning"
                              style={{
                                fontSize: "35px",
                                color: "#13cdd4",
                              }}
                            >
                              <VscGraph />
                            </div>
                          </Col>
                          <Col md="8" xs="7">
                            <div className="numbers">
                              <p className="card-category">Projects</p>
                              <CardTitle tag="p">
                                {totalProjectRecords}
                              </CardTitle>
                              <p />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                      <CardFooter
                        style={{ backgroundColor: "#ebeded", fontSize: "15px" }}
                      >
                        <div className="stats">
                          <i className="far fa-calendar" /> Total Projects
                        </div>
                      </CardFooter>
                    </Card>
                  </Col>
                  <Col lg="3" md="6" sm="6">
                    <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <Col md="4" xs="5">
                            <div
                              className="icon-big text-center icon-warning"
                              style={{
                                fontSize: "35px",
                                color: "#93c91c",
                              }}
                            >
                              <FiUserCheck />
                            </div>
                          </Col>
                          <Col md="8" xs="7">
                            <div className="numbers">
                              <p className="card-category">Consultants</p>
                              <CardTitle tag="p">
                                {totalConsultantRecords}
                              </CardTitle>
                              <p />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                      <CardFooter
                        style={{ backgroundColor: "#ebeded", fontSize: "15px" }}
                      >
                        <div className="stats">
                          <i className="far fa-clock" /> Total Consultants
                        </div>
                      </CardFooter>
                    </Card>
                  </Col>
                  {/* <Col lg="3" md="6" sm="6">
                    <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <Col md="4" xs="5">
                            <div className="icon-big text-center icon-warning">
                              <i className="nc-icon nc-favourite-28 text-primary" />
                            </div>
                          </Col>
                          <Col md="8" xs="7">
                            <div className="numbers">
                              <p className="card-category">Followers</p>
                              <CardTitle tag="p">+45K</CardTitle>
                              <p />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                      <CardFooter>
                        <div className="stats">
                          <i className="fas fa-sync-alt" /> Update now
                        </div>
                      </CardFooter>
                    </Card>
                  </Col> */}
                </Row>
              </div>
            </h1>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
