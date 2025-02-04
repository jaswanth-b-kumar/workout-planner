import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Table } from 'react-bootstrap';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import TableComponent from './TableComponent';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const DownloadComponent = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        
      </View>
    </Page>
  </Document>
);

export default DownloadComponent;