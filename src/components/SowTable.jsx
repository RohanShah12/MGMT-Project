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

export default function SowTable(props) {
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
        `${process.env.REACT_APP_BASE_URL}/sowDetails?page=${page}&size=${rowsPerPage}`
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
    sowName,
    projectId,
    payRate,
    contractStatus,
    projectStatus,
    clientManagerName,
    clientEmail,
    scrumMasterName,
    scrumMasterEmail,
    productOwnerName,
    productOwnerEmail,
    remarks,
    sowId
  ) => {
    console.log("endclientname ", sowName);
    const clientData = {
      sowName: sowName,
      projectId: projectId,
      payRate: payRate,
      contractStatus: contractStatus,
      projectStatus: projectStatus,
      clientManagerName: clientManagerName,
      clientEmail: clientEmail,
      scrumMasterName: scrumMasterName,
      scrumMasterEmail: scrumMasterEmail,
      productOwnerName: productOwnerName,
      productOwnerEmail: productOwnerEmail,
      remarks: remarks,
      sowId: sowId,
    };
    props.onDataChange(clientData);
  };

  const deleteData = (sowId, name) => {
    confirmAlert({
      title: "Confirm to submit",
      message: `ID ${name}, Are you sure to delete this record`,
      buttons: [
        {
          label: "Yes",
          onClick: () => confirmDelete(sowId),
        },
        {
          label: "No",
          onClick: () => console.log("Click No"),
        },
      ],
    });
  };

  const confirmDelete = async (sowId) => {
    try {
      const response = await deleteMethod(
        `${process.env.REACT_APP_BASE_URL}/softDeleteSowDetails?sowId=${sowId}&isDelete=true`
      );
      console.log("editdata ", response);

      if (response.consultantId !== null) {
        toast.success("Sow data deleted successfully", {
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
              <StyledTableCell><p>Po Name</p></StyledTableCell>
              <StyledTableCell><p>Pay Rate&nbsp;</p></StyledTableCell>
              <StyledTableCell><p>Contract Status&nbsp;</p></StyledTableCell>
              <StyledTableCell><p>Project Status&nbsp;</p></StyledTableCell>
              <StyledTableCell><p>Client Manager Name</p></StyledTableCell>
              <StyledTableCell><p>Client Email</p></StyledTableCell>
              <StyledTableCell><p>Scrum Master Name</p></StyledTableCell>
              <StyledTableCell><p>Scrum Master Email</p></StyledTableCell>
              <StyledTableCell><p>Product Owner Name</p></StyledTableCell>
              <StyledTableCell><p>Product Owner Email</p></StyledTableCell>
              <StyledTableCell><p>Status</p></StyledTableCell>
              <StyledTableCell>Remarks</StyledTableCell>
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
                  <StyledTableRow key={row.sowId}>
                    <StyledTableCell component="th" scope="row">
                      {row.sowName}
                    </StyledTableCell>
                    <StyledTableCell>{row.payRate}</StyledTableCell>
                    <StyledTableCell>{row.contractStatus}</StyledTableCell>
                    <StyledTableCell>{row.projectStatus}</StyledTableCell>
                    <StyledTableCell>{row.clientManagerName}</StyledTableCell>
                    <StyledTableCell>{row.clientEmail}</StyledTableCell>
                    <StyledTableCell>{row.scrumMasterName}</StyledTableCell>
                    <StyledTableCell>{row.scrumMasterEmail}</StyledTableCell>
                    <StyledTableCell>{row.productOwnerName}</StyledTableCell>
                    <StyledTableCell>{row.productOwnerEmail}</StyledTableCell>
                    <StyledTableCell>
                      {row.isDelete ? "InActive" : "Active"}
                    </StyledTableCell>
                    <StyledTableCell>{row.remarks}</StyledTableCell>
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
                            row.sowName,
                            row.projectId,
                            row.payRate,
                            row.contractStatus,
                            row.projectStatus,
                            row.clientManagerName,
                            row.clientEmail,
                            row.scrumMasterName,
                            row.scrumMasterEmail,
                            row.productOwnerName,
                            row.productOwnerEmail,
                            row.remarks,
                            row.sowId
                          )
                        }
                      >
                        <MdEdit />
                      </div>
                      <div
                        style={{ cursor: "pointer", marginLeft: "14px" }}
                        onClick={() => deleteData(row.sowId, row.sowName)}
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
