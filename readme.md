# TodoListApp

A minimalistic Todo List application built with Node.js, Express, and MongoDB, implementing input validation for security.

---

## Features

### Implemented
- **User Authentication**
  - User registration and login with hashed passwords using `bcryptjs`.
- **Todo Management**
  - Create, update, delete, and retrieve todos.
  - Validation for todo input, such as task description, status, and due date.
- **Input Validation**
  - Ensures secure and correct inputs using `express-validator`.

---

## Future Enhancements

### Security Improvements
- **Rate Limiting**: Mitigate brute force attacks by limiting the number of requests to the server.
- **Data Sanitization**: Prevent attacks like SQL Injection through proper data sanitation.
- **HTTP Security Headers**: Implement `helmet` middleware to secure HTTP headers.
- **Enhanced Authentication**: Integrate more robust methods such as JSON Web Tokens (JWT) or OAuth2.

### GUI and Usability
- **EJS Implementation**: Improve user interface with dynamic rendering using Embedded JavaScript (EJS) templates.

---

## Installation

### Prerequisites
- Node.js (v16 or later recommended)
- MongoDB (cloud or local instance)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository-link/todolistapp.git
   ```

2. Navigate to the project folder:
   ```bash
   cd todolistapp
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the `.env` file:
   ```plaintext
   PORT=3000
   DB_URI=mongodb+srv://username:password@cluster.mongodb.net/myDatabase
   JWT_SECRET=yourSecretKey
   APP_NAME=TodoListApp
   APP_VERSION=1.0.0
   NODE_ENV=development
   ```

5. Start the server:
   ```bash
   npm start
   ```

### Testing
Send POST, GET, PUT, or DELETE requests using tools like Postman or Rested, or implement GUI functionality in future iterations.

---

## API Endpoints

### Authentication
- `POST /register`: Register a new user.
- `POST /login`: Login with a username/email and password.

### Todos
- `GET /todo`: Fetch all todos.
- `POST /todo`: Create a new todo.
- `PUT /todo`: Update an existing todo.
- `DELETE /todo`: Delete a todo.

---

## Contributing

1. Fork the repository.
2. Create your branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add awesome feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Open a pull request.

---

## License

MIT License.

---

## Acknowledgments
- Thanks to `express-validator` and `mongoose` for making input validation and MongoDB integration seamless.
- Special mention to `bcryptjs` for secure password hashing.

---

Happy coding! 🚀
