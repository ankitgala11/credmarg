# Employee Management System

## Overview
The Employee Management System is a comprehensive application designed for managing employees and vendors within an organization. The system includes an admin panel where only admins can register employees or vendors. Additionally, it integrates with a third-party API for sending emails. The application is built with a focus on security, role-based authentication, and authorization using JWT tokens.

## Features
- **Admin Panel**: Only admins have access to register employees and vendors.
- **Rule-Based Authentication**: Secure authentication for both users and admins using Spring Security.
- **Authorization with JWT Tokens**: Ensuring secure access to different parts of the application.
- **Third-Party Mailing API Integration**: Allows sending emails by simply clicking the button using mailtrap.io.

## Technologies Used
- **Backend**: 
  - Spring Boot
  - Java
  - Hibernate
  - MySQL
  - Mailtrap.io
- **Frontend**:
  - React

## Setup and Installation

### Prerequisites
- Java 8 or higher
- MySQL
- Node.js
- npm

### Backend Setup
1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd employee-management/backend
    ```
3. Configure the MySQL database and mailtrap:
    - Create a database named `employee_management`.
    - Update the `application.properties` file with your MySQL database credentials.
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/employee_management
    spring.datasource.username=<your-username>
    spring.datasource.password=<your-password>

    spring.mail.username=<your-username>
    spring.mail.password=<your-password>
    ```


### Frontend Setup
1. Navigate to the frontend directory:
    ```sh
    cd employee-management/frontend
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Start the React application:
    ```sh
    npm start
    ```

## Acknowledgements
- Spring Boot
- Hibernate
- MySQL
- React
- JWT tken for authorization
- Third-party mailing API provider

---

Feel free to reach out for any further questions or issues. Happy coding!
