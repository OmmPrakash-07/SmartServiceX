# 🚀 SmartServiceX — Smart Service & Bug Management System

SmartServiceX is a **multi-service complaint, employee assignment, and bug management system** designed to manage customer complaints from creation to resolution.

The project demonstrates how multiple technologies can work together in a **microservice-style architecture** using:

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
* Synchronize assignment and complaint statuses
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
                         │ • Assignment Gateway   │
                         └──────────┬───────┬─────┘
                                    │       │
                     ┌──────────────┘       └──────────────┐
                     ▼                                     ▼
          ┌──────────────────────┐             ┌──────────────────────┐
          │    ASP.NET Core      │             │    Python FastAPI    │
          │  Assignment Service  │             │     AI Service       │
          │                      │             │                      │
          │ • Employees          │             │ • Classification     │
          │ • Assignments        │             │ • Priority Detection │
          │ • Auto Assignment    │             │                      │
          │ • Availability       │             │                      │
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
          │       Planned        │
          └──────────────────────┘
```

### Service Communication

The frontend communicates with the **Java Spring Boot backend**.

Java communicates with:

* Python FastAPI for complaint classification
* ASP.NET Core for employee and assignment operations

This avoids direct browser-to-.NET communication and provides a centralized backend gateway.

```text
React
  │
  ▼
Java Spring Boot
  │
  ├──────────────► Python FastAPI
  │                  Classification
  │                  Priority
  │
  └──────────────► ASP.NET Core
                     Employees
                     Assignments
                     Auto Assignment
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
  "description": "My internet connection failed and I cannot access the service."
}
```

The Python service analyzes the complaint and returns:

```text
Category: Network
Priority: HIGH
```

Java maps:

```text
Network → IT Support
```

The ASP.NET Core service then searches for an available employee in the **IT Support** department and automatically creates an assignment.

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
| PHP             | Reporting service planned         |

## Database

| Technology            | Purpose                  |
| --------------------- | ------------------------ |
| PostgreSQL            | Main relational database |
| Spring Data JPA       | Java database access     |
| Hibernate             | Java ORM                 |
| Entity Framework Core | .NET database access     |

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
  "description": "Users cannot login to the application."
}
```

The frontend only requires the complaint title and description.

The Python classification service determines the final:

* Category
* Priority

The submitted category and priority fields are optional for API compatibility and are not used to override the AI classification result.

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

### Current Classification Categories

```text
Payment
Account
Network
Delivery
Technical Support
```

### Current Priority Levels

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

The selected department is then sent to the ASP.NET Core assignment service.

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

### Assignment & Complaint Synchronization

Employee actions automatically synchronize the complaint status.

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

The React frontend currently provides:

* User registration
* User login
* JWT-based session handling
* User dashboard
* Complaint creation
* Complaint listing
* Complaint details
* Assignment information
* Employee Dashboard
* Assignment status management
* Complaint status synchronization
* Logout

### User Dashboard

Users can:

```text
Dashboard
   ├── Create Complaint
   ├── View My Complaints
   └── View Complaint Details
```

### Employee Dashboard

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

### React Frontend

```text
http://localhost:5173
```

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
* CORS configuration

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
| Assignment/Complaint Status Sync | ✅ Tested    |
| PHP Reporting                    | 🚧 Planned  |
| Automated Test Suite             | 🚧 Planned  |
| Docker Containerization          | 🚧 Planned  |
| CI/CD Pipeline                   | 🚧 Planned  |
| Production Deployment            | 🚧 Planned  |

---

# 🧪 Verified End-to-End Example

A complete complaint workflow has been successfully tested.

Example complaint:

```text
Title:
My internet is not working

Description:
My WiFi and internet connection are completely down.
I cannot access any websites.
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

The assignment and complaint statuses were successfully synchronized through the Java backend.

---

# 🚀 Future Improvements

Planned improvements include:

* Admin dashboard
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
* Role-based admin controls
* Advanced reporting and analytics

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
* Complaint workflow management
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

If you find **SmartServiceX** useful or interesting, consider giving the repository a ⭐.

**SmartServiceX — Smart Service & Bug Management System**
