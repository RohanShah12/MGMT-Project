// import Sidebar from "../components/Sidebar";
// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Collapse,
//   IconButton,
//   MaterialTable,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material";
// import ChevronRightIcon from "@mui/icons-material";

// import JSONTree from "react-json-tree";

// const Analytics = () => {
//   return (
//     <>
//       <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
//         <div style={{ width: "16%" }}>
//           <Sidebar />
//         </div>
//         <div style={{ width: "80%", paddingLeft: "20px" }}>
//           <div>
//             <h1
//               style={{ fontSize: "21px", height: "40px", paddingTop: "15px" }}
//             >
//               Analytics page
//             </h1>
//           </div>
//           <hr />
//         </div>
//       </div>
//     </>
//   );
// };

import React, { useState } from "react";
import axios from "axios";

const Analytics = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("https://reqres.in/api/users?page=2", {
        input1,
        input2,
      });
      setResponseData(response.data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder="Input 1"
        />
        <input
          type="text"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          placeholder="Input 2"
        />
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {responseData && <p>Response: {responseData}</p>}
    </div>
  );
};

export default Analytics;
