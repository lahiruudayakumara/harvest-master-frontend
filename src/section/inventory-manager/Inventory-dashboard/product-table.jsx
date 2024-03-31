import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const columns = [
  { id: "product_name", label: "Product Name", minWidth: 300 },
  { id: "product_type", label: "Product Type(R/RP)", minWidth: 100 },
  { id: "description", label: "Description", minWidth: 100 },
  { id: "price", label: "Price(Rs)", minWidth: 100 },
  { id: "packege_Type", label: "Package Type", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 100 },
];

function createData(
  product_name,
  product_type,
  description,
  price,
  packege_Type,
  action
) {
  return {
    product_name,
    product_type,
    description,
    price,
    packege_Type,
    action,
  };
}

const rows = [
  createData(
    "Basmati Rice",
    "Food",
    "High-quality basmati rice from India",
    "15.00",
    "Standard"
  ),
  createData(
    "Jasmine Rice",
    "Food",
    "Fragrant jasmine rice from Thailand",
    "12.00",
    "Standard"
  ),
  createData(
    "Brown Rice",
    "Food",
    "Nutritious whole grain brown rice",
    "8.00",
    "Standard"
  ),
  createData(
    "Arborio Rice",
    "Food",
    "Italian short-grain rice for risotto",
    "18.00",
    "Standard"
  ),
  createData("White Rice", "Food", "Plain white rice", "5.00", "Standard"),
  createData(
    "Sushi Rice",
    "Food",
    "Japanese short-grain rice for sushi",
    "20.00",
    "Standard"
  ),
  createData(
    "Wild Rice",
    "Food",
    "Nutty-flavored wild rice",
    "25.00",
    "Standard"
  ),
  createData(
    "Rice Noodles",
    "Food",
    "Thin rice noodles for Asian dishes",
    "7.00",
    "Standard"
  ),
  createData(
    "Sticky Rice",
    "Food",
    "Glutinous rice for desserts or savory dishes",
    "10.00",
    "Standard"
  ),
  createData(
    "Rice Flour",
    "Food",
    "Fine rice flour for baking or cooking",
    "6.00",
    "Standard"
  ),
];

export default function ProductTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [packageType, setPackageType] = useState("");
  const [productNameError, setProductNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleApprove = (row) => {
    console.log("Approved:", row);
  };

  const handleReject = (row) => {
    setDeleteRow(row);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    const updatedRows = rows.filter((row) => row !== deleteRow);
    // Update state with the new rows
    // setRows(updatedRows);
    setDeleteOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteOpen(false);
    setDeleteRow(null);
  };

  const handleUpdate = (row) => {
    setOpen(true);
    setProductName(row.product_name);
    setProductType(row.product_type);
    setDescription(row.description);
    setPrice(row.price);
    setPackageType(row.packege_Type);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // Resetting previous errors
    setProductNameError(false);
    setPriceError(false);
    setDescriptionError(false);

    // // Validating Product Name
    // if (!productName) {
    //   setProductNameError(true);
    // }

    // Validating Description
    if (!description) {
      setDescriptionError(true);
    }

    // Validating Price
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      setPriceError(true);
    }

    // If there are no errors, save the data
    if (
      productName &&
      description &&
      price &&
      !productNameError &&
      !descriptionError &&
      !priceError
    ) {
      const updatedRows = rows.map((row) => {
        if (row.product_name === productName) {
          return {
            ...row,
            price: price,
            description: description,
          };
        }
        return row;
      });
      // Update state with the new rows
      // setRows(updatedRows);
      setOpen(false);
    }
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
                              <div style={{ display: "flex", gap: "8px" }}>
                                <Button
                                  onClick={() => handleUpdate(row)}
                                  color="success"
                                  variant="contained"
                                  size="small"
                                  startIcon={<CheckIcon />}
                                >
                                  <Typography
                                    variant="body2"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    Update
                                  </Typography>
                                </Button>
                                <Button
                                  onClick={() => handleReject(row)}
                                  color="error"
                                  variant="outlined"
                                  size="small"
                                  startIcon={<CloseIcon />}
                                >
                                  <Typography
                                    variant="body2"
                                    sx={{ fontWeight: "bold" }}
                                  >
                                    Delete
                                  </Typography>
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            fullWidth
            margin="normal"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            disabled
           
          />
          <TextField
            label="Product Type"
            fullWidth
            margin="normal"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            disabled
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={descriptionError}
            helperText={descriptionError ? "Description is required" : ""}
          />
          <TextField
            label="Price"
            fullWidth
            margin="normal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={priceError}
            helperText={
              priceError ? "Price must be a valid number greater than 0" : ""
            }
          />
          <TextField
            label="Package Type"
            fullWidth
            margin="normal"
            value={packageType}
            onChange={(e) => setPackageType(e.target.value)}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this item?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
