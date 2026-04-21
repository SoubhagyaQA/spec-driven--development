## expense.spec.md
Expense model
Filters (date, category)
Pagination
Validation rules
Business logic

====================================
# Expense Module Spec
## 1. Purpose

Manage user expenses with filtering and tracking.

## 2. Data Model

Expense:

* _id: ObjectId
* amount: number (>0)
* categoryId: ObjectId
* userId: ObjectId
* date: Date (not future)
* notes: string (optional, max 200)

## 3. APIs

### Create Expense

POST /expenses

### Get All Expenses

GET /expenses
Query:

* page
* limit
* categoryId
* startDate
* endDate

### Get One

GET /expenses/:id

### Update

PUT /expenses/:id

### Delete

DELETE /expenses/:id

## 4. Validation Rules

* amount > 0
* date <= current date
* categoryId must be valid
* endDate >= startDate

## 5. Business Logic

* Filter by category
* Filter by date range
* Apply pagination
* Only user-specific data

## 6. Acceptance Criteria

* User cannot access other user's data
* Invalid ID returns 400
* Pagination works
* Filters work correctly

