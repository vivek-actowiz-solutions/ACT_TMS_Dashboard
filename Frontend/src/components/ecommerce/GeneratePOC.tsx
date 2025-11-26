// import React, { useState, useEffect } from "react";

// const GeneratePOCModal = ({ onClose, onSelect }: any) => {
//   const [tasks, setTasks] = useState([]);
//   const apiUrl = import.meta.env.VITE_API_URL;
//   const [search, setSearch] = useState("");


//   const fetchTasks = async () => {
//     try {
//       const res = await fetch(`${apiUrl}/tasks/list`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         credentials: "include",
//       });
//       const data = await res.json();
//       setTasks(data.tasks || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);



//   return (
//     <div className="fixed inset-0  bg-opacity-30 backdrop-blur flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg w-[70%] max-h-[80vh] overflow-auto shadow-xl">
//         <h2 className="text-xl font-bold text-[#3C01AF] mb-4">
//           Select Task For POC
//         </h2>
//         <input
//           type="text"
//           placeholder="Search by title, project code, or assigned by..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full p-2 mb-3 border rounded-md outline-none focus:ring focus:border-blue-400"
//         />

//         {/* TABLE */}
//         <table className="w-full border border-gray-200">
//           <thead>
//             <tr className="bg-gray-100 font-semibold text-left">
//               <th className="p-2 border">Project Code</th>
//               <th className="p-2 border">Title</th>
//               <th className="p-2 border">POC File</th>
//               <th className="p-2 border">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {tasks
//               .filter((t: any) =>
//                 t.title.toLowerCase().includes(search.toLowerCase()) ||
//                 t.projectCode.toLowerCase().includes(search.toLowerCase()) ||
//                 (t.assignedBy?.name || "")
//                   .toLowerCase()
//                   .includes(search.toLowerCase())
//               )
//               .map((task: any) => (

//                 <tr key={task._id} className="border hover:bg-gray-50">
//                   <td className="p-2 border">{task.projectCode}</td>
//                   <td className="p-2 border">{task.title}</td>
//                   <td className="p-2 border text-center">
//                     {task.hasPOC ? (
//                       <a
//                         href={`${apiUrl}/poc/docx/${task.pocId}`}
//                         target="_blank"
//                         className="text-blue-600 hover:underline"
//                       >
//                         Download
//                       </a>
//                     ) : (
//                       <span className="text-gray-400">Not Generated</span>
//                     )}
//                   </td>

//                   <td className="p-2 border">
//                     <button
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
//                       onClick={() => onSelect(task._id)}
//                     >
//                       Select
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>

//         <button
//           onClick={onClose}
//           className="mt-4 w-full bg-gray-200 hover:bg-gray-300 p-2 rounded"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GeneratePOCModal;


import  { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const GeneratePOCModal = ({ onClose, onSelect }: any) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${apiUrl}/tasks/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });
      const data = await res.json();
      setTasks(data.tasks || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // -----------------------------
  // MUI DataGrid Columns
  // -----------------------------
  const columns = [
    {
      field: "projectCode",
      headerName: "Project Code",
      flex: 1,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1.5,
    },
    {
      field: "pocFile",
      headerName: "POC File",
      flex: 1,
      renderCell: (params: any) =>
        params.row.hasPOC ? (
          <a
            href={`${apiUrl}/poc/docx/${params.row.pocId}`}
            target="_blank"
            style={{ color: "#1976d2", textDecoration: "underline" }}
          >
            Download
          </a>
        ) : (
          <span style={{ color: "#777" }}>Not Generated</span>
        ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      renderCell: (params: any) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => onSelect(params.row._id)}
        >
          Select
        </Button>
      ),
    },
  ];

  // -----------------------------
  // Filter rows by search input
  // -----------------------------
  const filteredTasks = tasks.filter((t: any) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.projectCode.toLowerCase().includes(search.toLowerCase()) ||
    (t.assignedBy?.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
  //   <div className="fixed inset-0 bg-opacity-30 backdrop-blur flex items-center justify-center z-50">
  //     <div className="bg-white p-6 rounded-lg w-[80%] max-h-[85vh] overflow-auto shadow-xl border border-gray-300">

  //       <div className="flex justify-between items-center mb-4">
  //       <h2 className="text-xl font-bold text-[#3C01AF] mb-4">
  //         Select Task For POC
  //       </h2>
  //       <Button
         
  //         variant="outlined"
  //         color="secondary"
  //         onClick={onClose}
  //         sx={{ mt: 3 }}
  //       >
  //        <CloseIcon />
  //       </Button>
  //       </div>
        

  //       {/* Search Box */}
  //       <div className="mb-6">
  //       <TextField
  //         fullWidth
  //         label="Search by title, project code, or assigned by..."
  //         variant="outlined"
  //         value={search}
  //         onChange={(e) => setSearch(e.target.value)}
  //         className="mb-4"
  //       />
  //       </div>

  //       {/* MUI DataGrid Table */}
  //       <Box sx={{ height: 500, width: "100%" }}>
  //         <DataGrid
  //         disableColumnResize
  //             disableColumnMenu
  //             disableColumnSelector
  //             disableColumnFilter
  //             disableRowSelectionOnClick
  //             hideFooterSelectedRowCount
  //           rows={filteredTasks}
  //           columns={columns}
  //           pageSizeOptions={[10,20,30]}
  //           pagination
  //           getRowId={(row) => row._id}
  //           initialState={{
  //   pagination: {
  //     paginationModel: { pageSize: 10, page: 0 },
  //   },
  // }}
  //           sx={{
  //   border: "1px solid #ccc",
  //   fontSize: "14px",

  //   /* 🔥 Remove blue outline from cells */
  //   "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
  //     outline: "none !important",
  //   },

  //   /* 🔥 Remove blue outline from rows */
  //   "& .MuiDataGrid-row:focus, & .MuiDataGrid-row:focus-within": {
  //     outline: "none !important",
  //   },

  //   /* 🔥 Remove blue outline from column headers */
  //   "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
  //     outline: "none !important",
  //   },

  //   /* 🔥 Remove blue outline from column header title text */
  //   "& .MuiDataGrid-columnHeaderTitleContainer:focus, & .MuiDataGrid-columnHeaderTitleContainer:focus-within": {
  //     outline: "none !important",
  //   },

  //   /* Optional: remove selection outline completely */
  //   "& .MuiDataGrid-selectedRowCount": {
  //     outline: "none !important",
  //   },
  //   "& .MuiDataGrid-row": {
  //   backgroundColor: "#f9fafb", // light gray

    
  // },
  // }}
  //         />
  //       </Box>

        
  //     </div>
  //   </div>
 <div className="fixed inset-x-0 top-20  bg-opacity-30 backdrop-blur-sm flex items-start justify-center z-50 p-4">
  <div className="bg-white p-4 md:p-6 rounded-lg w-full md:w-4/5 lg:w-3/5 max-h-[80vh] flex flex-col shadow-xl border border-gray-300">

    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
      <h2 className="text-lg md:text-xl font-bold text-[#3C01AF] mb-2 md:mb-0">
        Select Task For POC
      </h2>
      <Button
        variant="outlined"
        color="secondary"
        onClick={onClose}
        sx={{ mt: 0 }}
      >
        <CloseIcon />
      </Button>
    </div>

    {/* Search Box */}
    <div className="mb-4">
      <TextField
        fullWidth
        label="Search by title, project code, or assigned by..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {/* Scrollable DataGrid */}
    <div className="flex-1 min-h-0 overflow-auto">
      <Box sx={{ width: "100%" , height: "100%" }}>
        <DataGrid
          rows={filteredTasks}
          columns={columns}
          pageSizeOptions={[10, 20, 30]}
          initialState={{
   pagination: {
      paginationModel: { pageSize: 10, page: 0 },
   },
   }}
          pagination
          getRowId={(row) => row._id}
          disableColumnResize
          disableColumnMenu
          disableColumnSelector
          disableColumnFilter
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          sx={{
            border: "1px solid #ccc",
            fontSize: "14px",
            "& .MuiDataGrid-row": { backgroundColor: "#f9fafb" },
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-row:focus": { outline: "none" },
            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeaderTitleContainer:focus": { outline: "none" },
          }}
        />
      </Box>
    </div>

  </div>
</div>


  );
};

export default GeneratePOCModal;

