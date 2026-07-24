# Walkthrough - Siteboard Pricing Update

Successfully updated the **Siteboard CRM** pricing model from monthly packages to a single premium annual plan of **₹1,00,000 / year + GST**, fully integrated with the end-to-end checkout system.

---

## Deliverables Completed

### 1. Updated Pricing Page UI (`app/pricing/page.tsx`)
* Removed the previous monthly Starter and Developer Pro options.
* Replaced them with the new **Developer Pro (Annual)** card priced at **₹1,00,000 / year** (+ 18% GST).
* Maintained the **Enterprise** customized scale option for white-labeled domains and dedicated clouds.

### 2. Updated Checkout Options
* **Frontend Config (`app/checkout/page.tsx`):** Registered the new `siteboard-annual` plan in the client checkout PLANS dictionary map, mapping to the price of ₹1,00,000.
* **Backend API (`app/api/checkout/create-subscription/route.ts`):** Registered the `siteboard-annual` key with its price validation rules on the backend subscription processor.

---

## Verification & Compilation
* Verified that the project builds cleanly via `npm run build`. Pushed successfully to `main`.
