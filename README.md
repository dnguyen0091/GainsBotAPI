# GainsBot API

A Node.js Express backend API for the GainsBot application, designed to handle fitness tracking and user management functionalities.

## 🏗️ Project Structure

```
GainsBotAPI/
├── index.js                 # Main server entry point
├── package.json            # Project dependencies and scripts
├── README.md              # Project documentation
├── controllers/           # Request handlers and business logic
│   └── userController.js  # User-related request handling
├── models/               # Database models and schemas
│   └── userModel.js      # User data model definition
├── routes/               # API endpoint definitions
│   └── userRoutes.js     # User-related API routes
└── services/             # Business logic and external integrations
    └── userService.js    # User-related business operations
```

## 📁 Directory Structure & Purpose

### `/controllers`
**Purpose**: Contains controller files that handle HTTP requests and responses.
- Controllers act as the bridge between routes and services
- Handle request validation, error handling, and response formatting
- Keep business logic minimal - delegate to services
- **Current files**:
  - `userController.js` - Handles user-related HTTP requests (registration, login, profile updates, etc.)

### `/models`
**Purpose**: Defines database schemas and data models.
- Contains Mongoose schemas for MongoDB collections
- Defines data structure, validation rules, and relationships
- Provides data access methods and queries
- **Current files**:
  - `userModel.js` - Defines user schema with fields like username, email, password, fitness data, etc.

### `/routes`
**Purpose**: Defines API endpoints and maps them to controllers.
- Organizes endpoints by feature/resource
- Handles route-specific middleware (authentication, validation)
- Maps HTTP methods (GET, POST, PUT, DELETE) to controller functions
- **Current files**:
  - `userRoutes.js` - Defines endpoints like `/api/users/register`, `/api/users/login`, `/api/users/profile`

### `/services`
**Purpose**: Contains business logic and external service integrations.
- Implements core business rules and operations
- Handles complex data processing and calculations
- Manages external API calls and third-party integrations
- Keeps controllers thin by handling heavy lifting
- **Current files**:
  - `userService.js` - User management operations, password hashing, token generation, etc.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GainsBotAPI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/gainsbot
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Environment Variables**: dotenv
- **CORS**: cors middleware for cross-origin requests

## 📋 Current Dependencies

```json
{
  "cors": "^2.8.5",      // Cross-Origin Resource Sharing
  "dotenv": "^17.2.0",   // Environment variable management
  "express": "^5.1.0"    // Web application framework
}
```

## 🔧 Development Setup

### Recommended Development Dependencies
Add these for enhanced development experience:
```bash
npm install --save-dev nodemon jest supertest
```

### Suggested Package.json Scripts
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

## 🗃️ Database Schema Design

### User Model (Planned)
- User authentication and profile management
- Fitness goals and preferences
- Workout history and progress tracking

## 🔐 Security Considerations

- Environment variables for sensitive data
- CORS configuration for frontend integration
- MongoDB connection with proper error handling
- Planned: JWT authentication, password hashing, input validation

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Planned Endpoints

#### User Management
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User authentication
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/profile` - Delete user account

#### Fitness Tracking (Future)
- `POST /api/workouts` - Log workout session
- `GET /api/workouts` - Get workout history
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

## 🔄 Development Workflow

1. **Model First**: Define data schema in `/models`
2. **Service Layer**: Implement business logic in `/services`
3. **Controller Logic**: Handle HTTP requests in `/controllers`
4. **Route Definition**: Map endpoints in `/routes`
5. **Integration**: Connect routes to main server in `index.js`

## 🤝 Contributing

1. Create feature branches from `main`
2. Follow the established directory structure
3. Write unit tests for new functionality
4. Update documentation for new features

## 📝 Notes

- Server runs on port 3000 by default (configurable via environment)
- MongoDB connection configured with modern options
- CORS enabled for frontend integration
- Express.json() middleware for JSON request parsing

## 🚧 Next Steps

1. Implement user authentication system
2. Add input validation middleware
3. Set up comprehensive error handling
4. Create unit and integration tests
5. Add API rate limiting
6. Implement logging system