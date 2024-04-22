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
            <Text>Logistic Report</Text>
            <Image
                src={`data:image/jpeg;base64,${imageData}`}
                style={{ width: 200, height: 200 }}
            />
            {plandata && (
                <>
                    <Text>Date: {plandata.date}</Text>
                    <Text>Time: {plandata.time}</Text>
                    <Text>Detail: {plandata.detail}</Text>
                </>
            )}
        </Page>
    </Document>
);

const Report = ({ plandata, imageData }) => (
    <div style={{ textAlign: "right" }}>
        <PDFDownloadLink
            document={<PdfReport plandata={plandata} imageData={imageData} />}
            fileName="logistic_report.pdf"
            style={{ textDecoration: "none", color: "green", fontWeight: "bold" }}
        >
            {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Generate Report"
            }
        </PDFDownloadLink>
    </div>
);

export default Report;
