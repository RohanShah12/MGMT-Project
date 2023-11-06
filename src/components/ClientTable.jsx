import React, { useEffect, useState, useCallback, useMemo } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { toast } from "react-toastify";

import { styled } from "@mui/material/styles";
import { MdEdit, MdDelete } from "react-icons/md";
import { deleteMethod, getMethod, postMethod } from "../utils/apiCall";
import CircularProgress from "@mui/material/CircularProgress";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

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

export default function ClientTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);

  //const classes = useStyles();

  // const fetchData = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     const data = await getMethod(
  //       `${process.env.REACT_APP_BASE_URL}/clientDetails?page=${page}&size=${rowsPerPage}`
  //     );
  //     console.log("data.content ", data);
  //     setTotalRecords(data.totalElements);
  //     setRows(data.content);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //     setLoading(false);
  //   }
  // }, [page, rowsPerPage]);

  // useEffect(() => {
  //   console.log("propschange ", props.message);
  //   fetchData();
  // }, [fetchData, page, rowsPerPage, props.message]);

  const fetchData = useMemo(async () => {
    try {
      setLoading(true);
      const data = await getMethod(
        `${process.env.REACT_APP_BASE_URL}/clientDetails?page=${page}&size=${rowsPerPage}`
      );
      console.log("data.content ", data);
      setTotalRecords(data.totalElements);
      setRows(data.content);
      setLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  }, [page, rowsPerPage, props.message]);

  const handleChangePage = (event, newPage) => {
    console.log("handleChangePage ", newPage);
    setPage(newPage);
    console.log("handleChangePage ", page);
    //fetchData();
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("handleChangeRowsPerPage ", event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editData = (name, location, clientId) => {
    console.log("editrow", name);
    const clientData = {
      client: name,
      location: location,
      clientId: clientId,
    };
    props.onDataChange(clientData);
  };

  const deleteData = (clientId) => {
    console.log("delete", clientId);
    confirmAlert({
      title: "Confirm to submit",
      message: `ID ${clientId}, Are you sure to delete this record`,
      buttons: [
        {
          label: "Yes",
          onClick: () => confirmDelete(clientId),
        },
        {
          label: "No",
          onClick: () => console.log("no delete"),
        },
      ],
    });
  };

  const confirmDelete = async (clientId) => {
    try {
      const response = await deleteMethod(
        `${process.env.REACT_APP_BASE_URL}/softDeleteClientDetails?clientId=${clientId}&isDelete=true`
      );
      console.log("editdata ", response);

      if (response.clientId !== null) {
        toast.success("Client data deleted successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error posting data:", error);
      // Handle error
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const [rowData, setRowData] = React.useState({
    name: "",
    calorie: "",
    location: "",
  });

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Client</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? ( // Display loading indicator while loading
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <StyledTableRow key={row.clientId}>
                  <StyledTableCell component="th" scope="row">
                    {row.clientName}
                  </StyledTableCell>
                  <StyledTableCell>{row.location}</StyledTableCell>
                  <StyledTableCell>
                    {row.isDelete ? "InActive" : "Active"}
                  </StyledTableCell>
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
                        editData(row.clientName, row.location, row.clientId)
                      }
                    >
                      <MdEdit />
                    </div>
                    <div
                      style={{ cursor: "pointer", marginLeft: "14px" }}
                      onClick={() => deleteData(row.clientId)}
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

      {/* <Dialog open={open} onClose={handleModalClose}>
        <DialogTitle>Modal Title</DialogTitle>
        <DialogContent>
          <p>Modal content goes here</p>
          <h4>{rowData && rowData.name}</h4>
          <h4>{rowData && rowData.calorie}</h4>
          <h4>{rowData && rowData.location}</h4>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog> */}
    </Paper>
  );
}
