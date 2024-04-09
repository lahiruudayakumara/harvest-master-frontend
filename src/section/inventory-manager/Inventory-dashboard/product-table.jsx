import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import {
  deleteProductApi,
  getInventoryApi,
  updateInventoryApi,
} from "src/api/inventory";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInventory,
  removeInventory,
  selectInventory,
  updateInventory,
} from "src/stores/slices/inventorySlice";

const StyledDialogTitle = styled(DialogTitle)({
  backgroundColor: "#4CAF50",
  color: "#fff",
});

const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  backgroundColor: "#fff",
});

const StyledInputField = styled(TextField)({
  marginBottom: "16px",
});

const ProductTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(selectInventory);

  console.log(products);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [updateIndex, setUpdateIndex] = useState(null);

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  useEffect(() => {
    getInventoryApi().then((data) => {
      dispatch(fetchInventory(data));
    });
  }, []);

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setOpenDeleteDialog(true);
  };

  const handleUpdate = (index) => {
    setUpdateIndex(index);
    setSelectedProduct(products[index]);
    setDescription(products[index].description); // Initialize description with current value
    setPrice(products[index].price); // Initialize price with current value
    setOpenUpdateDialog(true);
  };

  const confirmDelete = () => {
    deleteProductApi(deleteIndex).then(() => {
      dispatch(removeInventory(deleteIndex));
      console.log("item Deleted");
    });
    setOpenDeleteDialog(false);
  };

  const handleSaveUpdates = () => {
    if (
      !description ||
      !price ||
      isNaN(parseFloat(price)) ||
      parseFloat(price) <= 0
    ) {
      setDescriptionError(!description);
      setPriceError(
        !price || isNaN(parseFloat(price)) || parseFloat(price) <= 0
      );
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[updateIndex] = { ...selectedProduct, description, price }; // Update description and price
    console.log(updatedProducts);
<<<<<<< HEAD
    updateInventoryApi(updatedProducts[updateIndex]).then(() => {
      console.log("item Updated");
    });
    dispatch(updateInventory(updatedProducts[updateIndex]));
    setOpenUpdateDialog(false);
=======

    // Update the product through API call
    updateInventoryApi(updatedProducts[updateIndex])
      .then(() => {
        console.log("item Updated");
        dispatch(fetchInventory(updatedProducts)); // Dispatch action to update Redux store with updated products
        setOpenUpdateDialog(false);
        
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        // Handle error scenario
        // Optionally, you can set an error state to display a message to the user
      });
>>>>>>> 0045bc5 (Update dispatch action in product-table.jsx to fetchInventory)
  };

  const downloadReport = () => {
    // Extracting and arranging data in the specified order
    const excelData = products.map(
      ({ product_Name, description, packege_Type, product_type, price }) => ({
        "Product Name": product_Name,
        Description: description,
        "Package Type(KG)": packege_Type,
        "Product Type": product_type,
        "Price RS": price,
      })
    );

    // Generating CSV content
    const csvContent =
      "data:text/csv;charset=utf-8," +
      excelData.map((data) => Object.values(data).join(",")).join("\n");

    // Creating download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "product_report.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <div style={{ maxHeight: "400px", overflow: "auto" }}>
        <TableContainer component={Paper} style={{ marginBottom: "10px" }}>
          <Table size="small">
            {/* Table Head */}
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  Product Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Description
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Package Type(KG)
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Product Type
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Price RS</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {products.map((product, index) => (
                <TableRow hover key={index}>
                  <TableCell>{product.product_Name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.packege_Type}</TableCell>
                  <TableCell>{product.product_type}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Box display="flex">
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#2CA019",
                          color: "white",
                          marginRight: "8px",
                          fontSize: "10px",
                        }}
                        onClick={() => handleUpdate(index)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#D32F2F",
                          color: "white",
                          fontSize: "10px",
                        }}
                        onClick={() => handleDelete(product.pid)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <StyledDialogTitle>Delete Product</StyledDialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this product?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            style={{ color: "#FF0000" }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update dialog */}
      <Dialog
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
        maxWidth="sm" // Set max width to small
        fullWidth // Expand dialog to full width
      >
        <DialogTitle>Update Details</DialogTitle>
        <StyledDialogContent>
          {selectedProduct && (
            <>
              <StyledInputField
                margin="dense"
                label="Product Name"
                value={selectedProduct.product_Name}
                disabled
              />
              <StyledInputField
                label="Product Type"
                value={selectedProduct.product_type}
                disabled
              />
              <StyledInputField
                label="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setDescriptionError(false);
                }}
                error={descriptionError}
                helperText={descriptionError ? "Description is required" : ""}
              />
              <StyledInputField
                label="Price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  setPriceError(false);
                }}
                error={priceError}
                helperText={
                  priceError
                    ? "Price must be a valid number greater than 0"
                    : ""
                }
              />
              <StyledInputField
                label="Package Type"
                value={selectedProduct.packege_Type}
                disabled
              />
            </>
          )}
        </StyledDialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenUpdateDialog(false)}
            color="primary"
            style={{ backgroundColor: "#D32F2F", color: "white" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveUpdates}
            color="secondary"
            autoFocus
            style={{ backgroundColor: "#2CA019", color: "white" }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Download report button */}
      <Button
        variant="contained"
        color="success"
        onClick={downloadReport}
        style={{ marginTop: "10px" }}
      >
        Download Report
      </Button>
    </>
  );
};

export default ProductTable;
