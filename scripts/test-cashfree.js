require('dotenv').config({ path: '.env.local' });
const { Cashfree } = require('cashfree-pg');

Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;

async function testCheckout() {
  try {
    const request = {
      order_amount: 100,
      order_currency: "INR",
      order_id: `ORDER_${Date.now()}_TEST`,
      customer_details: {
        customer_id: `CUST_TEST`,
        customer_phone: "9999999999",
        customer_email: "test@example.com",
        customer_name: "Test User",
      },
      order_meta: {
        return_url: `https://aiclex.in/checkout/success?order_id=TEST`,
        notify_url: `https://aiclex.in/api/checkout/webhook`,
        payment_methods: "cc,dc,ccc,upi,nb,app,emi,paylater"
      },
      order_note: `Test Subscription`
    };

    console.log("Sending to Cashfree...");
    const response = await Cashfree.PGCreateOrder("2023-08-01", request);
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

testCheckout();
