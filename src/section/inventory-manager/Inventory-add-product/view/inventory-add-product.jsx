import React, { useState } from "react";
import { TextField, Button, Grid, MenuItem } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";

const InventoryAddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    description: "",
    productName: "",
    packageType: "",
    price: "",
    productImage: null,
    productType: "",
  });
  const dispatch = useDispatch();

  console.log(productDetails);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    // Validation for Product Type
    if (name === "productType") {
      if (value !== "Rice" && value !== "Rice product") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          productType: "Product Type must be Rice or Rice product",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, productType: "" }));
      }
    }

    // Validation for Price
    if (name === "price") {
      if (!value || isNaN(value) || parseFloat(value) <= 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          price: "Price must be a valid number greater than zero",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, price: "" }));
      }
    }
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

    // Validation check before submission
    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("description", productDetails.description);
      formData.append("productName", productDetails.productName);
      formData.append("packageType", productDetails.packageType);
      formData.append("price", productDetails.price);
      formData.append("productImage", productDetails.productImage);
      formData.append("productType", productDetails.productType);

      dispatch(InventoryAddProduct({ formData }));

      const response = await axios.post(
        "http://localhost:8080/inventory/add",
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
        productType: "",
      });
    } catch (error) {
      console.error("Error submitting product details:", error);
    }
  };

  const handleClear = () => {
    setProductDetails({
      description: "",
      productName: "",
      packageType: "",
      price: "",
      productImage: null,
      productType: "",
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Product Name validation
    if (!productDetails.productName) {
      newErrors.productName = "Product Name is required";
      valid = false;
    }

    // Description validation
    if (!productDetails.description) {
      newErrors.description = "Description is required";
      valid = false;
    }

    // Package Type validation
    if (!productDetails.packageType) {
      newErrors.packageType = "Package Type is required";
      valid = false;
    }

    // Product Type validation
    if (
      productDetails.productType !== "Rice" &&
      productDetails.productType !== "Rice product"
    ) {
      newErrors.productType = "Product Type must be Rice or Rice product";
      valid = false;
    }

    // Price validation
    if (
      !productDetails.price ||
      isNaN(productDetails.price) ||
      parseFloat(productDetails.price) <= 0
    ) {
      newErrors.price = "Price must be a valid number greater than zero";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Name"
              name="productName"
              value={productDetails.productName}
              onChange={handleChange}
              error={!!errors.productName}
              helperText={errors.productName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={productDetails.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Package Type"
              name="packageType"
              value={productDetails.packageType}
              onChange={handleChange}
              error={!!errors.packageType}
              helperText={errors.packageType}
            >
              <MenuItem value="2KG">2KG</MenuItem>
              <MenuItem value="5KG">5KG</MenuItem>
              <MenuItem value="10KG">10KG</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Product Type"
              name="productType"
              value={productDetails.productType}
              onChange={handleChange}
              error={!!errors.productType}
              helperText={errors.productType}
            >
              <MenuItem value="Rice">Rice</MenuItem>
              <MenuItem value="Rice product">Rice product</MenuItem>
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
              error={!!errors.price}
              helperText={errors.price}
            />
          </Grid>
          <Grid item xs={12}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="success">
                Submit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleClear}
                sx={{ marginLeft: 1 }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default InventoryAddProduct;
