import React, { useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Invoice = forwardRef((props, ref) => {
  const [invoiceData, setInvoiceData] = useState(null);

  const fetchInvoiceData = async () => {
    try {
      const response = await axios.get('/your-get-service-url');
      setInvoiceData(response.data);
    } catch (error) {
      console.error('Error fetching invoice data:', error);
    }
  };

  const downloadPDF = () => {
    const input = document.getElementById('invoice');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('invoice.pdf');
    });
  };

  // Expose the downloadPDF method to the parent component
  useImperativeHandle(ref, () => ({
    downloadPDF,
  }));

  return (
    <div>
      <div
        id="invoice"
        style={{ width: '100%', maxWidth: '800px', margin: 'auto' }}
      >
        <h1 style={{ textAlign: 'center' }}>INVOICE</h1>
        {/* Rest of the invoice HTML structure */}
      </div>
    </div>
  );
});

export default Invoice;
