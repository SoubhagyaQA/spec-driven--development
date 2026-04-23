# Summary Module Spec
## 1. Purpose

The Summary module provides analytical insights into user expenses, including:

* Monthly total spending
* Category-wise breakdown
* Expense trends over time

This module uses aggregation logic on expense data.
## 2. Scope
* Get monthly expense summary
* Get expense trends (last 6 months)


## 3. Data Source

This module does **not maintain its own data**.
It aggregates data from:

* Expense collection
* Category collection

## 4. API Endpoints

### 4.1 Monthly Summary

**GET /monthly-summary** (Public)

#### Query Params:

* month (required, 1–12)
* year (required, ≥ 2000)

#### Example:

http id="u8w4eq"
GET /summaries/monthly-summary?month=4&year=2026

#### Response:
json id="7sj51r"
{
  "success": true,
  "message": "Summary fetched successfully",
  "data": {
    "totalSpend": 12000,
    "categories": [
      { "name": "Food", "total": 5000 },
      { "name": "Travel", "total": 3000 }
    ]
  }
}
```

### 4.2 Expense Trends

**GET /trends** (Public)

#### Description:

Returns last 6 months of expense data.

#### Response:

```json id="5u6q8v"
{
  "success": true,
  "message": "Trends fetched successfully",
  "data": [
    { "year": 2026, "month": 4, "total": 5000 },
    { "year": 2026, "month": 3, "total": 7000 }
  ]
}
```

## 5. Validation Rules

### Monthly Summary:

* month:

  * required
  * integer
  * min: 1, max: 12

* year:

  * required
  * integer
  * min: 2000


## 6. Business Logic

### Monthly Summary:

* Filter expenses by:

  * userId (from JWT)
  * selected month and year
* Join category collection (`$lookup`)
* Group expenses by category name
* Calculate:

  * total spend
  * category-wise totals

### Trends:

* Filter by userId
* Group expenses by:

  * year
  * month
* Sort by latest month first
* Limit result to last 6 months


## 7. Aggregation Details

### Monthly Summary:

* `$match` → filter by userId + date range
* `$lookup` → join categories
* `$unwind` → flatten category
* `$group` → category totals
* `$group` → overall total


### Trends:

* `$match` → filter by userId
* `$group` → group by year/month
* `$sort` → latest first
* `$limit` → 6 records


## 8. Security

* All routes are public
* userId is extracted from token (if provided)
* Summary includes user-specific data or public data

## 9. Acceptance Criteria

* Monthly summary returns correct totals
* Category breakdown is accurate
* Trends return last 6 months only
* Unauthorized users cannot access data
* Invalid query parameters return validation error

## 10. Edge Cases

* No expenses in selected month → return:

```json id="r9qz4p"
{
  "totalSpend": 0,
  "categories": []
}
```

* Invalid month/year
* No data for trends → return empty array
* Missing query params


## 11. Performance Considerations

* Use MongoDB aggregation for efficiency
* Index on:

  * userId
  * date
* Avoid unnecessary fields in aggregation

---

## 12. Future Improvements

* Add percentage per category
* Add top spending category
* Add weekly summary
* Add caching (Redis)
* Add custom date range summary

---
