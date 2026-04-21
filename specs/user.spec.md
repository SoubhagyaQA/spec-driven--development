# User Module Spec

## 1. Purpose

The User module manages user data and identity within the system.
It works closely with the Auth module for authentication and authorization.

## 2. Scope

* Store user information
* Provide user profile data
* Support authentication (via Auth module)

## 3. Data Model

### User

* _id: ObjectId
* name: string (required, min 2, max 50)
* email: string (required, unique, lowercase)
* password: string (required, hashed)
* createdAt: Date
* updatedAt: Date

## 4. Constraints

* Email must be unique
* Email must be lowercase
* Password must be hashed before saving
* Name must be trimmed

## 5. API Endpoints

### 5.1 Get Current User

**GET /auth**

#### Description:

Returns logged-in user details

#### Headers:

Authorization: Bearer token

#### Response:

```json id="eq3f3l"
{
  "success": true,
  "message": "User fetched successfully",
  "data": {
    "_id": "123",
    "name": "John",
    "email": "john@example.com"
  }
}
```

---

## 6. Validation Rules

* name:

  * required
  * string
  * min: 2
  * max: 50

* email:

  * required
  * valid email format
  * stored in lowercase

* phone:
  *  required
  * valid number should be 10 digit
  * stored in only number not car

* password:

  * required
  * min length: 6



## 7. Business Logic

* Password must be hashed using bcrypt before saving
* Email must be normalized (lowercase)
* User data must never expose password in API responses
* Only authenticated user can access their profile
* User ID is extracted from JWT token

## 8. Security

* JWT-based authentication required
* Password must never be stored in plain text
* Password must not be returned in API responses
* Protected routes require valid token


## 9. Acceptance Criteria

* User can retrieve their profile using valid token
* Password is securely stored (hashed)
* Duplicate email is not allowed
* Unauthorized access returns 401
* Password is never exposed in response


## 10. Edge Cases

* Invalid token
* Expired token
* Duplicate email registration
* Missing required fields
* Attempt to access another user's data


## 11. Future Improvements

* Add profile update API
* Add password change API
* Add profile picture upload
* Add email verification
* Add role-based access control (RBAC)


