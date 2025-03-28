# NestJS Authentication System

A robust authentication system built with NestJS, featuring JWT authentication, Google OAuth, email verification, and password reset functionality.

## Features

- JWT Authentication
- Google OAuth Integration
- Email Verification
- Password Reset
- Rate Limiting
- Request Logging
- Security Headers (Helmet)
- MySQL Database with Sequelize ORM
- Input Validation
- Error Handling
- Winston Logger

## Prerequisites

- Node.js (v14 or later)
- MySQL
- Gmail account (for sending emails)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd auth-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add the following variables:
```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=auth_system

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Email (SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# Rate Limiting
RATE_LIMIT_TTL=60
RATE_LIMIT_LIMIT=10
```

4. Create the database:
```sql
CREATE DATABASE auth_system;
```

## Running the Application

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify-email` - Verify email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/profile` - Get user profile (protected)

## Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Rate Limiting**: Prevent brute force attacks
3. **Helmet**: HTTP security headers
4. **CORS**: Cross-Origin Resource Sharing protection
5. **Input Validation**: Request data validation
6. **Error Handling**: Global exception filter
7. **Request Logging**: Winston logger implementation

## Error Handling

The application includes a global exception filter that handles:
- Validation errors
- Authentication errors
- Database errors
- Rate limiting errors
- Generic HTTP exceptions

## Logging

Logs are stored in the `logs` directory with daily rotation:
- Console logging for development
- File logging for production
- Request/Response logging
- Error logging

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
