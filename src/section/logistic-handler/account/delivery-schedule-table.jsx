import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Typography } from "@mui/material";
import { fetchDelivery, removeDelivery, selectDelivery } from "src/stores/slices/pendingOrderSlice";
import { useBoolean } from "src/hooks/use-boolean";
import { useDispatch, useSelector } from "react-redux";
import { confirmDelivery, getPendingOrders } from "src/api/logisticHandlerApi";
import DeliveryScheduleUpdateForm from "./delivery-schedule-update-form";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const columns = [
  { id: "delivery_id", label: "Delivery Id" },
  { id: "pickup_address", label: "Pickup Address" },
  { id: "delivery_address", label: "Delivery Address" },
  { id: "delivery_date", label: "Delivery Date" },
  { id: "action", label: "Action" },
];

export default function DeliveryScheduleTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const quickEdit = useBoolean();
  const dispatch = useDispatch();

  const [selectedProduct, setSelectProduct] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (row) => {
    quickEdit.onTrue();
    setSelectProduct(row);
    console.log("Editing row:", row);
  };

  const handleDelivered = async (row) => {
    console.log("Delivering row:", row);
    try {
      await dispatch(removeDelivery(row.delivery_id));
      await confirmDelivery(row.delivery_id);
      toast.success('Order delivered successfully!');
    } catch (error) {
      console.error("Error delivering order:", error);
      toast.error('Failed to deliver order!');
    }
  };

  useEffect(() => {
    getPendingOrders({ "order_Status": "APPROVED", "payment_status": "APPROVED" }).then((data) => {
      dispatch(fetchDelivery(data));
    });
  }, [dispatch, quickEdit.value]);

  const rows = useSelector(selectDelivery);

  // Function to format date in "YYYY-MM-DD" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
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
                        const value = column.id === 'delivery_date' ? formatDate(row[column.id]) : row[column.id]; // Format date Validaion
                        return (
                          <TableCell key={column.id} align="left">
                            {column.id === "action" ? (
                              //Edit and Delivered buttons
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <Button onClick={() => handleEdit(row)} style={{ backgroundColor: '#2CA019' }} variant="contained">
                                  <Typography variant="h6" style={{ fontSize: '12px', backgroundColor: '#07bc0c' }}>Edit</Typography>
                                </Button>
                                <Button onClick={() => handleDelivered(row)} style={{ backgroundColor: 'red' }} variant="contained">
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
      <DeliveryScheduleUpdateForm open={quickEdit.value} onClose={quickEdit.onFalse} selectedProduct={selectedProduct} />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Box>
  );
}
