import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import convertToStandardDate from 'src/utilities/dateConversions';

// PDF component to display data
const RecordsPdf = ({ data }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      borderBottom: '1px solid #000',
    },
    heading: {
      fontSize: 16,
      marginBottom: 10,
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>Support Requests</Text>
        {data.map((record) => (
          <View key={record.r_Id} style={styles.section}>
            <Text style={styles.heading}>Topic: {record.topic}</Text>
            <Text style={styles.text}>Issue: {record.issue}</Text>
            <Text style={styles.text}>Status: {record.status}</Text>
            <Text style={styles.text}>Date: {convertToStandardDate(record.localDate)}</Text>
            
            <Text style={styles.text}>
              Solution: {record.solution ?? 'No solution provided'}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

// Button to download the PDF
const SupportReport = ({ data }) => {
  return (
    <PDFDownloadLink
      document={<RecordsPdf data={data} />}
      fileName="records.pdf"
      style={{ // Style to make the link look like a button
        padding: '10px 20px',
        backgroundColor: 'green', // Blue background
        color: 'white', // White text
        textDecoration: 'none', // No underline
        borderRadius: '5px', // Rounded corners
        border: 'none', // No border
        cursor: 'pointer', // Cursor pointer
        textAlign: 'center', // Centered text
        '&:hover': { backgroundColor: '#0056b3' }, // Darker blue on hover
        marginBottom: '30px', // Margin at the bottom
      }}
    >
      {({ loading }) =>
        loading ? 'Generating PDF...' : 'Download PDF'
      }
    </PDFDownloadLink>
  );
};

// Component to display and download PDF


export default SupportReport;
