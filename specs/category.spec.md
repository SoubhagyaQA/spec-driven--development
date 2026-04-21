## category.spec.md
Data model (Category)
APIs (CRUD)
Validation rules
Business rules (unique name per user)


# Category Module Spec
## 1. Purpose

The Category module allows users to create and manage expense categories
(e.g., Food, Travel, Utilities) to organize their expenses.

## 2. Scope

* Create category
* Get all categories
* Get single category
* Update category
* Delete category
## 3. Data Model
### Category

* _id: ObjectId
* name: string (required, min 2, max 50)
* userId: ObjectId (reference to User, required)
* isDefault: boolean (default: false)
* createdAt: Date
* updatedAt: Date
## 4. Constraints

* Category name must be unique per user
  (unique index: name + userId)
* Name must be trimmed
* Name length must be between 2 and 50 characters
## 5. API Endpoints

### 5.1 Create Category

**POST /categories**

#### Request Body:

json
{
  "name": "Food"
}

#### Response:

json
{
  "success": true,
  "data": {
    "_id": "123",
    "name": "Food"
  }
}

#### Errors:

* 400 → Validation error
* 409 → Category already exists

### 5.2 Get All Categories

**GET /categories**

#### Query Params:

* page (default: 1)
* limit (default: 10)
* search (optional)

#### Response:

json
{
  "success": true,
  "data": []
}
### 5.3 Get Category by ID

**GET /categories/:id**

#### Response:
json
{
  "success": true,
  "data": {
    "_id": "123",
    "name": "Food"
  }
}

#### Errors:

* 400 → Invalid ID
* 404 → Category not found
### 5.4 Update Category

**PUT /categories/:id**

#### Request Body:
json
{
  "name": "Travel"
}

#### Response:

json
{
  "success": true,
  "data": {}
}

#### Errors:

* 400 → Validation error
* 404 → Category not found

### 5.5 Delete Category

**DELETE /categories/:id**

#### Response:

json
{
  "success": true,
  "message": "Category deleted successfully"
}

#### Errors:

* 400 → Invalid ID
* 404 → Category not found

## 6. Validation Rules

* name:

  * required
  * string
  * min length: 2
  * max length: 50

* id:

  * must be valid MongoDB ObjectId
## 7. Business Logic

* Each category belongs to a specific user
* Users can only access their own categories
* Duplicate category names are not allowed per user
* Default categories cannot be deleted (if enabled)

## 8. Security

* All routes require JWT authentication
* User ID is extracted from token
* Data must be filtered by userId
## 9. Acceptance Criteria

* User can create category successfully
* Duplicate category throws error
* User cannot access other users' categories
* Invalid ID returns 400 error
* Delete removes category successfully
* Update reflects correct changes

## 10. Edge Cases

* Empty name
* Name with only spaces
* Duplicate category
* Invalid ObjectId
* Deleting non-existing category
## 11. Future Improvements

* Add default categories (system-generated)
* Add category icons
* Add soft delete
* Prevent deletion if used in expenses
