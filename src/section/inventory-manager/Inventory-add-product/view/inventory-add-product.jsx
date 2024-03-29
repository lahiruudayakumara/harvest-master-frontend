import React, { useState } from "react";
import { TextField, Button, Grid, MenuItem } from "@mui/material";
import axios from "axios";

const InventoryAddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    description: "",
    productName: "",
    packageType: "", // Added packageType to productDetails state
    price: "",
    productImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      productImage: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("description", productDetails.description);
      formData.append("productName", productDetails.productName);
      formData.append("packageType", productDetails.packageType); // Include packageType in formData
      formData.append("price", productDetails.price);
      formData.append("productImage", productDetails.productImage);

      const response = await axios.post(
        "http://localhost:8080/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response from backend:", response.data);
      setProductDetails({
        description: "",
        productName: "",
        packageType: "",
        price: "",
        productImage: null,
      });
    } catch (error) {
      console.error("Error submitting product details:", error);
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={productDetails.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Name"
              name="productName"
              value={productDetails.productName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select // Changed input type to select for dropdown menu
              label="Package Type"
              name="packageType"
              value={productDetails.packageType}
              onChange={handleChange}
            >
              {/* Options for packageType */}
              <MenuItem value="2KG">2KG</MenuItem>
              <MenuItem value="5KG">5KG</MenuItem>
              <MenuItem value="10KG">10KG</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={productDetails.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default InventoryAddProduct;
