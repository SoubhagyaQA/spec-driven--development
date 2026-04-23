# Auth Module Spec

---

## 1. Purpose

The Auth module handles user authentication and authorization using JWT.

It provides:

* User registration
* User login
* Token-based authentication
* Access to current user profile

---

## 2. Scope

* Register new user
* Login existing user
* Generate JWT token
* Validate user identity for protected routes

---

## 3. Data Model (Reference)

Uses the **User model**:

* _id: ObjectId
* name: string
* email: string (unique)
* password: string (hashed)

---

## 4. API Endpoints

---

### 4.1 Register User

**POST /auth/register**

#### Request Body:

```json id="n3m9fs"
{
  "name": "John",
  "email": "john@example.com",
  "password": "123456",
  "phone": "9090374584"
}
```

#### Response:

```json id="c9r92m"
{
  "success": true,
  "statusCode": 201,
  "message": "Created successfully",
  "data": {
    "_id": "123",
    "name": "John",
    "email": "john@example.com",
    "phone": "9090374584"
  }
}
```

#### Errors:

* 400 → Validation error
* 409 → Email already exists

---

### 4.2 Login User

**POST /auth/login**

#### Request Body:

```json id="4v48nj"
{
  "email": "john@example.com",
  "password": "123456"
}
```

#### Response:

```json id="a9o5ye"
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN"
  }
}
```

#### Errors:

* 400 → Invalid credentials
* 404 → User not found


### 4.3 Get Current User

**GET /auth/me**

#### Headers:

Authorization: Bearer token

#### Response:

```json id="w9mjgk"
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

#### Errors:

* 401 → Unauthorized 

## 5. Validation Rules

### Register:

* name:

  * required
  * string
  * min: 2, max: 50

* email:

  * required
  * valid email format
  * lowercase

* phone
  
    * required
    * Number
    * min 10 digit

* password:

  * required
  * min length: 6


### Login:

* email:

  * required
  * valid email

* password:

  * required

## 6. Business Logic

### Register:

* Check if email already exists
* Hash password using bcrypt
* Save user in database

### Login:

* Find user by email
* Compare password using bcrypt
* Generate JWT token

---

### Token:

* Payload:

```json id="n0f47c"
{
  "id": "userId"
}
```

* Expiry: 7 days

---

### Authentication:

* Token is sent in header:
  Authorization: Bearer <token>
* Middleware verifies token
* Extract userId and attach to request (`req.user`)

## 7. Security

* Password must be hashed (bcrypt)
* JWT secret must be stored in environment variables
* Token must not be exposed in logs
* Protected routes require valid JWT
* Password must never be returned in API responses

## 8. Acceptance Criteria

* User can register successfully
* Duplicate email is not allowed
* User can login with valid credentials
* Invalid credentials return error
* Token is generated on login
* User can access protected routes with token
* Unauthorized access returns 401

## 9. Edge Cases

* Duplicate email registration
* Invalid email format
* Incorrect password
* Missing token
* Expired token
* Malformed token

## 10. Error Handling

* 400 → Validation errors
* 401 → Unauthorized
* 404 → User not found
* 409 → Duplicate email

## 11. Future Improvements

* Refresh token implementation
* Logout functionality (token blacklist)
* Email verification
* Forgot password / reset password
* Multi-factor authentication (OTP)

