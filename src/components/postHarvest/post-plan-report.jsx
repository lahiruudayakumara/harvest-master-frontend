import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  Image,
} from "@react-pdf/renderer";

const PdfReport = ({ plandata, imageData }) => (
  <Document>
    <Page>
      <Text>Farming Report</Text>
      <Image
        src={`data:image/jpeg;base64,${imageData}`}
        style={{ width: 200, height: 200 }}
      />
      <Text>Field Name: {plandata.fieldName}</Text>
      <Text>Field ID: {plandata.fieldId}</Text>
      <Text>Area: {plandata.area}</Text>
      <Text>Ownership: {plandata.ownership}</Text>
      <Text>Location: {plandata.location}</Text>
      <Text>ZIP Code: {plandata.zip}</Text>
      <Text>Registration Number: {plandata.regNo}</Text>
      <Text>Planted Date: {plandata.plantedDate}</Text>
      <Text>Harvest Date: {plandata.harvestDate}</Text>
      <Text>Paddy Variety: {plandata.paddyVareity}</Text>
      <Text>Farmer ID: {plandata.farmer}</Text>
      <Text>Fertilizer Type: {plandata.fertilizerType}</Text>
      <Text>Type: {plandata.type}</Text>
      <Text>Split: {plandata.split}</Text>
    </Page>
  </Document>
);

const Report = ({ plandata, imageData }) => (
  <div>
    <PDFDownloadLink
      document={<PdfReport plandata={plandata} imageData={imageData} />}
      fileName="postharvest_report.pdf"
      style={{ textDecoration: "none",color: "white"}}
    >
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Generate Report"
      }
    </PDFDownloadLink>
  </div>
);

export default Report;
