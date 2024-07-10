# MediumClone NestJS Backend

This is a backend API implementation of the RealWorld "Medium" clone application using NestJS. It adheres to the [RealWorld API specification](https://realworld-docs.netlify.app/docs/specs/backend-specs/introduction) and serves as a reference for building full-stack applications with NestJS.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing with Postman](#testing-with-postman)
- [Frontend Integration](#frontend-integration)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is part of the RealWorld full-stack example applications, showcasing how to build a production-ready application with NestJS. It includes all necessary features such as authentication, CRUD operations for articles and comments, user profiles, and more.

## Features

- User authentication with JWT
- CRUD operations for articles
- CRUD operations for comments
- User profile management
- Follow/unfollow other users
- Pagination for articles
- Favoriting articles

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone git@github.com:LukaGomzi/mediumclone_nestjs.git
    cd mediumclone_nestjs
    ```

2. **Install Node.js 18+ and NestJS** (if not already installed).

3. **Install Yarn** (if not already installed):

    ```bash
    npm install -g yarn
    ```

4. **Install dependencies:**

    ```bash
    yarn install
    ```

5. **Run database migrations:**

    ```bash
    yarn db:migrate
    ```

6. **(Optional) Seed the database with test data:**

    ```bash
    yarn db:seed
    ```

## Running the Application

To run the application, execute:

```bash
yarn start
```

The API will be available at http://localhost:3000.

## Testing with Postman

A Postman collection is provided for testing the API endpoints. You can find the collection [here](https://github.com/LukaGomzi/mediumclone_nestjs/blob/master/postman/NestJS%20Mediumclone.postman_collection.json).

1. **Import the collection into Postman:**
    - Open Postman.
    - Go to `File > Import`.
    - Select the provided Postman collection file.

2. **Run the requests in the collection to test the endpoints.**

## Frontend Integration

To test the API with a frontend, you can use the Angular implementation of the RealWorld frontend:

1. **Clone the Angular RealWorld example app:**

    ```bash
    git clone https://github.com/gothinkster/angular-realworld-example-app.git
    cd angular-realworld-example-app
    ```

2. **Install Angular CLI** (if not already installed):

    ```bash
    npm install -g @angular/cli
    ```

3. **Install Yarn** (if not already installed):

    ```bash
    npm install -g yarn
    ```

4. **Ensure you are using Node version 20.11.1**:

    ```bash
    nvm install 20.11.1
    nvm use 20.11.1
    ```

5. **Install dependencies:**

    ```bash
    yarn install
    ```

6. **Update API URL in the frontend:**
    - Open `src/app/core/interceptors/api.interceptor.ts`.
    - Change the API URL to `http://localhost:3000`.

7. **Run the frontend application:**

    ```bash
    ng serve
    ```

The frontend will be available at `http://localhost:4200`.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
