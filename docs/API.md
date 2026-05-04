# API Documentation

Complete API reference for the Website Felizardos E-Commerce application.

## Base URL

```
Development: http://localhost:3000/api
Production: https://yourdomain.com/api
```

## Authentication Endpoints

### Register User

Create a new user account.

**Request**:
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "fullName": "John Doe"
}
```

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| email | string | Yes | User email address |
| password | string | Yes | User password (minimum 6 characters) |
| fullName | string | No | User's full name |

**Response (201 Created)**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "full_name": "John Doe",
    "created_at": "2024-01-01T12:00:00Z"
  }
}
```

**Response (400 Bad Request)**:
```json
{
  "success": false,
  "error": "Email and password are required"
}
```

**Response (400 Conflict)**:
```json
{
  "success": false,
  "error": "User already exists"
}
```

---

### Login User

Authenticate and retrieve user information.

**Request**:
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| email | string | Yes | User email address |
| password | string | Yes | User password |

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "created_at": "2024-01-01T12:00:00Z"
  }
}
```

**Response (401 Unauthorized)**:
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

## Event Endpoints

### Get All Events

Retrieve a list of all events.

**Request**:
```http
GET /events
```

**Query Parameters**: None

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Events fetched successfully",
  "data": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440000",
      "name": "Basketball Tournament",
      "description": "Annual basketball tournament",
      "date": "2024-02-15T10:00:00Z",
      "location": "Main Court",
      "created_at": "2024-01-01T12:00:00Z",
      "updated_at": "2024-01-01T12:00:00Z"
    }
  ]
}
```

---

### Get Event by ID

Retrieve a specific event by its ID.

**Request**:
```http
GET /events/{id}
```

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | uuid | Event ID |

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Event fetched successfully",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "name": "Basketball Tournament",
    "description": "Annual basketball tournament",
    "date": "2024-02-15T10:00:00Z",
    "location": "Main Court",
    "created_at": "2024-01-01T12:00:00Z",
    "updated_at": "2024-01-01T12:00:00Z"
  }
}
```

**Response (404 Not Found)**:
```json
{
  "success": false,
  "error": "Event not found"
}
```

---

### Create Event

Create a new event.

**Request**:
```http
POST /events
Content-Type: application/json

{
  "name": "Basketball Tournament",
  "description": "Annual basketball tournament",
  "date": "2024-02-15T10:00:00Z",
  "location": "Main Court"
}
```

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | Event name |
| description | string | No | Event description |
| date | ISO 8601 | Yes | Event date and time |
| location | string | No | Event location |

**Response (201 Created)**:
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "name": "Basketball Tournament",
    "description": "Annual basketball tournament",
    "date": "2024-02-15T10:00:00Z",
    "location": "Main Court",
    "created_at": "2024-01-01T12:00:00Z",
    "updated_at": "2024-01-01T12:00:00Z"
  }
}
```

**Response (400 Bad Request)**:
```json
{
  "success": false,
  "error": "Name and date are required"
}
```

---

### Update Event

Update an existing event.

**Request**:
```http
PUT /events/{id}
Content-Type: application/json

{
  "name": "Updated Event Name",
  "description": "Updated description",
  "date": "2024-02-20T10:00:00Z"
}
```

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | uuid | Event ID |

**Body Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | No | Event name |
| description | string | No | Event description |
| date | ISO 8601 | No | Event date and time |
| location | string | No | Event location |

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Event updated successfully",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "name": "Updated Event Name",
    "description": "Updated description",
    "date": "2024-02-20T10:00:00Z",
    "location": "Main Court",
    "created_at": "2024-01-01T12:00:00Z",
    "updated_at": "2024-01-15T14:30:00Z"
  }
}
```

**Response (404 Not Found)**:
```json
{
  "success": false,
  "error": "Event not found"
}
```

---

### Delete Event

Delete an event.

**Request**:
```http
DELETE /events/{id}
```

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | uuid | Event ID |

**Response (200 OK)**:
```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

**Response (404 Not Found)**:
```json
{
  "success": false,
  "error": "Event not found"
}
```

---

## System Endpoints

### Health Check

Check the API health status.

**Request**:
```http
GET /health
```

**Response (200 OK)**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T14:30:00Z",
  "environment": "production"
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### Common Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Authentication required or failed |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server error |

---

## Rate Limiting

Currently, there is no rate limiting implemented. Future versions may include:
- 100 requests per minute for authenticated users
- 10 requests per minute for unauthenticated requests

---

## Pagination

Future API versions may support pagination with these query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

---

## Filtering and Sorting

Future API versions may support:
- `sort`: Sort by field (e.g., `?sort=date`)
- `order`: Sort order (e.g., `?order=asc` or `?order=desc`)
- `filter`: Filter by field (e.g., `?filter[status]=completed`)

---

## Testing API Endpoints

### Using cURL

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123","fullName":"John Doe"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'

# Get Events
curl http://localhost:3000/api/events

# Create Event
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{"name":"Event","date":"2024-02-15T10:00:00Z"}'
```

### Using Postman

1. Import the collection from `docs/postman-collection.json` (to be created)
2. Set environment variables for `base_url` and `auth_token`
3. Run the requests

### Using Thunder Client (VS Code)

1. Create requests in the Thunder Client sidebar
2. Set base URL: `http://localhost:3000/api`
3. Test endpoints

---

## API Versions

- **Current**: v1 (implicit)
- **Future**: v2 (planned for Q2 2024)

---

Last Updated: January 2024
