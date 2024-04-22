import { Button } from '@mui/material';
import React from 'react'

function Report() {
    const downloadReport = () => {
        const excelData = filteredProducts.map(
            ({ customer_name, delivery_address, pickup_address, delivery_date, driver_name }) => ({
                "Customer Name": customer_name,
                "Delivery Address": delivery_address,
                "Pickup Address": pickup_address,
                "Delivery Date": delivery_date,
                "Driver Name ": driver_name,
            })
        );

        const csvContent =
            "data:text/csv;charset=utf-8," +
            excelData.map((data) => Object.values(data).join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "logistic_report.csv");
        document.body.appendChild(link);
        link.click();
    };
    return (
        <div>
            {/* Download report button */}
            <Button
                variant="contained"
                size="large"
                color="success"
                onClick={downloadReport}
                style={{ marginTop: "10px" }}
            >
                Download Report
            </Button>
        </div>
    )
}

export default Report
