# 🚀 SmartServiceX — Smart Service & Bug Management System

SmartServiceX is a **multi-service complaint, employee assignment, reporting, and bug management system** designed to manage customer complaints from creation to resolution.

The project demonstrates how multiple technologies can work together in a **microservice-style architecture** using:

**Java Spring Boot • ASP.NET Core • Python FastAPI • PostgreSQL • React • PHP**

---

## 🎯 Project Objective

SmartServiceX provides a centralized platform where users, employees, and administrators can:

* Create service complaints
* Automatically classify complaints
* Automatically determine complaint priority
* Map complaints to departments
* Automatically assign complaints to available employees
* Manage employee availability
* Track complaint assignments
* Track complaint status
* Synchronize assignment and complaint statuses
* Provide employee workflow management
* Provide an administrator dashboard
* Generate complaint reports
* Monitor system data
* Test APIs and individual services

---

# 🏗️ System Architecture

```text
                         ┌────────────────────────┐
                         │       React UI         │
                         │      Frontend          │
                         │                        │
                         │ • User Dashboard       │
                         │ • Employee Dashboard   │
                         │ • Admin Dashboard      │
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
                         │ • Assignment Gateway   │
                         │ • Status Synchronizing │
                         └──────────┬───────┬─────┘
                                    │       │
                    ┌───────────────┘       └───────────────┐
                    ▼                                       ▼
         ┌──────────────────────┐              ┌──────────────────────┐
         │    ASP.NET Core      │              │    Python FastAPI    │
         │  Assignment Service  │              │      AI Service      │
         │                      │              │                      │
         │ • Employees          │              │ • Classification     │
         │ • Assignments        │              │ • Priority Detection │
         │ • Auto Assignment    │              │                      │
         │ • Availability       │              │                      │
         └──────────┬───────────┘              └──────────────────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │      PostgreSQL      │
         │       Database       │
         └──────────┬───────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │    PHP Reporting     │
         │       Service        │
         │                      │
         │ • Complaint Reports  │
         │ • Status Statistics  │
         └──────────────────────┘
```

### Service Communication

The React frontend communicates with the **Java Spring Boot backend**.

Java communicates with:

* Python FastAPI for complaint classification and priority detection
* ASP.NET Core for employee and assignment operations

The PHP service reads reporting data from PostgreSQL.

```text
React
  │
  ▼
Java Spring Boot
  │
  ├──────────────► Python FastAPI
  │                  Classification
  │                  Priority Detection
  │
  └──────────────► ASP.NET Core
                     Employees
                     Assignments
                     Auto Assignment

PostgreSQL
  ▲
  │
PHP Reporting Service
```

This architecture avoids direct browser-to-.NET communication and provides a centralized Java backend gateway.

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
        │
        ▼
Employee Starts Work
        │
        ▼
Assignment + Complaint → IN_PROGRESS
        │
        ▼
Employee Completes Work
        │
        ▼
Assignment → COMPLETED
Complaint → RESOLVED
```

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
| C#              | Assignment service development    |
| Python FastAPI  | Classification & priority service |
| PHP             | Reporting service                 |

## Database

| Technology               | Purpose                   |
| ------------------------ | ------------------------- |
| PostgreSQL               | Main relational database  |
| Spring Data JPA          | Java database access      |
| Hibernate                | Java ORM                  |
| Entity Framework Core    | .NET database access      |
| PostgreSQL PHP Extension | PHP database connectivity |

## Frontend

| Technology   | Purpose              |
| ------------ | -------------------- |
| React        | User interface       |
| JavaScript   | Frontend development |
| Axios        | API communication    |
| React Router | Client-side routing  |
| Tailwind CSS | UI styling           |
| Lucide React | UI icons             |
| HTML         | Structure            |
| CSS          | Styling              |

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
│   ├── config.php
│   ├── reports.php
│   └── index.php
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── vite.config.js
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

# 🔐 Authentication & Authorization

SmartServiceX uses **JWT-based authentication** with Spring Security.

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

Public registration creates normal `USER` accounts.

Administrative and employee accounts are not allowed to be created through public registration.

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

### Role-Based Access

The system supports:

```text
USER
EMPLOYEE
ADMIN
```

Admin functionality is protected using role-based authorization.

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
  "description": "Users cannot login to the application."
}
```

The frontend only requires:

* Title
* Description

The Python classification service determines:

* Category
* Priority

The submitted category and priority fields are optional for API compatibility and do not override the classification result.

---

# 🤖 Python Classification Service

The Python FastAPI service analyzes complaint text and determines:

* Complaint category
* Complaint priority

## Classification Endpoint

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

## Current Classification Categories

```text
Payment
Account
Network
Delivery
Technical Support
```

## Current Priority Levels

```text
LOW
MEDIUM
HIGH
CRITICAL
```

---

# 🏢 Department Mapping

After Python classification, Java maps the complaint category to the appropriate department.

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

The selected department is sent to the ASP.NET Core assignment service.

---

# 👨‍💻 Employee & Assignment Service

The ASP.NET Core service manages employees and complaint assignments.

## Employee Operations

```http
POST /api/employees
GET /api/employees
GET /api/employees/{id}
PUT /api/employees/{id}/availability
```

## Assignment Operations

```http
POST /api/assignments
GET /api/assignments
GET /api/assignments/{id}
GET /api/assignments/complaint/{complaintId}
PUT /api/assignments/{id}/status
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
  "complaintId": 27,
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

The system automatically manages employee availability as assignments are created and completed.

---

# 🔄 Assignment Workflow

Assignments follow:

```text
ASSIGNED
    ↓
IN_PROGRESS
    ↓
COMPLETED
```

The Employee Dashboard allows employees to control this workflow:

```text
ASSIGNED
    ↓
[Start Work]
    ↓
IN_PROGRESS
    ↓
[Complete]
    ↓
COMPLETED
```

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

## Assignment & Complaint Synchronization

Employee actions automatically synchronize complaint status.

When an employee starts work:

```text
Assignment → IN_PROGRESS
Complaint  → IN_PROGRESS
```

When an employee completes the assignment:

```text
Assignment → COMPLETED
Complaint  → RESOLVED
```

This synchronization is handled through the Java backend gateway.

---

# 🖥️ React Frontend

The React frontend provides:

* User registration
* User login
* JWT-based session handling
* User dashboard
* Complaint creation
* Complaint listing
* Complaint details
* Assignment information
* Employee Dashboard
* Admin Dashboard
* Employee management view
* Assignment status management
* Complaint status synchronization
* PHP reporting integration
* Logout

## User Dashboard

Users can:

```text
Dashboard
   ├── Create Complaint
   ├── View My Complaints
   └── View Complaint Details
```

## Employee Dashboard

Employees can:

```text
Employee Dashboard
   ├── View Total Assignments
   ├── View Pending Assignments
   ├── View Completed Assignments
   ├── View Assigned Complaints
   ├── Start Work
   └── Complete Assignment
```

## Admin Dashboard

Administrators can:

```text
Admin Dashboard
   ├── View Total Users
   ├── View Total Complaints
   ├── View Employees
   ├── View Pending Assignments
   ├── View Resolved Complaints
   ├── View Recent Complaints
   ├── Monitor Employee Availability
   ├── View Complaint Reports
   └── Refresh Dashboard Data
```

---

# 📊 PHP Reporting Service

SmartServiceX includes a PHP-based reporting service connected to PostgreSQL.

The service provides complaint statistics such as:

* Total complaints
* Open complaints
* Assigned complaints
* In-progress complaints
* Resolved complaints
* Closed complaints

## Reporting Endpoint

```http
GET /reports.php
```

Example response:

```json
{
  "totalComplaints": 28,
  "openComplaints": 25,
  "assignedComplaints": 0,
  "inProgressComplaints": 1,
  "resolvedComplaints": 1,
  "closedComplaints": 1
}
```

The React Admin Dashboard consumes this reporting service and displays the statistics.

---

# 🗄️ Database

SmartServiceX currently uses PostgreSQL.

Database:

```text
smart_service_db
```

### Java Entities

```text
User
Complaint
```

### .NET Entities

```text
Employee
Assignment
```

Both Java and .NET currently use the same PostgreSQL database for this learning and portfolio project.

> In a production microservice architecture, database ownership would preferably be separated by service.

---

# 🌐 Local Services

During development, services run independently.

| Service          | URL                   |
| ---------------- | --------------------- |
| React Frontend   | http://localhost:5173 |
| Java Spring Boot | http://localhost:8080 |
| ASP.NET Core     | http://localhost:5094 |
| Python FastAPI   | http://localhost:8000 |
| PHP Reporting    | http://localhost:8081 |
| PostgreSQL       | localhost:5432        |

---

# 🧪 API Testing

Postman has been used to test the REST APIs.

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
* Assignment retrieval
* Assignment status updates
* Employee reassignment
* Java → C# integration
* Java → Python integration
* PHP → PostgreSQL reporting
* Error handling
* Request validation

---

# 🛡️ Security Features

SmartServiceX implements:

* JWT authentication
* BCrypt password hashing
* Stateless authentication
* Protected REST endpoints
* Role-based authorization
* Admin-only endpoints
* Input validation
* Global exception handling
* Password exclusion from user response DTOs
* CORS configuration
* Environment-based database credentials

> **Never commit real database passwords, JWT secrets, API keys, or other credentials to GitHub.**

Use environment variables, User Secrets, or another secure secret-management system for sensitive configuration.

---

# 📊 Current Development Status

| Module                           | Status      |
| -------------------------------- | ----------- |
| Java Spring Boot Backend         | ✅ Completed |
| PostgreSQL Database              | ✅ Completed |
| User Registration                | ✅ Completed |
| JWT Login                        | ✅ Completed |
| BCrypt Password Hashing          | ✅ Completed |
| Role-Based Authorization         | ✅ Completed |
| Complaint Management             | ✅ Completed |
| Complaint Status Workflow        | ✅ Tested    |
| Global Exception Handling        | ✅ Completed |
| ASP.NET Core Service             | ✅ Completed |
| Employee Management              | ✅ Completed |
| Employee Availability            | ✅ Completed |
| Assignment Management            | ✅ Completed |
| Assignment Status                | ✅ Completed |
| Automatic Assignment             | ✅ Tested    |
| Java → C# Integration            | ✅ Tested    |
| Java → Python Integration        | ✅ Tested    |
| Python Classification            | ✅ Tested    |
| Priority Detection               | ✅ Tested    |
| Department Mapping               | ✅ Tested    |
| React Frontend                   | ✅ Completed |
| User Dashboard                   | ✅ Completed |
| Employee Dashboard               | ✅ Completed |
| Admin Dashboard                  | ✅ Completed |
| Employee Management Dashboard    | ✅ Completed |
| Assignment/Complaint Status Sync | ✅ Tested    |
| PHP Reporting Service            | ✅ Completed |
| PHP → PostgreSQL Integration     | ✅ Tested    |
| End-to-End Workflow              | ✅ Tested    |
| API Testing                      | ✅ Completed |

---

# 🧪 Verified End-to-End Workflow

A complete complaint workflow has been successfully tested.

Example:

```text
User Registration
       ↓
User Login
       ↓
Create Complaint
       ↓
Python Classification
       ↓
Category + Priority
       ↓
Department Mapping
       ↓
Automatic Employee Assignment
       ↓
Employee Dashboard
       ↓
Start Work
       ↓
Assignment = IN_PROGRESS
Complaint = IN_PROGRESS
       ↓
Complete Assignment
       ↓
Assignment = COMPLETED
Complaint = RESOLVED
       ↓
Admin Dashboard
       ↓
PHP Reporting
       ↓
PostgreSQL Statistics
```

### Example Complaint

```text
Title:
My internet connection is slow

Description:
My WiFi connection is very slow and I am having problems
accessing websites.
```

### Step 1 — Python Classification

```text
Category = Network
Priority = HIGH
```

### Step 2 — Java Department Mapping

```text
Network
   ↓
IT Support
```

### Step 3 — ASP.NET Core Assignment

```text
Department = IT Support
        ↓
Available Employee Found
        ↓
Assignment Created
```

### Step 4 — Employee Starts Work

```text
Assignment = IN_PROGRESS
Complaint  = IN_PROGRESS
```

### Step 5 — Employee Completes Work

```text
Assignment = COMPLETED
Complaint  = RESOLVED
```

### Step 6 — Admin Reporting

```text
Admin Dashboard
      ↓
PHP Reporting Service
      ↓
PostgreSQL
      ↓
Complaint Statistics
```

The complete workflow was successfully verified across all major services.

---

# 🚀 Future Improvements

The core project is currently functional. Possible future improvements include:

* Advanced AI-based priority prediction
* Improved NLP complaint classification
* Service-to-service authentication
* Better inter-service error handling
* Email notifications
* Complaint analytics and charts
* Docker containerization
* Docker Compose
* CI/CD pipeline
* Automated unit and integration testing
* OpenAPI/Swagger documentation
* Production deployment
* Database-per-service architecture
* Advanced reporting
* Audit logging
* Real-time notifications
* Cloud deployment

---

# 🎓 Learning Goals

This project demonstrates practical experience with:

* REST API development
* Microservice-style architecture
* Java Spring Boot
* Spring Security
* JWT authentication
* BCrypt
* ASP.NET Core
* C#
* Python FastAPI
* PHP
* PostgreSQL
* Spring Data JPA
* Hibernate
* Entity Framework Core
* React
* React Router
* Axios
* Tailwind CSS
* Database relationships
* Inter-service communication
* Automatic assignment
* Employee availability management
* Complaint classification
* Complaint priority detection
* Complaint workflow management
* Status synchronization
* Exception handling
* API validation
* Postman API testing
* Git
* GitHub

---

# 👨‍💻 Author

## Omm Prakash Parida

**B.Tech — Computer Science & Engineering**

### Skills Demonstrated

```text
Java • Spring Boot • C# • ASP.NET Core
Python • FastAPI • PHP • PostgreSQL
React • REST APIs • JWT
Git • GitHub • Postman
```

---

# ⭐ Project

**SmartServiceX — Smart Service & Bug Management System**

A multi-service platform demonstrating complaint management, AI-based classification, automatic employee assignment, workflow synchronization, administration, and reporting using multiple backend technologies.

If you find **SmartServiceX** useful or interesting, consider giving the repository a ⭐.
