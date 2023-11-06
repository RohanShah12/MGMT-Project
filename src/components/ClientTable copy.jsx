import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { styled } from "@mui/material/styles";
import { MdEdit, MdDelete } from "react-icons/md";

import { Menu, MenuItem, makeStyles } from "@mui/material";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

// const useStyles = makeStyles((theme) => ({
//   menu: {
//     boxShadow: "none", // Remove the box shadow
//   },
// }));

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("3", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("edrfg yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("werty", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 70 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData("India", "IN", 1324171354, 3287263),
//   createData("China", "CN", 1403500365, 9596961),
//   createData("Italy", "IT", 60483973, 301340),
//   createData("United States", "US", 327167434, 9833520),
//   createData("Canada", "CA", 37602103, 9984670),
//   createData("Australia", "AU", 25475400, 7692024),
//   createData("Germany", "DE", 83019200, 357578),
//   createData("Ireland", "IE", 4857000, 70273),
//   createData("Mexico", "MX", 126577691, 1972550),
//   createData("Japan", "JP", 126317000, 377973),
//   createData("France", "FR", 67022000, 640679),
//   createData("United Kingdom", "GB", 67545757, 242495),
//   createData("Russia", "RU", 146793744, 17098246),
//   createData("Nigeria", "NG", 200962417, 923768),
//   createData("Brazil", "BR", 210147125, 8515767),
// ];

export default function ClientTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editData = (name, sow, location) => {
    console.log("editrow", name);
    const clientData = {
      company: name,
      sow: sow,
      location: location,
    };
    props.onDataChange(clientData);
  };

  const deleteData = (name) => {
    confirmAlert({
      title: "Confirm to submit",
      message: `ID ${name}, Are you sure to delete this record`,
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes"),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Dessert (100g serving)</StyledTableCell>
              <StyledTableCell align="right">Calories</StyledTableCell>
              <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.fat}</StyledTableCell>
                  <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>
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
                      onClick={() => editData(row.name, row.calories, row.fat)}
                    >
                      <MdEdit />
                    </div>
                    <div
                      style={{ cursor: "pointer", marginLeft: "14px" }}
                      onClick={() => deleteData(row.name)}
                    >
                      {" "}
                      <MdDelete />{" "}
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
// import React, { useState } from "react";
// import { MDBDataTableV5 } from "mdbreact";

// export default function ClientTable() {
//   const [datatable, setDatatable] = useState({
//     columns: [
//       {
//         label: "Name",
//         field: "name",
//         width: 150,
//         attributes: {
//           "aria-controls": "DataTable",
//           "aria-label": "Name",
//         },
//       },
//       {
//         label: "Position",
//         field: "position",
//         width: 270,
//       },
//       {
//         label: "Office",
//         field: "office",
//         width: 200,
//       },
//       {
//         label: "Age",
//         field: "age",
//         sort: "asc",
//         width: 100,
//       },
//       {
//         label: "Start date",
//         field: "date",
//         sort: "disabled",
//         width: 150,
//       },
//       {
//         label: "Salary",
//         field: "salary",
//         sort: "disabled",
//         width: 100,
//       },
//     ],
//     rows: [
//       {
//         name: "Tiger Nixon",
//         position: "System Architect",
//         office: "Edinburgh",
//         age: "61",
//         date: "2011/04/25",
//         salary: "$320",
//       },
//       {
//         name: "Garrett Winters",
//         position: "Accountant",
//         office: "Tokyo",
//         age: "63",
//         date: "2011/07/25",
//         salary: "$170",
//       },
//       {
//         name: "Ashton Cox",
//         position: "Junior Technical Author",
//         office: "San Francisco",
//         age: "66",
//         date: "2009/01/12",
//         salary: "$86",
//       },
//       {
//         name: "Cedric Kelly",
//         position: "Senior Javascript Developer",
//         office: "Edinburgh",
//         age: "22",
//         date: "2012/03/29",
//         salary: "$433",
//       },
//       {
//         name: "Airi Satou",
//         position: "Accountant",
//         office: "Tokyo",
//         age: "33",
//         date: "2008/11/28",
//         salary: "$162",
//       },
//       {
//         name: "Brielle Williamson",
//         position: "Integration Specialist",
//         office: "New York",
//         age: "61",
//         date: "2012/12/02",
//         salary: "$372",
//       },
//       {
//         name: "Herrod Chandler",
//         position: "Sales Assistant",
//         office: "San Francisco",
//         age: "59",
//         date: "2012/08/06",
//         salary: "$137",
//       },
//       {
//         name: "Rhona Davidson",
//         position: "Integration Specialist",
//         office: "Tokyo",
//         age: "55",
//         date: "2010/10/14",
//         salary: "$327",
//       },
//       {
//         name: "Colleen Hurst",
//         position: "Javascript Developer",
//         office: "San Francisco",
//         age: "39",
//         date: "2009/09/15",
//         salary: "$205",
//       },
//       {
//         name: "Sonya Frost",
//         position: "Software Engineer",
//         office: "Edinburgh",
//         age: "23",
//         date: "2008/12/13",
//         salary: "$103",
//       },
//       {
//         name: "Jena Gaines",
//         position: "Office Manager",
//         office: "London",
//         age: "30",
//         date: "2008/12/19",
//         salary: "$90",
//       },
//       {
//         name: "Quinn Flynn",
//         position: "Support Lead",
//         office: "Edinburgh",
//         age: "22",
//         date: "2013/03/03",
//         salary: "$342",
//       },
//       {
//         name: "Charde Marshall",
//         position: "Regional Director",
//         office: "San Francisco",
//         age: "36",
//         date: "2008/10/16",
//         salary: "$470",
//       },
//       {
//         name: "Haley Kennedy",
//         position: "Senior Marketing Designer",
//         office: "London",
//         age: "43",
//         date: "2012/12/18",
//         salary: "$313",
//       },
//       {
//         name: "Tatyana Fitzpatrick",
//         position: "Regional Director",
//         office: "London",
//         age: "19",
//         date: "2010/03/17",
//         salary: "$385",
//       },
//       {
//         name: "Michael Silva",
//         position: "Marketing Designer",
//         office: "London",
//         age: "66",
//         date: "2012/11/27",
//         salary: "$198",
//       },
//       {
//         name: "Paul Byrd",
//         position: "Chief Financial Officer (CFO)",
//         office: "New York",
//         age: "64",
//         date: "2010/06/09",
//         salary: "$725",
//       },
//       {
//         name: "Gloria Little",
//         position: "Systems Administrator",
//         office: "New York",
//         age: "59",
//         date: "2009/04/10",
//         salary: "$237",
//       },
//       {
//         name: "Bradley Greer",
//         position: "Software Engineer",
//         office: "London",
//         age: "41",
//         date: "2012/10/13",
//         salary: "$132",
//       },
//       {
//         name: "Dai Rios",
//         position: "Personnel Lead",
//         office: "Edinburgh",
//         age: "35",
//         date: "2012/09/26",
//         salary: "$217",
//       },
//       {
//         name: "Jenette Caldwell",
//         position: "Development Lead",
//         office: "New York",
//         age: "30",
//         date: "2011/09/03",
//         salary: "$345",
//       },
//       {
//         name: "Yuri Berry",
//         position: "Chief Marketing Officer (CMO)",
//         office: "New York",
//         age: "40",
//         date: "2009/06/25",
//         salary: "$675",
//       },
//       {
//         name: "Caesar Vance",
//         position: "Pre-Sales Support",
//         office: "New York",
//         age: "21",
//         date: "2011/12/12",
//         salary: "$106",
//       },
//       {
//         name: "Doris Wilder",
//         position: "Sales Assistant",
//         office: "Sidney",
//         age: "23",
//         date: "2010/09/20",
//         salary: "$85",
//       },
//       {
//         name: "Angelica Ramos",
//         position: "Chief Executive Officer (CEO)",
//         office: "London",
//         age: "47",
//         date: "2009/10/09",
//         salary: "$1",
//       },
//       {
//         name: "Gavin Joyce",
//         position: "Developer",
//         office: "Edinburgh",
//         age: "42",
//         date: "2010/12/22",
//         salary: "$92",
//       },
//       {
//         name: "Jennifer Chang",
//         position: "Regional Director",
//         office: "Singapore",
//         age: "28",
//         date: "2010/11/14",
//         salary: "$357",
//       },
//       {
//         name: "Brenden Wagner",
//         position: "Software Engineer",
//         office: "San Francisco",
//         age: "28",
//         date: "2011/06/07",
//         salary: "$206",
//       },
//       {
//         name: "Fiona Green",
//         position: "Chief Operating Officer (COO)",
//         office: "San Francisco",
//         age: "48",
//         date: "2010/03/11",
//         salary: "$850",
//       },
//       {
//         name: "Shou Itou",
//         position: "Regional Marketing",
//         office: "Tokyo",
//         age: "20",
//         date: "2011/08/14",
//         salary: "$163",
//       },
//       {
//         name: "Michelle House",
//         position: "Integration Specialist",
//         office: "Sidney",
//         age: "37",
//         date: "2011/06/02",
//         salary: "$95",
//       },
//       {
//         name: "Suki Burks",
//         position: "Developer",
//         office: "London",
//         age: "53",
//         date: "2009/10/22",
//         salary: "$114",
//       },
//       {
//         name: "Prescott Bartlett",
//         position: "Technical Author",
//         office: "London",
//         age: "27",
//         date: "2011/05/07",
//         salary: "$145",
//       },
//       {
//         name: "Gavin Cortez",
//         position: "Team Leader",
//         office: "San Francisco",
//         age: "22",
//         date: "2008/10/26",
//         salary: "$235",
//       },
//       {
//         name: "Martena Mccray",
//         position: "Post-Sales support",
//         office: "Edinburgh",
//         age: "46",
//         date: "2011/03/09",
//         salary: "$324",
//       },
//       {
//         name: "Unity Butler",
//         position: "Marketing Designer",
//         office: "San Francisco",
//         age: "47",
//         date: "2009/12/09",
//         salary: "$85",
//       },
//       {
//         name: "Howard Hatfield",
//         position: "Office Manager",
//         office: "San Francisco",
//         age: "51",
//         date: "2008/12/16",
//         salary: "$164",
//       },
//       {
//         name: "Hope Fuentes",
//         position: "Secretary",
//         office: "San Francisco",
//         age: "41",
//         date: "2010/02/12",
//         salary: "$109",
//       },
//       {
//         name: "Vivian Harrell",
//         position: "Financial Controller",
//         office: "San Francisco",
//         age: "62",
//         date: "2009/02/14",
//         salary: "$452",
//       },
//       {
//         name: "Timothy Mooney",
//         position: "Office Manager",
//         office: "London",
//         age: "37",
//         date: "2008/12/11",
//         salary: "$136",
//       },
//       {
//         name: "Jackson Bradshaw",
//         position: "Director",
//         office: "New York",
//         age: "65",
//         date: "2008/09/26",
//         salary: "$645",
//       },
//       {
//         name: "Olivia Liang",
//         position: "Support Engineer",
//         office: "Singapore",
//         age: "64",
//         date: "2011/02/03",
//         salary: "$234",
//       },
//       {
//         name: "Bruno Nash",
//         position: "Software Engineer",
//         office: "London",
//         age: "38",
//         date: "2011/05/03",
//         salary: "$163",
//       },
//       {
//         name: "Sakura Yamamoto",
//         position: "Support Engineer",
//         office: "Tokyo",
//         age: "37",
//         date: "2009/08/19",
//         salary: "$139",
//       },
//       {
//         name: "Thor Walton",
//         position: "Developer",
//         office: "New York",
//         age: "61",
//         date: "2013/08/11",
//         salary: "$98",
//       },
//       {
//         name: "Finn Camacho",
//         position: "Support Engineer",
//         office: "San Francisco",
//         age: "47",
//         date: "2009/07/07",
//         salary: "$87",
//       },
//       {
//         name: "Serge Baldwin",
//         position: "Data Coordinator",
//         office: "Singapore",
//         age: "64",
//         date: "2012/04/09",
//         salary: "$138",
//       },
//       {
//         name: "Zenaida Frank",
//         position: "Software Engineer",
//         office: "New York",
//         age: "63",
//         date: "2010/01/04",
//         salary: "$125",
//       },
//       {
//         name: "Zorita Serrano",
//         position: "Software Engineer",
//         office: "San Francisco",
//         age: "56",
//         date: "2012/06/01",
//         salary: "$115",
//       },
//       {
//         name: "Jennifer Acosta",
//         position: "Junior Javascript Developer",
//         office: "Edinburgh",
//         age: "43",
//         date: "2013/02/01",
//         salary: "$75",
//       },
//       {
//         name: "Cara Stevens",
//         position: "Sales Assistant",
//         office: "New York",
//         age: "46",
//         date: "2011/12/06",
//         salary: "$145",
//       },
//       {
//         name: "Hermione Butler",
//         position: "Regional Director",
//         office: "London",
//         age: "47",
//         date: "2011/03/21",
//         salary: "$356",
//       },
//       {
//         name: "Lael Greer",
//         position: "Systems Administrator",
//         office: "London",
//         age: "21",
//         date: "2009/02/27",
//         salary: "$103",
//       },
//       {
//         name: "Jonas Alexander",
//         position: "Developer",
//         office: "San Francisco",
//         age: "30",
//         date: "2010/07/14",
//         salary: "$86",
//       },
//       {
//         name: "Shad Decker",
//         position: "Regional Director",
//         office: "Edinburgh",
//         age: "51",
//         date: "2008/11/13",
//         salary: "$183",
//       },
//       {
//         name: "Michael Bruce",
//         position: "Javascript Developer",
//         office: "Singapore",
//         age: "29",
//         date: "2011/06/27",
//         salary: "$183",
//       },
//       {
//         name: "Donna Snider",
//         position: "Customer Support",
//         office: "New York",
//         age: "27",
//         date: "2011/01/25",
//         salary: "$112",
//       },
//     ],
//   });

//   return (
//     <MDBDataTableV5
//       hover
//       entriesOptions={[5, 20, 25]}
//       entries={5}
//       pagesAmount={4}
//       data={datatable}
//       fullPagination
//     />
//   );
// }
