# 🚀 SmartServiceX — Smart Service & Bug Management System

SmartServiceX is a **multi-service complaint, employee assignment, and bug management system** designed to manage customer complaints from creation to resolution.

The project demonstrates how different technologies can work together in a real-world software architecture using **Java Spring Boot, ASP.NET Core, PostgreSQL, Python FastAPI, PHP, and React**.

---

## 🎯 Project Objective

The main goal of SmartServiceX is to provide a centralized system where users can:

* Create service complaints
* Track complaint status
* Set complaint priority
* Automatically assign complaints to available employees
* Manage employees and their availability
* Track assignments
* Manage complaint and bug workflows
* Generate reports
* Test APIs and individual services

---

## 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │      React UI        │
                         │      Frontend        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Java Spring Boot   │
                         │     Main Backend     │
                         │                      │
                         │ • Authentication     │
                         │ • Users              │
                         │ • Complaints         │
                         │ • Workflow           │
                         └───────┬───────┬──────┘
                                 │       │
                    ┌────────────┘       └────────────┐
                    ▼                                 ▼
        ┌──────────────────────┐          ┌──────────────────────┐
        │   ASP.NET Core       │          │   Python FastAPI     │
        │ Assignment Service   │          │ Priority Service     │
        │                      │          │                      │
        │ • Employees         │          │ • Priority Scoring   │
        │ • Assignments       │          │ • Classification     │
        │ • Auto Assignment   │          └──────────────────────┘
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │     PostgreSQL       │
        │      Database        │
        └──────────────────────┘

        ┌──────────────────────┐
        │    PHP Reporting     │
        │       Service        │
        └──────────────────────┘
```

---

## 🛠️ Technology Stack

### Backend

| Technology      | Purpose                         |
| --------------- | ------------------------------- |
| Java 21         | Main backend                    |
| Spring Boot     | REST API                        |
| Spring Security | Authentication & authorization  |
| JWT             | Token-based authentication      |
| BCrypt          | Password hashing                |
| ASP.NET Core    | Employee & assignment service   |
| Python FastAPI  | Priority/classification service |
| PHP             | Reporting service               |

### Database

* PostgreSQL
* Entity Framework Core
* Spring Data JPA / Hibernate

### Frontend

* React
* JavaScript / TypeScript
* Axios
* HTML
* CSS

### Testing & Development

* Postman
* JUnit
* Mockito
* xUnit
* pytest
* Git & GitHub

---

## 📁 Project Structure

```text
Smart-Service-Management-System/
│
├── backend-java/
│   ├── src/
│   │   └── main/
│   │       └── java/
│   │           └── com/
│   │               └── smartservice/
│   │                   └── backend/
│   │                       ├── config/
│   │                       ├── controller/
│   │                       ├── dto/
│   │                       ├── entity/
│   │                       ├── exception/
│   │                       ├── repository/
│   │                       ├── security/
│   │                       └── service/
│   └── pom.xml
│
├── dotnet-service/
│   ├── Controllers/
│   ├── Data/
│   ├── DTOs/
│   ├── Models/
│   ├── Services/
│   ├── Program.cs
│   └── appsettings.json
│
├── python-service/
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

### User Registration

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

### Login

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

The API returns a JWT token that can be used for protected endpoints.

```text
Authorization: Bearer <JWT_TOKEN>
```

---

# 📋 Complaint Management

The Java Spring Boot service manages complaints.

### Create Complaint

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

### Complaint Status

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

A resolved complaint can also be reopened:

```text
RESOLVED
   ↓
REOPENED
   ↓
IN_PROGRESS
```

---

# 👨‍💻 Employee & Assignment Service

The ASP.NET Core service manages employees and complaint assignments.

### Employee Operations

```http
POST /api/employees
GET  /api/employees
GET  /api/employees/{id}
PUT  /api/employees/{id}/availability
```

### Assignment Operations

```http
POST /api/assignments
GET  /api/assignments
GET  /api/assignments/{id}
PUT  /api/assignments/{id}/status
POST /api/assignments/auto
```

---

# 🤖 Automatic Assignment

One of the key features of SmartServiceX is automatic employee assignment.

When a complaint is created:

```text
User creates complaint
        ↓
Java Spring Boot
        ↓
Complaint saved
        ↓
Java calls ASP.NET Core
        ↓
Auto Assignment
        ↓
Find available employee
        ↓
Match department
        ↓
Create assignment
        ↓
Employee becomes unavailable
```

Example request between services:

```json
{
  "complaintId": 5,
  "department": "Technical Support"
}
```

The assignment service finds an available employee from the requested department.

---

# 👥 Employee Availability

Employees have an availability status:

```text
Available
    ↓
Complaint Assigned
    ↓
Unavailable
    ↓
Assignment Completed
    ↓
Available
```

Example:

```http
PUT /api/employees/1/availability
```

Request body:

```json
true
```

---

# 🔄 Assignment Workflow

Assignments follow this workflow:

```text
ASSIGNED
    ↓
IN_PROGRESS
    ↓
COMPLETED
    ↓
CLOSED
```

While an employee is working on an assignment:

```text
Employee → Unavailable
```

After completion:

```text
Employee → Available
```

---

# 🗄️ Database

SmartServiceX currently uses PostgreSQL.

Database:

```text
smart_service_db
```

Main Java entities:

```text
User
Complaint
```

Main .NET entities:

```text
Employee
Assignment
```

---

# 🌐 Local Services

During development, services run independently.

### Java Backend

```text
http://localhost:8080
```

### ASP.NET Core Assignment Service

```text
http://localhost:5094
```

### Python Service

```text
http://localhost:<python-port>
```

### Frontend

```text
http://localhost:<frontend-port>
```

---

# 🧪 API Testing

Postman is used to test the REST APIs.

Testing includes:

* User registration
* Login
* JWT authentication
* Complaint creation
* Complaint retrieval
* Complaint status updates
* Employee creation
* Employee availability
* Manual assignment
* Automatic assignment
* Assignment status updates
* Error handling
* Validation

---

# 🛡️ Security Features

* JWT authentication
* BCrypt password hashing
* Stateless authentication
* Protected REST endpoints
* Input validation
* Global exception handling
* Passwords are never returned through user DTOs

> **Never commit real database passwords, JWT secrets, API keys, or other credentials to GitHub.**

Use environment variables for sensitive configuration.

---

# 📌 Current Development Status

| Module                    | Status     |
| ------------------------- | ---------- |
| Java Spring Boot Backend  | ✅          |
| PostgreSQL Database       | ✅          |
| User Registration         | ✅          |
| JWT Login                 | ✅          |
| BCrypt Password Hashing   | ✅          |
| Complaint Management      | ✅          |
| Complaint Status          | ✅          |
| Global Exception Handling | ✅          |
| ASP.NET Core Service      | ✅          |
| Employee Management       | ✅          |
| Employee Availability     | ✅          |
| Assignment Management     | ✅          |
| Assignment Status         | ✅          |
| Auto Assignment           | ✅          |
| Java → C# Integration     | 🔄 Testing |
| Python Priority Service   | 🚧 Planned |
| PHP Reporting             | 🚧 Planned |
| React Frontend            | 🚧 Planned |
| Automated Test Suite      | 🚧 Planned |

---

# 🚀 Future Improvements

* Category → Department mapping
* Better inter-service error handling
* Service-to-service authentication
* Python AI-based priority prediction
* Automatic complaint classification
* React dashboard
* Admin dashboard
* Employee dashboard
* PHP reporting portal
* Email notifications
* Complaint analytics
* Docker containerization
* CI/CD pipeline
* Automated unit and integration testing
* API documentation
* Production deployment

---

# 🎓 Learning Goals

This project is designed to demonstrate practical knowledge of:

* REST API development
* Microservice-style architecture
* Java Spring Boot
* ASP.NET Core
* Python FastAPI
* PostgreSQL
* JWT authentication
* Database relationships
* Inter-service communication
* API testing
* Exception handling
* Git/GitHub
* Software testing
* Full-stack development

---

# 👨‍💻 Author

**Omm Prakash Parida**

B.Tech Computer Science & Engineering

### Skills demonstrated

```text
Java • Spring Boot • C# • ASP.NET Core
Python • FastAPI • PostgreSQL
React • REST APIs • JWT
Git • GitHub • Postman
```

---

## ⭐ Project

If you find this project useful or interesting, consider giving the repository a ⭐.

**SmartServiceX — Smart Service & Bug Management System**
