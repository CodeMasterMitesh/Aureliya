-- Normalized replacement for the original extremely wide `contacts` table.
-- This schema splits concerns into multiple tables and uses industry-standard naming.
-- Core table: contacts

CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contact_type ENUM('employee','customer','vendor','lead','other') NOT NULL DEFAULT 'customer',
  salutation VARCHAR(10) NULL,
  first_name VARCHAR(100) NOT NULL,
  middle_name VARCHAR(100) NULL,
  last_name VARCHAR(100) NOT NULL,
  display_name VARCHAR(255) GENERATED ALWAYS AS (CONCAT(IFNULL(first_name,''), ' ', IFNULL(last_name,''))) STORED,
  email VARCHAR(150) NULL,
  secondary_email VARCHAR(150) NULL,
  mobile VARCHAR(30) NULL,
  secondary_mobile VARCHAR(30) NULL,
  status ENUM('active','inactive','pending') NOT NULL DEFAULT 'active',
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  is_deleted TINYINT(1) NOT NULL DEFAULT 0,
  company_id INT NULL,
  branch_id INT NULL,
  group_id INT NULL,
  opening_balance DECIMAL(15,2) NULL,
  closing_balance DECIMAL(15,2) NULL,
  balance_type ENUM('debit','credit') NULL,
  credit_limit DECIMAL(15,2) NULL,
  due_days INT NULL,
  username VARCHAR(100) NULL,
  password_hash VARCHAR(255) NULL,
  last_login DATETIME NULL,
  last_logout DATETIME NULL,
  nationality VARCHAR(50) NULL,
  religion VARCHAR(50) NULL,
  caste VARCHAR(50) NULL,
  marital_status ENUM('single','married','divorced','widowed') NULL,
  birth_date DATE NULL,
  pan VARCHAR(20) NULL,
  gst_no VARCHAR(25) NULL,
  tin_no VARCHAR(25) NULL,
  notes TEXT NULL,
  remarks TEXT NULL,
  created_by INT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by INT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_contacts_email (email),
  INDEX idx_contacts_mobile (mobile),
  INDEX idx_contacts_company_status (company_id, status),
  INDEX idx_contacts_branch (branch_id),
  INDEX idx_contacts_group (group_id),
  UNIQUE KEY uq_contacts_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Address table supporting multiple address types per contact.
CREATE TABLE IF NOT EXISTS contact_addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contact_id INT NOT NULL,
  address_type ENUM('business','home','other','billing','shipping') NOT NULL DEFAULT 'business',
  line1 VARCHAR(255) NOT NULL,
  line2 VARCHAR(255) NULL,
  line3 VARCHAR(255) NULL,
  area VARCHAR(100) NULL,
  city VARCHAR(100) NULL,
  state VARCHAR(100) NULL,
  country VARCHAR(100) NULL,
  postal_code VARCHAR(20) NULL,
  landmark VARCHAR(150) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_contact_addresses_contact (contact_id),
  INDEX idx_contact_addresses_type (address_type),
  CONSTRAINT fk_contact_addresses_contact FOREIGN KEY (contact_id) REFERENCES contacts (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Communication & preference flags separated.
CREATE TABLE IF NOT EXISTS contact_preferences (
  contact_id INT PRIMARY KEY,
  allow_sms TINYINT(1) NOT NULL DEFAULT 0,
  allow_email TINYINT(1) NOT NULL DEFAULT 1,
  allow_push TINYINT(1) NOT NULL DEFAULT 0,
  booking_rate VARCHAR(50) NULL,
  reporting_authority VARCHAR(50) NULL,
  deposit_employee VARCHAR(50) NULL,
  fcm_device_id VARCHAR(255) NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_contact_preferences_contact FOREIGN KEY (contact_id) REFERENCES contacts (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Financial accounts or bank details (optional per contact)
CREATE TABLE IF NOT EXISTS contact_accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contact_id INT NOT NULL,
  bank_name VARCHAR(100) NULL,
  branch_name VARCHAR(100) NULL,
  account_no VARCHAR(50) NULL,
  ifsc_code VARCHAR(20) NULL,
  micr_code VARCHAR(20) NULL,
  swift_code VARCHAR(20) NULL,
  tds_percent DECIMAL(5,2) NULL,
  is_primary TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_contact_accounts_contact (contact_id),
  INDEX idx_contact_accounts_primary (contact_id, is_primary),
  CONSTRAINT fk_contact_accounts_contact FOREIGN KEY (contact_id) REFERENCES contacts (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Suggested additional supporting tables (not created yet):
-- contact_roles(contact_id, role) for flexible role assignments.
-- contact_auth_tokens(contact_id, provider, token_hash, expires_at) for auth integrations.

-- NOTE: Import remaining tables by filtering original project.sql excluding the old contacts table.
-- You can use a text processing step or manual split. After that, run this normalized schema instead of the legacy wide contacts definition.
