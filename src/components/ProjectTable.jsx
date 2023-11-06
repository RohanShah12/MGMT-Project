import React, { useState, useMemo } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getMethod, postMethod, deleteMethod } from "../utils/apiCall";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

import { styled } from "@mui/material/styles";
import { MdEdit, MdDelete } from "react-icons/md";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3e3f40",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ProjectTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rows, setRows] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);

  //const classes = useStyles();

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = useMemo(async () => {
    try {
      setLoading(true);
      const data = await getMethod(
        `${process.env.REACT_APP_BASE_URL}/projectDetails?page=${page}&size=${rowsPerPage}`
      );
      console.log("data.content ", data.content);
      setRows(data.content);
      setTotalRecords(data.totalElements);
      setLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  }, [page, rowsPerPage, props.message]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editData = (
    projectname,
    endclientname,
    sow,
    technology,
    startdate,
    enddate,
    clientid,
    projectId
  ) => {
    console.log("endclientname ", endclientname);
    const clientData = {
      clientId: clientid,
      endClientName: endclientname,
      projectName: projectname,
      technology: technology,
      sow: sow,
      sowStartDate: startdate,
      sowEndDate: enddate,
      projectId: projectId,
    };
    props.onDataChange(clientData);
  };

  const deleteData = (projectId, name) => {
    confirmAlert({
      title: "Confirm to submit",
      message: `${name}, Are you sure to delete this project`,
      buttons: [
        {
          label: "Yes",
          onClick: () => confirmDelete(projectId),
        },
        {
          label: "No",
          onClick: () => console.log("no delete"),
        },
      ],
    });
  };

  const confirmDelete = async (projectId) => {
    try {
      const response = await deleteMethod(
        `${process.env.REACT_APP_BASE_URL}/softDeleteProjectDetails?projectId=${projectId}&isDelete=true`
      );
      console.log("editdata ", response);

      if (response.projectId !== null) {
        toast.success("Project data deleted successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error posting data:", error);
      // Handle error
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Project</StyledTableCell>
              <StyledTableCell>End CLient</StyledTableCell>
              <StyledTableCell>Sow&nbsp;</StyledTableCell>
              <StyledTableCell>Technology&nbsp;</StyledTableCell>
              <StyledTableCell>Status&nbsp;</StyledTableCell>
              <StyledTableCell>Start Date&nbsp;</StyledTableCell>
              <StyledTableCell>End Date</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? ( // Display loading indicator while loading
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow key={row.projectId}>
                    <StyledTableCell component="th" scope="row">
                      {row.projectName}
                    </StyledTableCell>
                    <StyledTableCell>{row.endClientName}</StyledTableCell>
                    <StyledTableCell>{row.projectSow}</StyledTableCell>
                    <StyledTableCell>{row.technology}</StyledTableCell>
                    <StyledTableCell>
                      {row.isDelete ? "InActive" : "Active"}
                    </StyledTableCell>
                    <StyledTableCell>{row.sowStartDate}</StyledTableCell>
                    <StyledTableCell>{row.sowEndDate}</StyledTableCell>
                    <StyledTableCell
                      align="right"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "right",
                        fontSize: "18px",
                      }}
                    >
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          editData(
                            row.projectName,
                            row.endClientName,
                            row.projectSow,
                            row.technology,
                            row.sowStartDate,
                            row.sowEndDate,
                            row.clientId,
                            row.projectId
                          )
                        }
                      >
                        <MdEdit />
                      </div>
                      <div
                        style={{ cursor: "pointer", marginLeft: "14px" }}
                        onClick={() =>
                          deleteData(row.projectId, row.projectName)
                        }
                      >
                        {" "}
                        <MdDelete />{" "}
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={totalRecords}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
