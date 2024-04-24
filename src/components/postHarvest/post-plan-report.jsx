import React from "react";

import { PDFDownloadLink,
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

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
