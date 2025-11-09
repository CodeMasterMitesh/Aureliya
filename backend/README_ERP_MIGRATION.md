## MySQL Dual-Run Migration Overview

This backend now supports an optional MySQL connection (MariaDB 10.6) alongside the existing MongoDB database to enable a phased migration.

### Enabling MySQL
Set `MYSQL_ENABLED=true` in the backend environment. Docker compose already defines a MariaDB service with initial schema seeded from `project.sql` mounted into the container's `/docker-entrypoint-initdb.d`.
If you want auth/users to use MySQL `contacts`, also set `MYSQL_USERS=true`.

### Environment Variables
```
MYSQL_ENABLED=true
MYSQL_USERS=false
MYSQL_HOST=mysql
MYSQL_PORT=3306
MYSQL_DB=aureliya
MYSQL_USER=aureliya
MYSQL_PASSWORD=aureliya_pass
```

### Connection Lifecycle
`src/server.js` connects to Mongo first (to preserve all current functionality) and then attempts MySQL initialization via `initMysqlIfEnabled()`. Failures in MySQL do NOT abort startup while migrating—logs will indicate issues so they can be fixed without halting existing operations.

### Pool Utility
`src/db/mysql.js` exports:
- `initMysqlIfEnabled()` – initializes the pool if the flag is set.
- `getMysqlPool()` – retrieves the pool (throws if disabled/uninitialized).
- `runQuery(sql, params)` – convenience wrapper with timing & error logging.

### Recommended Phased Migration Steps
1. Read-only shadow: Implement parallel read endpoints hitting MySQL (`/shadow/companies`) to compare responses with Mongo.
2. Data backfill: Script export from Mongo → transform → bulk insert into MySQL tables matching `project.sql` structure.
3. Dual-write: On create/update in core entities, write to both Mongo and MySQL; log divergences.
4. Cut-over: Flip API handlers to serve from MySQL primary; retain Mongo for rollback window.
5. Decommission: After validation period, archive Mongo data and disable dual writes.

### Error Handling Strategy
MySQL initialization errors are logged but non-fatal. Individual query errors should be surfaced via existing Express error middleware while tagging them as SQL-related for quick triage.

### Next Actions
1. Create repository modules (e.g., `repositories/companyRepo.{mongo,mysql}.js`).
2. Introduce an abstraction & feature flag `DATA_SOURCE=Mongo|MySQL|Dual`.
3. Implement comparison script (`scripts/compareCompanies.js`) to diff record counts & sample rows.

### Security & Credentials
Change the sample passwords (`root_pass_change`, `aureliya_pass`) for any non-local usage. Use Docker secrets or environment files excluded from version control in production.

### Performance Note
Default pool size = 10. Adjust `connectionLimit` based on concurrency; add indexes in MySQL replicating high-frequency Mongo query patterns.

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
- npm run db:unique-contacts-email  # optional: add unique(email) to contacts when ready

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
