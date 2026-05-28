const { generateInvoicePdf } = require('../lib/invoice-generator.ts');
const fs = require('fs');

async function testPdf() {
  try {
    const pdfBuffer = await generateInvoicePdf({
      invoice_number: "INV-1234",
      invoice_date: "12 May 2026",
      due_date: "12 May 2026",
      status: 'PENDING',
      payment_link: "https://cashfree.com/pay",
      customer_name: "Test User",
      customer_email: "test@example.com",
      plan_name: "Test Plan",
      rate: 100,
      qty: 1,
      taxable_value: 100,
      tax_amount: 18,
      total_amount: 118
    });
    
    fs.writeFileSync('test.pdf', pdfBuffer);
    console.log('PDF generated successfully');
  } catch (error) {
    console.error('PDF Error:', error);
  }
}

testPdf();
