import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Typography } from "@mui/material";
import { updateSchedule } from "src/stores/slices/pendingOrderSlice";
import { useBoolean } from "src/hooks/use-boolean";

const columns = [
  { id: "cusName", label: "Customer Name", minWidth: 170 },
  { id: "pickupAddress", label: "Pickup Address", minWidth: 100 },
  { id: "deliveryAddress", label: "Delivery Address", minWidth: 100 },
  { id: "date", label: "Delivery Date", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 100 },
];

function createData(cusName, pickupAddress, deliveryAddress, date, action) {
  return { cusName, pickupAddress, deliveryAddress, date, action };
}

const rows = [
  createData(
    "Binuki Mihara",
    "No. 123, Willow Avenue, Springfield",
    "No. 345, Bird Lane, Greenfield",
    "2024-02-19"
  ),
  createData(
    "John Smith",
    "No. 456, Elm Street, Pleasantville",
    "No. 678, Elm Road, Meadowview",
    "2023-10-15"
  ),
  createData(
    "Michael Brown",
    "No. 789, Maple Lane, Rivertown",
    "No. 456, Pine Street, Woodland",
    "2024-03-10"
  ),
  createData(
    "Sophia Garcia",
    "No. 101, Oak Street, Mountainville",
    "No. 123, Maple Lane, Sunset",
    "2024-02-28"
  ),
  createData(
    "Daniel Martinez",
    "No. 234, Pine Road, Lakeside",
    "No. 789, Willow Road, Hilltop",
    "2024-03-05"
  ),
  createData(
    "Olivia Taylor",
    "No. 345, Birch Lane, Greenfield",
    "No. 567, Cedar Street, Riverdale",
    "2024-02-14"
  ),
];

// const updatedSchedule = [...products];
// updatedSchedule[updateIndex] = { ...selectedProduct, description, price }; // Update description and price
// console.log(updatedSchedule);

// // Update the delivery schedule through API call
// updateSchedule(updatedSchedule[updateIndex])
//   .then(() => {
//     console.log("Delivery Schedule Updated");
//     dispatch(fetchInventory(updatedSchedule)); // Dispatch action to update Redux store with updated products
//     setOpenUpdateDialog(false);

//   })
//   .catch((error) => {
//     console.error("Error Updating Delivery Schedule:", error);
//     // Handle error scenario
//     // Optionally, you can set an error state to display a message to the user
//   });


export default function DeliveryScheduleTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const quickEdit = useBoolean();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (row) => {
    console.log("Editing row:", row);
  };

  const handleDelete = (row) => {
    console.log("Deleting row:", row);
    const updatedRows = rows.filter((r) => r !== row);
    setRows(updatedRows);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align="left">
                            {column.id === "action" ? (
                              //Edit and Delivered buttons
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <Button onClick={() => handleEdit(row)} style={{ backgroundColor: '#2CA019' }} variant="contained">
                                  <Typography variant="h6" style={{ fontSize: '12px', backgroundColor: '#07bc0c' }}>Edit</Typography>
                                </Button>
                                <Button onClick={() => handleDelete(row)} style={{ backgroundColor: 'red' }} variant="contained">
                                  <Typography variant="h6" style={{ fontSize: '12px' }}>Delivered</Typography>
                                </Button>
                              </div>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
