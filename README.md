# 🚀 SmartServiceX — Smart Service & Bug Management System

SmartServiceX is a **multi-service complaint, employee assignment, and bug management system** designed to manage customer complaints from creation to resolution.

The project demonstrates how different technologies can work together in a **microservice-style architecture** using:

**Java Spring Boot • ASP.NET Core • Python FastAPI • PostgreSQL • React • PHP**

---

## 🎯 Project Objective

SmartServiceX provides a centralized platform where users and support teams can:

* Create service complaints
* Automatically classify complaints
* Automatically determine complaint priority
* Track complaint status
* Automatically assign complaints to available employees
* Manage employees and their availability
* Track complaint assignments
* Manage complaint workflows
* Generate reports
* Test APIs and individual services

---

# 🏗️ System Architecture

```text
                         ┌────────────────────────┐
                         │       React UI         │
                         │       Frontend         │
                         └───────────┬────────────┘
                                     │
                                     ▼
                         ┌────────────────────────┐
                         │    Java Spring Boot    │
                         │      Main Backend      │
                         │                        │
                         │ • Authentication       │
                         │ • Users                │
                         │ • Complaints           │
                         │ • Complaint Workflow   │
                         │ • Department Mapping   │
                         └──────────┬───────┬─────┘
                                    │       │
                     ┌──────────────┘       └──────────────┐
                     ▼                                     ▼
          ┌──────────────────────┐             ┌──────────────────────┐
          │    ASP.NET Core      │             │    Python FastAPI    │
          │  Assignment Service  │             │    AI Service        │
          │                      │             │                      │
          │ • Employees         │             │ • Classification     │
          │ • Assignments       │             │ • Priority Detection │
          │ • Auto Assignment   │             │                      │
          └──────────┬───────────┘             └──────────────────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │      PostgreSQL      │
          │       Database       │
          └──────────────────────┘

          ┌──────────────────────┐
          │    PHP Reporting     │
          │       Service        │
          └──────────────────────┘
```

---

# 🔄 Complaint Processing Flow

When a user creates a complaint, the system processes it through multiple services:

```text
User Creates Complaint
        │
        ▼
Java Spring Boot
        │
        ▼
Python FastAPI
        │
        ├── Category Classification
        │
        └── Priority Detection
        │
        ▼
Java Spring Boot
        │
        ▼
Category → Department Mapping
        │
        ▼
ASP.NET Core
        │
        ▼
Find Available Employee
        │
        ▼
Create Assignment
        │
        ▼
Employee Becomes Unavailable
```

### Example

A user submits:

```json
{
  "title": "Internet connection failed",
  "description": "My internet connection failed and I cannot access the service.",
  "category": "Payment",
  "priority": "LOW"
}
```

The Python service analyzes the title and description and returns:

```text
Category: Network
Priority: HIGH
```

Java maps:

```text
Network → IT Support
```

The ASP.NET Core service then finds an available employee from IT Support and automatically assigns the complaint.

---

# 🛠️ Technology Stack

## Backend

| Technology      | Purpose                           |
| --------------- | --------------------------------- |
| Java 21         | Main backend                      |
| Spring Boot     | REST API                          |
| Spring Security | Authentication & authorization    |
| JWT             | Token-based authentication        |
| BCrypt          | Password hashing                  |
| ASP.NET Core    | Employee & assignment service     |
| Python FastAPI  | Classification & priority service |
| PHP             | Reporting service                 |

## Database

| Technology            | Purpose                  |
| --------------------- | ------------------------ |
| PostgreSQL            | Main relational database |
| Spring Data JPA       | Java database access     |
| Hibernate             | ORM                      |
| Entity Framework Core | .NET database access     |

## Frontend

| Technology              | Purpose              |
| ----------------------- | -------------------- |
| React                   | User interface       |
| JavaScript / TypeScript | Frontend development |
| Axios                   | API communication    |
| HTML                    | Structure            |
| CSS                     | Styling              |

## Testing & Development

* Postman
* JUnit
* Mockito
* xUnit
* pytest
* Git
* GitHub

---

# 📁 Project Structure

```text
Smart-Service-Management-System/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── smartservice/
│   │       │           └── backend/
│   │       │               ├── config/
│   │       │               ├── controller/
│   │       │               ├── dto/
│   │       │               ├── entity/
│   │       │               ├── exception/
│   │       │               ├── repository/
│   │       │               ├── security/
│   │       │               └── service/
│   │       └── resources/
│   └── pom.xml
│
├── dotnet-service/
│   ├── Controllers/
│   ├── Data/
│   ├── DTOs/
│   ├── Models/
│   ├── Migrations/
│   ├── Program.cs
│   └── appsettings.json
│
├── python-service/
│   ├── app/
│   │   ├── main.py
│   │   ├── classifier.py
│   │   └── __init__.py
│   └── requirements.txt
│
├── php-reporting/
│
├── frontend/
│
├── database/
│   └── schema.sql
│
├── test-cases/
│   └── TEST_CASES.md
│
└── README.md
```

---

# 🔐 Authentication

SmartServiceX uses **JWT-based authentication**.

## User Registration

```http
POST /api/users
```

Example:

```json
{
  "name": "Omm",
  "email": "omm@example.com",
  "password": "StrongPassword123",
  "role": "USER"
}
```

## Login

```http
POST /api/users/login
```

Example:

```json
{
  "email": "omm@example.com",
  "password": "StrongPassword123"
}
```

The API returns a JWT token.

Protected requests use:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 📋 Complaint Management

The Java Spring Boot service manages complaints.

## Create Complaint

```http
POST /api/complaints?userId={userId}
```

Example:

```json
{
  "title": "Login server problem",
  "description": "Users cannot login to the application.",
  "category": "Technical Support",
  "priority": "HIGH"
}
```

> **Note:** The submitted category and priority are currently sent to the API for request compatibility, but the Python classification service determines the final category and priority from the complaint title and description.

---

# 🤖 Python Classification Service

The Python FastAPI service analyzes complaint text and determines:

* Complaint category
* Complaint priority

### Classification Endpoint

```http
POST /api/classify
```

Example:

```json
{
  "title": "Payment charged twice",
  "description": "My account was charged twice and I need an urgent refund."
}
```

Response:

```json
{
  "title": "Payment charged twice",
  "description": "My account was charged twice and I need an urgent refund.",
  "category": "Payment",
  "priority": "CRITICAL"
}
```

Current classification categories include:

```text
Payment
Account
Network
Delivery
Technical Support
```

Current priority levels:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

---

# 🏢 Department Mapping

After Python classification, Java maps the complaint category to the appropriate department.

Example:

```text
Payment
   ↓
Finance

Network
   ↓
IT Support

Account
   ↓
Customer Support

Delivery
   ↓
Operations

Technical Support
   ↓
Technical Support
```

This department is then sent to the ASP.NET Core assignment service.

---

# 👨‍💻 Employee & Assignment Service

The ASP.NET Core service manages employees and complaint assignments.

## Employee Operations

```http
POST /api/employees
GET  /api/employees
GET  /api/employees/{id}
PUT  /api/employees/{id}/availability
```

## Assignment Operations

```http
POST /api/assignments
GET  /api/assignments
GET  /api/assignments/{id}
PUT  /api/assignments/{id}/status
POST /api/assignments/auto
```

---

# ⚡ Automatic Assignment

SmartServiceX automatically assigns complaints to available employees.

```text
Complaint Created
       ↓
Python Classification
       ↓
Category + Priority
       ↓
Department Mapping
       ↓
ASP.NET Core
       ↓
Find Available Employee
       ↓
Department Match
       ↓
Create Assignment
       ↓
Employee Becomes Unavailable
```

Example:

```json
{
  "complaintId": 12,
  "department": "IT Support"
}
```

The assignment service searches for an available employee in the requested department.

---

# 👥 Employee Availability

Employees have an availability status.

```text
AVAILABLE
    ↓
Complaint Assigned
    ↓
UNAVAILABLE
    ↓
Assignment Completed
    ↓
AVAILABLE
```

Example:

```http
PUT /api/employees/3/availability
```

Request:

```json
true
```

The system also automatically updates availability when assignments are created or completed.

---

# 🔄 Assignment Workflow

Assignments follow:

```text
ASSIGNED
    ↓
IN_PROGRESS
    ↓
COMPLETED
    ↓
CLOSED
```

Employee availability:

```text
Assignment Created
       ↓
Employee → UNAVAILABLE
       ↓
Assignment Completed
       ↓
Employee → AVAILABLE
```

The system has been tested with automatic reassignment after an employee becomes available again.

---

# 🔄 Complaint Workflow

Complaints follow:

```text
OPEN
  ↓
ASSIGNED
  ↓
IN_PROGRESS
  ↓
RESOLVED
  ↓
CLOSED
```

Complaints can also be reopened:

```text
RESOLVED
   ↓
REOPENED
   ↓
IN_PROGRESS
```

The complete lifecycle has been tested successfully.

---

# 🗄️ Database

SmartServiceX currently uses PostgreSQL.

Database:

```text
smart_service_db
```

### Java entities

```text
User
Complaint
```

### .NET entities

```text
Employee
Assignment
```

Both services currently use the same PostgreSQL database for this learning and portfolio project.

> In a production microservice architecture, database ownership would preferably be separated by service.

---

# 🌐 Local Services

During development, services run independently.

### Java Spring Boot

```text
http://localhost:8080
```

### ASP.NET Core Assignment Service

```text
http://localhost:5094
```

### Python FastAPI

```text
http://localhost:8000
```

### Frontend

```text
http://localhost:<frontend-port>
```

---

# 🧪 API Testing

Postman is currently used to test the REST APIs.

Tested functionality includes:

* User registration
* User login
* JWT authentication
* Complaint creation
* Complaint retrieval
* Complaint status updates
* Python complaint classification
* Priority detection
* Department mapping
* Employee creation
* Employee availability
* Manual assignment
* Automatic assignment
* Assignment status updates
* Employee reassignment
* Error handling
* Request validation

---

# 🛡️ Security Features

SmartServiceX implements:

* JWT authentication
* BCrypt password hashing
* Stateless authentication
* Protected REST endpoints
* Input validation
* Global exception handling
* Password exclusion from user response DTOs

> **Never commit real database passwords, JWT secrets, API keys, or other credentials to GitHub.**

Use environment variables or a secure secret-management system for sensitive configuration.

---

# 📊 Current Development Status

| Module                    | Status      |
| ------------------------- | ----------- |
| Java Spring Boot Backend  | ✅ Completed |
| PostgreSQL Database       | ✅ Completed |
| User Registration         | ✅ Completed |
| JWT Login                 | ✅ Completed |
| BCrypt Password Hashing   | ✅ Completed |
| Complaint Management      | ✅ Completed |
| Complaint Status Workflow | ✅ Tested    |
| Global Exception Handling | ✅ Completed |
| ASP.NET Core Service      | ✅ Completed |
| Employee Management       | ✅ Completed |
| Employee Availability     | ✅ Completed |
| Assignment Management     | ✅ Completed |
| Assignment Status         | ✅ Completed |
| Automatic Assignment      | ✅ Tested    |
| Java → C# Integration     | ✅ Tested    |
| Java → Python Integration | ✅ Tested    |
| Python Classification     | ✅ Tested    |
| Priority Detection        | ✅ Tested    |
| Department Mapping        | ✅ Tested    |
| PHP Reporting             | 🚧 Planned  |
| React Frontend            | 🚧 Planned  |
| Automated Test Suite      | 🚧 Planned  |
| Docker Containerization   | 🚧 Planned  |
| CI/CD Pipeline            | 🚧 Planned  |

---

# 🧪 Verified End-to-End Example

The following real workflow has been successfully tested:

```text
User Complaint
     ↓
"Internet connection failed"
     ↓
Python FastAPI
     ↓
Category = Network
Priority = HIGH
     ↓
Java Department Mapping
     ↓
Department = IT Support
     ↓
ASP.NET Core Auto Assignment
     ↓
Amit Kumar
     ↓
Assignment = ASSIGNED
     ↓
Employee = UNAVAILABLE
```

The assignment was then completed:

```text
ASSIGNED
     ↓
COMPLETED
     ↓
Employee = AVAILABLE
```

A new IT Support complaint was subsequently created and automatically assigned to the now-available employee.

The complaint workflow was also verified:

```text
OPEN
 ↓
ASSIGNED
 ↓
IN_PROGRESS
 ↓
RESOLVED
 ↓
CLOSED
```

---

# 🚀 Future Improvements

Planned improvements include:

* React user dashboard
* Admin dashboard
* Employee dashboard
* PHP reporting portal
* Advanced AI-based priority prediction
* Improved complaint classification
* Service-to-service authentication
* Better inter-service error handling
* Email notifications
* Complaint analytics
* Docker containerization
* Docker Compose
* CI/CD pipeline
* Automated unit and integration testing
* API documentation
* Production deployment
* Database-per-service architecture

---

# 🎓 Learning Goals

This project demonstrates practical experience with:

* REST API development
* Microservice-style architecture
* Java Spring Boot
* Spring Security
* JWT authentication
* ASP.NET Core
* C#
* Python FastAPI
* PostgreSQL
* Spring Data JPA
* Entity Framework Core
* Database relationships
* Inter-service communication
* Automatic assignment
* Complaint classification
* Exception handling
* API validation
* Postman API testing
* Git & GitHub

---

# 👨‍💻 Author

## Omm Prakash Parida

**B.Tech — Computer Science & Engineering**

### Skills Demonstrated

```text
Java • Spring Boot • C# • ASP.NET Core
Python • FastAPI • PostgreSQL
React • REST APIs • JWT
Git • GitHub • Postman
```

---

# ⭐ Project

If you find SmartServiceX useful or interesting, consider giving the repository a ⭐.

**SmartServiceX — Smart Service & Bug Management System**
