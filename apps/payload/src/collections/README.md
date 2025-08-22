# Payload CMS Collections

This document describes the collections available in the Payload CMS system.

## Collections List

### A - Archive (Archive)
- **Slug**: `archives`
- **Description**: Collection for storing archived documents and materials
- **Main fields**: title, slug, description, content, status

### B - Base (Base)
- **Slug**: `bases`
- **Description**: Basic collection for general materials
- **Main fields**: title, slug, description, content, status

### C - Contractor (Contractor)
- **Slug**: `contractors`
- **Description**: Management of contractors and external executors
- **Main fields**: name, email, phone, company, specialization, status

### D - Deal (Deal)
- **Slug**: `deals`
- **Description**: Management of deals and commercial proposals
- **Main fields**: title, value, currency, status, expectedCloseDate

### E - Employee (Employee)
- **Slug**: `employees`
- **Description**: Management of personnel and employees
- **Main fields**: fullName, email, position, department, hireDate, salary, status

### F - Finance (Finance)
- **Slug**: `finances`
- **Description**: Management of financial operations
- **Main fields**: title, amount, currency, type, category, date, status

### G - Goal (Goal)
- **Slug**: `goals`
- **Description**: Management of goals and tasks
- **Main fields**: title, description, targetDate, priority, status, progress

### H - Human (Human)
- **Slug**: `humans`
- **Description**: General information about people
- **Main fields**: fullName, email, phone, dateOfBirth, gender, address, status

### I - Invoice (Invoice)
- **Slug**: `invoices`
- **Description**: Management of invoices and invoice issuance
- **Main fields**: invoiceNumber, amount, currency, issueDate, dueDate, status, clientName

### L - Location (Location)
- **Slug**: `locations`
- **Description**: Management of locations and addresses
- **Main fields**: name, type, address, city, country, coordinates, status

### M - Message (Message)
- **Slug**: `messages`
- **Description**: System of messages and communications
- **Main fields**: subject, content, sender, recipient, messageType, priority, status

### O - Outreach (Outreach)
- **Slug**: `outreaches`
- **Description**: Management of external communications and campaigns
- **Main fields**: title, type, description, targetAudience, targetDate, budget, status

### P - Product (Product)
- **Slug**: `products`
- **Description**: Management of products and goods
- **Main fields**: name, description, price, currency, category, SKU, stock, dimensions

### Q - Qualification (Qualification)
- **Slug**: `qualifications`
- **Description**: Management of qualifications and certificates
- **Main fields**: title, type, level, description, issuingOrganization, issueDate, expiryDate

### R - Routine (Routine)
- **Slug**: `routines`
- **Description**: Management of recurring tasks and procedures
- **Main fields**: title, description, frequency, nextDue, lastCompleted, priority, status

### T - Text (Text)
- **Slug**: `texts`
- **Description**: Management of textual content
- **Main fields**: title, content, type, language, summary, tags, status, author

### U - University (University)
- **Slug**: `universities`
- **Description**: Management of educational institutions
- **Main fields**: name, type, country, city, address, website, founded, accreditation

### V - Vote (Vote)
- **Slug**: `votes`
- **Description**: System of voting and surveys
- **Main fields**: title, description, type, startDate, endDate, options, eligibleVoters, status

### W - Wallet (Wallet)
- **Slug**: `wallets`
- **Description**: Management of financial accounts and wallets
- **Main fields**: name, type, balance, currency, accountNumber, bankName, status

### Y - Yard (Yard)
- **Slug**: `yards`
- **Description**: Management of territories and areas
- **Main fields**: name, type, size, address, city, country, features, capacity, status

### Z - Zoo (Zoo)
- **Slug**: `zoos`
- **Description**: Management of zoos and animals
- **Main fields**: name, description, country, city, size, animals, exhibits, openingHours, status

## Features

All collections include:
- **Basic fields**: title/name, slug (where applicable), description, status
- **Access control**: creation, reading, updating, and deleting only for authorized users
- **Administrative interface**: customizable columns and headers
- **Validation**: required fields and unique constraints where necessary
- **Statuses**: different statuses for managing the lifecycle of records

## Usage

Collections are automatically available in the Payload CMS administrative panel after server restart. Each collection has its own section with corresponding fields and settings.
