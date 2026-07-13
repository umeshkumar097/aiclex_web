import PDFDocument from 'pdfkit';
import { toWords } from 'number-to-words';

export interface InvoiceData {
  invoice_number: string;
  invoice_date: string;
  due_date: string;
  status: string; // 'ACTIVE' (PAID) or 'PENDING' (DUE)
  payment_link?: string;
  customer_name: string;
  customer_company?: string;
  customer_gstin?: string;
  customer_phone?: string;
  customer_email?: string;
  plan_name: string;
  rate: number;
  qty: number;
  taxable_value: number;
  tax_amount: number;
  total_amount: number;
}

export function generateInvoicePdf(data: InvoiceData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Top Left Header
      doc.fillColor('#0055ff').fontSize(14).font('Helvetica-Bold').text('TAX INVOICE', 50, 45);
      
      // Top Right - PAID or DUE stamp
      const statusColor = data.status === 'ACTIVE' ? '#22c55e' : '#ef4444';
      const statusText = data.status === 'ACTIVE' ? 'PAID' : 'DUE';
      
      // Draw status stamp box
      doc.rect(430, 35, 100, 30).fillAndStroke(statusColor, statusColor);
      doc.fillColor('white').fontSize(16).font('Helvetica-Bold').text(statusText, 430, 42, { width: 100, align: 'center' });

      // Company Info
      doc.fillColor('#000000').fontSize(14).font('Helvetica-Bold').text('AICLEX SOLUTIONS PVT. LTD.', 50, 75);
      doc.fillColor('#444444').fontSize(9).font('Helvetica').text('(Trading as AICLEX™ Technologies)', 50, 93);
      doc.fillColor('#000000').fontSize(9).font('Helvetica-Bold')
         .text('GSTIN ', 50, 107).font('Helvetica').text('09ABGCA0151N1ZL  ', { continued: true })
         .font('Helvetica-Bold').text('CIN ', { continued: true }).font('Helvetica').text('U62099UW2026PTC254970');

      
      doc.font('Helvetica-Bold').fontSize(8)
         .text('Corp Office: ', { continued: true }).font('Helvetica').text('Unit No 8125, 8th Floor, Gaur City Mall, Sector 4, Greater Noida – 201318')
         .font('Helvetica-Bold').text('Regd Office: ', { continued: true }).font('Helvetica').text('E58, Sector 3, Noida, Uttar Pradesh – 201301');
      doc.fontSize(9);
      
      doc.font('Helvetica-Bold').text('Mobile ', { continued: true }).font('Helvetica').text('+91 8449488090  ', { continued: true })
         .font('Helvetica-Bold').text('Email ', { continued: true }).font('Helvetica').text('info@aiclex.in');
      doc.font('Helvetica-Bold').text('Website ', { continued: true }).font('Helvetica').text('aiclex.in');

      // Invoice Details Line
      doc.moveDown(2);
      const invoiceY = doc.y;
      doc.font('Helvetica-Bold').text('Invoice #: ', 50, invoiceY, { continued: true }).font('Helvetica').text(data.invoice_number);
      doc.font('Helvetica-Bold').text('Invoice Date: ', 220, invoiceY, { continued: true }).font('Helvetica').text(data.invoice_date);
      doc.font('Helvetica-Bold').text('Due Date: ', 400, invoiceY, { continued: true }).font('Helvetica').text(data.due_date);

      // Customer Details
      doc.moveDown(1.5);
      const customerY = doc.y;
      doc.font('Helvetica-Bold').text('Customer Details:', 50, customerY);
      doc.font('Helvetica-Bold').text(data.customer_name, 50, customerY + 15);
      
      if (data.customer_company) {
         doc.font('Helvetica-Bold').text(data.customer_company, 50, customerY + 30);
      }
      if (data.customer_gstin) {
         doc.font('Helvetica-Bold').text('GSTIN: ', 50, customerY + 45, { continued: true }).font('Helvetica').text(data.customer_gstin);
      }
      if (data.customer_phone) {
         doc.font('Helvetica-Bold').text('Phone: ', 50, customerY + 60, { continued: true }).font('Helvetica').text(data.customer_phone);
      }
      if (data.customer_email) {
         doc.font('Helvetica-Bold').text('Email: ', 50, customerY + 75, { continued: true }).font('Helvetica').text(data.customer_email);
      }

      // Billing Address
      doc.font('Helvetica-Bold').text('Billing Address:', 300, customerY);
      doc.font('Helvetica').text('As per records', 300, customerY + 15);

      // Place of Supply
      doc.moveDown(3);
      doc.font('Helvetica-Bold').text('Place of Supply:');
      doc.font('Helvetica-Bold').text('UTTAR PRADESH');

      // Table Header
      doc.moveDown(1.5);
      const tableTop = doc.y;
      doc.rect(50, tableTop, 500, 20).fill('#f4f6f9');
      doc.fillColor('#0055ff').font('Helvetica-Bold').fontSize(9);
      doc.text('#', 55, tableTop + 5, { width: 20 });
      doc.text('Item', 80, tableTop + 5, { width: 150 });
      doc.text('Rate / Item', 240, tableTop + 5, { width: 70, align: 'right' });
      doc.text('Qty', 320, tableTop + 5, { width: 30, align: 'right' });
      doc.text('Taxable Value', 360, tableTop + 5, { width: 70, align: 'right' });
      doc.text('Tax Amount', 440, tableTop + 5, { width: 60, align: 'right' });
      doc.text('Amount', 510, tableTop + 5, { width: 40, align: 'right' });

      // Table Row
      const rowTop = tableTop + 25;
      doc.fillColor('#000000').font('Helvetica').fontSize(9);
      doc.text('1', 55, rowTop, { width: 20 });
      doc.font('Helvetica-Bold').text(data.plan_name, 80, rowTop, { width: 150 });
      doc.font('Helvetica').text('SAC: 998424', 80, rowTop + 12, { width: 150 }); // Generic SAC code for software/services
      
      doc.text(data.rate.toFixed(2), 240, rowTop, { width: 70, align: 'right' });
      doc.text(data.qty.toString(), 320, rowTop, { width: 30, align: 'right' });
      doc.text(data.taxable_value.toFixed(2), 360, rowTop, { width: 70, align: 'right' });
      doc.text(data.tax_amount.toFixed(2) + ' (18%)', 440, rowTop, { width: 60, align: 'right' });
      doc.text(data.total_amount.toFixed(2), 510, rowTop, { width: 40, align: 'right' });

      // Table lines
      doc.moveTo(50, tableTop).lineTo(550, tableTop).stroke('#e5e7eb');
      doc.moveTo(50, tableTop + 20).lineTo(550, tableTop + 20).stroke('#e5e7eb');
      doc.moveTo(50, rowTop + 30).lineTo(550, rowTop + 30).stroke('#e5e7eb');

      // Totals
      const totalsTop = rowTop + 40;
      doc.font('Helvetica-Bold').text('Taxable Amount', 360, totalsTop, { width: 90 });
      doc.font('Helvetica-Bold').text('Rs. ' + data.taxable_value.toFixed(2), 460, totalsTop, { width: 90, align: 'right' });
      
      doc.font('Helvetica-Bold').text('IGST 18.0%', 360, totalsTop + 15, { width: 90 });
      doc.font('Helvetica-Bold').text('Rs. ' + data.tax_amount.toFixed(2), 460, totalsTop + 15, { width: 90, align: 'right' });

      doc.moveTo(360, totalsTop + 30).lineTo(550, totalsTop + 30).stroke('#e5e7eb');
      
      doc.fontSize(12).font('Helvetica-Bold').text('Total', 360, totalsTop + 35, { width: 90 });
      doc.fontSize(12).font('Helvetica-Bold').text('Rs. ' + data.total_amount.toFixed(2), 460, totalsTop + 35, { width: 90, align: 'right' });

      // Amount in words
      doc.moveTo(50, totalsTop + 55).lineTo(550, totalsTop + 55).stroke('#0055ff');
      
      doc.fontSize(9).font('Helvetica').text('Total Items / Qty : 1 /' + data.qty, 50, totalsTop + 60);
      
      // Convert amount to words
      const words = toWords(data.total_amount).toUpperCase();
      doc.text(`Total amount (in words): INR ${words} RUPEES ONLY`, 150, totalsTop + 60, { width: 400, align: 'right' });

      // Bottom section
      doc.moveDown(4);
      const bottomY = doc.y;

      // Bank Details
      doc.font('Helvetica-Bold').text('Bank Details:', 50, bottomY);
      doc.font('Helvetica').text('Bank:', 50, bottomY + 15);
      doc.font('Helvetica-Bold').text('State Bank of India', 120, bottomY + 15);
      
      doc.font('Helvetica').text('Account Holder:', 50, bottomY + 30);
      doc.font('Helvetica-Bold').text('AICLEX SOLUTIONS PVT LTD', 130, bottomY + 30);
      
      doc.font('Helvetica').text('Account #:', 50, bottomY + 45);
      doc.font('Helvetica-Bold').text('44636629133', 120, bottomY + 45);
      
      doc.font('Helvetica').text('IFSC Code:', 50, bottomY + 60);
      doc.font('Helvetica-Bold').text('sbin0060457', 120, bottomY + 60);
      
      doc.font('Helvetica').text('Branch:', 50, bottomY + 75);
      doc.font('Helvetica-Bold').text('SECTOR, NOIDA', 120, bottomY + 75);

      // Payment Link if DUE
      if (data.status === 'PENDING' && data.payment_link) {
        doc.rect(300, bottomY, 250, 60).fill('#f8fafc').stroke('#e2e8f0');
        doc.fillColor('#001341').font('Helvetica-Bold').text('Pay Online Now:', 310, bottomY + 10);
        
        doc.fillColor('#0055ff').font('Helvetica').text(
          'Click here to complete payment securely via Cashfree.', 
          310, bottomY + 25, 
          { width: 230, link: data.payment_link, underline: true }
        );
      }

      // Authorized Signatory
      const signY = bottomY + 90;
      doc.fillColor('#000000').font('Helvetica').text('For AICLEX SOLUTIONS PVT. LTD.', 360, signY);
      doc.fillColor('#444444').font('Helvetica').fontSize(8).text('(Trading as AICLEX™ Technologies)', 360, signY + 12);
      
      // Draw a fake signature line just for aesthetic
      doc.moveTo(400, signY + 35).lineTo(430, signY + 25).lineTo(460, signY + 40).lineTo(480, signY + 10).lineTo(520, signY + 20).stroke('#000000');
      
      doc.font('Helvetica').text('Authorized Signatory', 400, signY + 50);

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
