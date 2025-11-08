# ERP Migration (MySQL → Mongo)

This document outlines the ERP-first consolidation and import into canonical Mongo models.

## Canonical Models
- User (with embedded ledger and employee profile)
- Company, Branch, AccountGroup
- Product (sku, unit, hsn_code, gst_rate, mrp, purchase_price, company/branch)
- Transaction (sales_order, purchase_order, voucher, invoice, payment, receipt, journal)
- HR: Employeesalary, Attendance, Leaveregister, Assignshift, Shiftmaster

## Mapping
- Company ← Companymaster
- Branch ← Branchmaster, CompanyBranch
- AccountGroup ← Accountgroups
- User ← Contacts (+ supplier/vendor into User.type)
- Product ← Products, Products1, Products300516, Itemmaster, Newmaterialmaster
- Transaction ← Salesorder(+ Salesorderitem), Purchaseorder, Voucher, Receipt, Payment

Config files:
- `src/scripts/domainMapping.config.json`
- `src/scripts/productConsolidation.config.json`
- `src/scripts/transactionMapping.config.json`

## Import order (recommended)
1. Companies & Branches
2. Account Groups
3. Users (Contacts import already available)
4. Products (consolidation)
5. Transactions

## Commands
- npm run import:companies-branches
- npm run import:account-groups
- npm run import:contacts
- npm run import:products
- npm run import:transactions

Set environment variables in `.env`:
- MONGODB_URI
- MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE

## Implementation Notes
- Streaming import avoids loading entire tables using id-based pagination.
- Relationship resolution by name/code with in-memory caches for speed.
- Product upsert key: sku if present; otherwise hash of name|unit; slug derived from hash.
- Transaction lines are preloaded and joined by header id → line sid according to mapping.
- Validation: Joi schemas in `src/validators/` for Product and Transaction.

## Troubleshooting
- Missing legacy tables: scripts skip and log `Skip missing <table>`.
- Duplicate SKUs: current logic updates the first match; consider enforcing unique per company.
- Party resolution: If party not found in Users, import contacts first or add fallback mapping.
