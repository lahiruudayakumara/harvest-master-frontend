import React from "react";

import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import jsPDF from "jspdf";
import imgData from "src/assets/images/letter-head.png";

const styles = StyleSheet.create({
  page: {
    padding: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginBottom: 10,
    textAlign: "center",
  },
  header: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    marginBottom: 5,
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    alignSelf: "center",
  },
});

const PdfReport = ({ plandata, imageData }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Farming Information</Text>
        <Image
          src={`data:image/jpeg;base64,${imageData}`}
          style={styles.image}
        />
        <Text style={styles.text}>Field Name: {plandata.fieldName}</Text>
        <Text style={styles.text}>Field ID: {plandata.fieldId}</Text>
        <Text style={styles.text}>Area: {plandata.area}</Text>
        <Text style={styles.text}>Ownership: {plandata.ownership}</Text>
        <Text style={styles.text}>Location: {plandata.location}</Text>
        <Text style={styles.text}>ZIP Code: {plandata.zip}</Text>
        <Text style={styles.text}>Registration Number: {plandata.regNo}</Text>
        <Text style={styles.text}>Planted Date: {plandata.plantedDate}</Text>
        <Text style={styles.text}>Harvest Date: {plandata.harvestDate}</Text>
        <Text style={styles.text}>Paddy Variety: {plandata.paddyVareity}</Text>
        <Text style={styles.text}>Farmer ID: {plandata.farmer}</Text>
        <Text style={styles.text}>
          Fertilizer Type: {plandata.fertilizerType}
        </Text>
        <Text style={styles.text}>Type: {plandata.type}</Text>
        <Text style={styles.text}>Split: {plandata.split}</Text>
      </View>
    </Page>
  </Document>
);

const GeneratePDF = ({ plandata, imageData, auditData,paddyStock }) => {
  console.log("report");
  const doc = new jsPDF();

  // Get current date and time
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const margin = 15;
  doc.addImage(
    imgData,
    "PNG",
    0,
    0,
    doc.internal.pageSize.getWidth(),
    doc.internal.pageSize.getHeight()
  );

  const tableStartY = margin + 60;
  // Set font size and add text
  doc.setFontSize(8);


  // Set table header color
  doc.setFillColor(144, 238, 144); // Light green color

  doc.autoTable({
    startY: tableStartY,
    body: [
      ["Registration Number", plandata.regNo],
      ["Location", plandata.location],
      ["Area (arces)", plandata.area],
      ["Postal Code", plandata.zip],
      ["Planted Date", plandata.plantedDate],
      ["Paddy Variety", plandata.paddyVareity],
      ["Fertilizer Type", plandata.fertilizerType],
      ["Split", plandata.split],
      ["Ownership", plandata.ownership],
      ["Paddy Stock Status", paddyStock.status],
      ["Harvest Date", plandata.harvestDate],
      ["Dry Weight", auditData.weight],
      ["Sold Amount (Kg)", paddyStock.amount],
      ["Starting Price (Rs)", paddyStock.price],
      ["Expected minimum income (Rs)", paddyStock.amount * paddyStock.price],
      ["Remaining Stock amount (Kg)", auditData.weight - paddyStock.amount],
    ],
    theme: "grid", // Add grid lines
    headStyles: { fillColor: "green" }, // Set header background color
    alternateRowStyles: { fillColor: "white" }, // Set alternate row background color
    columnStyles: {
      0: { fontStyle: "bold" }, // Style the first column as bold
      1: { fontStyle: "normal" }, // Style the second column as normal
    },
  });
    
     doc.text(
       `HARVEST MASTER Post Harvest Report - ${currentDate} ${currentTime}`,
       margin,
       margin + 40
     );

  doc.save("post_harvest.pdf");
};

export default GeneratePDF;
