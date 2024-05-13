import { useEffect, useState, useRef } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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
  InputAdornment,
  IconButton,
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
import SearchIcon from "@mui/icons-material/Search";
import { set } from "react-hook-form";
import imgData from 'src/assets/images/letter-head.png'
import { green, yellow } from "@mui/material/colors";
import { dark } from "@mui/material/styles/createPalette";


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

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [updateIndex, setUpdateIndex] = useState(null);

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [QuantityError, setQuantityError] = useState(false);

  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [filteredProducts, setFilteredProducts] = useState([]); // State to store filtered products

  const tableRef = useRef(null); // Reference to the table DOM element

  useEffect(() => {
    getInventoryApi().then((data) => {
      dispatch(fetchInventory(data));
    });
  }, []);

  // Update filtered products when the products or searchQuery change
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.product_Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setOpenDeleteDialog(true);
  };

  const handleUpdate = (index) => {
    setUpdateIndex(index);
    setSelectedProduct(filteredProducts[index]); // Use filtered products for update
    setDescription(filteredProducts[index].description);
    setPrice(filteredProducts[index].price);
    setOpenUpdateDialog(true);
    setQuantity(filteredProducts[index].quantity);
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
    !quantity ||
    isNaN(parseFloat(price)) ||
    isNaN(parseInt(quantity)) ||
    parseFloat(price) <= 0 ||
    parseInt(quantity) <= 0
  ) {
    setDescriptionError(!description);
    setPriceError(
      !price || isNaN(parseFloat(price)) || parseFloat(price) <= 0
    );
    setQuantityError(
      !quantity || isNaN(parseInt(quantity)) || parseInt(quantity) <= 0
    );
    return;
  }


    const updatedProducts = [...products];
    updatedProducts[updateIndex] = { ...selectedProduct, description, price, quantity};
    console.log(updatedProducts);

    updateInventoryApi(updatedProducts[updateIndex])
      .then(() => {
        console.log("item Updated");
        dispatch(fetchInventory(updatedProducts));
        setOpenUpdateDialog(false);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const downloadReport = () => {
    const excelData = filteredProducts.map(
      ({ product_Name, description, packege_Type, product_type, price }) => ({
        "Product Name": product_Name,
        Description: description,
        "Package Type(KG)": packege_Type,
        "Product Type": product_type,
        "Price RS": price,
      })
    );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      excelData.map((data) => Object.values(data).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "product_report.csv");
    document.body.appendChild(link);
    link.click();
  };



    const generatePDF = () => {
    const doc = new jsPDF();

    // Get current date and time
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    const margin = 15;
    doc.addImage(imgData, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

    const tableStartY = margin + 45;
    // Set font size and add text
    doc.setFontSize(8);
    doc.text(`HARVEST MASTER Product Report - ${currentDate} ${currentTime}`, margin, margin + 40);

    // Set table header color
    doc.setFillColor(144, 238, 144); // Light green color

    doc.autoTable({
        startY: tableStartY,
        head: [
            ['Product Name', 'Description', 'Package Type (KG)', 'Product Type', 'Price', 'Quantity']
        ],
        body: filteredProducts.map(product => [
            product.product_Name,
            product.description,
            product.packege_Type,
            product.product_type,
            product.price,
            product.quantity
        ]),
        theme: 'grid', // Add grid lines
        headStyles: {
            fillColor:green [800]
        },
    });
    doc.save('product_report.pdf');
}


  return (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        placeholder="Search product"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'green' },
            '&:hover fieldset': { borderColor: 'green' },
            '&.Mui-focused fieldset': { borderColor: 'green' },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton sx={{ color: 'green' }}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div style={{ maxHeight: "500px", overflow: "auto" }}>
        {/* Search Input Field */}
        <div ref={tableRef}>
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
                  <TableCell style={{ fontWeight: "bold" }}>Quantity </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
                  
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody>
                {filteredProducts.map((product, index) => (
                  <TableRow hover key={index} style={{ backgroundColor: product.quantity <= 100? "#FFCDD2" : "transparent" }}>
                    <TableCell>{product.product_Name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.packege_Type}</TableCell>
                    <TableCell>{product.product_type}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
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
        maxWidth="sm"
        fullWidth
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
                  const input = e.target.value;
                  // Only allow numbers (including decimal point)
                  if (/^\d*\.?\d*$/.test(input) || input === "") {
                    setPrice(input);
                    setPriceError(false);
                  }
                }}
                error={priceError}
                helperText={
                  priceError
                    ? "Price must be a valid number greater than 0"
                    : ""
                }
              />
              
              <StyledInputField
                label="Quantity"
                value={quantity}
                onChange={(e) => {
                  const input = e.target.value;
                  // Only allow numbers (including decimal point)
                  if (/^\d*\.?\d*$/.test(input) || input === "") {
                    setQuantity(input);
                    setQuantityError(false);
                  }
                }}
                error={QuantityError}
                helperText={
                  QuantityError
                    ? "Quantity must be a valid number greater than 0"
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
        Generate CSV Report
      </Button>

      {/* Generate PDF button */}
      <Button
        variant="contained"
        color="success"
        onClick={generatePDF}
        style={{ marginTop: "10px", marginLeft: "10px" }}
      >
        Generate PDF Report
      </Button>
    </>
  );
};

export default ProductTable;
