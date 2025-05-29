
# Express JWT Authentication API

A secure, production-ready REST API built with Express and JSON Web Tokens (JWT) for authentication.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
  - [Authentication Endpoints](#authentication-endpoints)
- [Docker Setup](#docker-setup)
  - [Dockerfile](#dockerfile)
  - [Docker Build & Run Script](#docker-build--run-script)
  - [How to Use the docker.sh Script on Linux](#how-to-use-the-dockersh-script-on-linux)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

✅ Secure user authentication using JWT  
✅ User signup and login functionality  
✅ Middleware to protect routes  
✅ Environment variable-based configuration  
✅ Modular, maintainable project structure  
✅ Production-ready with best practices  

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or above)
- [Mysql](https://www.mysql.com/) (or another database if configured)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/express-jwt-auth-api.git
   cd express-jwt-auth-api
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

### Configuration

1. **Create a `.env` file:**

   ```bash
  touch .env
  ```

2. **Configure environment variables in `.env`:**

   ```env
    PORT="port you want to expose"
    JWT_SECRET_KEY="Jwt_secret_access_key"
    DATABASE_HOST="hostname"
    DATABASE_USER="user_name"
    DATABASE_PASSWORD="account_password"
    DATABASE_NAME="database_to_access"
   ```

### Running the Server

#### Development

```bash
    yarn develop
```

#### Production

```bash
    yarn build
    yarn start
```

---

## API Documentation

### Authentication Endpoints

#### **POST** `/api/auth/signup`

- Create a new user.
- **Body Parameters:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

#### **POST** `/api/auth/login`

- Login a user and get a JWT token.
- **Body Parameters:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt_token_here"
  }
  ```

### Protected Routes

- Add the following header to access protected routes:
  ```
  Authorization: Bearer <token>
  ```

---

## Docker Setup

This project comes with a **multi-stage Dockerfile** and a **shell script (`docker.sh`)** to simplify building and running containers.

### Dockerfile

The `Dockerfile` in the repository uses a multi-stage build for better performance and smaller images


### Docker Build & Run Script

A helper script `docker.sh` automates building and running your container

### How to Use the docker.sh Script on Linux

1. **Make the script executable:**

   ```bash
   chmod +x docker.sh
   ```

2. **Run the script with the following arguments:**

   ```bash
   ./docker.sh <image-name> <version> <dockerfile-path> <host-port>
   ```

   - `<image-name>`: The name for your Docker image (e.g., `express-auth-api`).
   - `<version>`: The version tag for the image (e.g., `1.0`).
   - `<dockerfile-path>`: The path to the Dockerfile directory (e.g., `.` if it’s in the current directory).
   - `<host-port>`: The port on your host machine to map to the container’s port `8080` (e.g., `3000`).

3. **Example:**

   ```bash
   ./docker.sh express-auth-api 1.0 . 3000
   ```

   This will:
   - Build the Docker image `express-auth-api:1.0` from the current directory.
   - Run the container, mapping **host port 3000** to **container port 8080**.

4. **Verify the container is running:**

   ```bash
   docker ps -a
   ```

---

## Project Structure

```
.
├── src/            # API route definitions
│   └── auth.js
│   └── index.js
├── Dockerfile
├── .dockerignore
├── config.js
├── .babelrc
├──  docker.sh
├──  yarn.lock
├── .env       # Example environment file
├── .gitignore
├── package.json
├── index.js          # Entry point
└── README.md
```

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add new feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
