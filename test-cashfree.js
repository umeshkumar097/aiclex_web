require("dotenv").config({ path: ".env.local" });
const { Cashfree } = require("cashfree-pg");

Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = process.env.CASHFREE_ENVIRONMENT === "PRODUCTION" 
  ? Cashfree.Environment.PRODUCTION 
  : Cashfree.Environment.SANDBOX;

async function test() {
  const planNameWithQty = "Smart Coach Webinar Plus (x4)";
  const customerGst = null;
  const request = {
      order_amount: 424800,
      order_currency: "INR",
      order_id: `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      customer_details: {
        customer_id: `CUST_${Date.now()}`,
        customer_phone: "08449488090",
        customer_email: "umesh@aiclex.in",
        customer_name: "Umesh",
      },
      order_meta: {
        return_url: `https://aiclex.in/checkout/success?order_id=test`,
        notify_url: `https://aiclex.in/api/checkout/webhook`,
        payment_methods: "cc,dc,ccc,upi,nb,app,emi,paylater"
      },
      order_note: `${planNameWithQty} Subscription${customerGst ? ' - GST: ' + customerGst : ''}`
    };

    try {
        const response = await Cashfree.PGCreateOrder("2023-08-01", request);
        console.log("Success:", response.data);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}
test();
