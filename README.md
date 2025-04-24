# Varad Properties - Real Estate Marketplace

![Varad Properties](https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

## Overview

Varad Properties is a modern real estate marketplace built with Next.js and Node.js. It allows users to browse, search, and filter property listings, save favorites to a wishlist, and contact property agents. Agents can list properties with detailed information and images.

## Features

- **Modern UI/UX**: Responsive design with smooth animations and transitions
- **Property Listings**: Browse through available properties with detailed information
- **Advanced Search & Filters**: Find properties based on location, price range, amenities, etc.
- **User Authentication**: Secure login and registration functionality
- **User Dashboard**: Manage profile, saved properties, and inquiries
- **Agent Portal**: For property owners/agents to list and manage their properties
- **Wishlist System**: Save favorite properties for later viewing
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

### Frontend
- **Next.js**: React framework for server-side rendering and static generation
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for React
- **Axios**: HTTP client for API requests
- **Lucide React**: Icon library

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **Cloudinary**: Cloud-based image management
- **Multer**: Middleware for handling multipart/form-data
- **Nodemailer**: Module for sending emails

## Getting Started

### Prerequisites
- Node.js (v16+)
- Bun or npm/yarn
- MongoDB connection

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/INFINITYASH3699/Property-Selling-Site.git
   cd Property-Selling-Site
   ```

2. Install dependencies for frontend and backend
   ```bash
   # Frontend
   cd frontend
   bun install

   # Backend
   cd ../backend
   bun install
   ```

3. Create environment files:

   **Frontend (.env.local):**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key
   ```

   **Backend (.env):**
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   CLIENT_URL=http://localhost:3000
   ```

4. Run the development servers:

   **Frontend:**
   ```bash
   cd frontend
   bun run dev
   ```

   **Backend:**
   ```bash
   cd backend
   bun run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Application Structure

```
Property-Selling-Site/
│
├── backend/                  # Backend Node.js application
│   ├── config/               # Configuration files
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Custom middleware
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── utils/                # Utility functions
│   └── server.js             # Entry point
│
└── frontend/                 # Next.js frontend application
    ├── public/               # Static assets
    └── src/
        ├── app/              # Next.js app directory and routes
        ├── components/       # React components
        ├── context/          # React context providers
        ├── hooks/            # Custom React hooks
        ├── utils/            # Utility functions
        └── constants/        # Constants and configuration
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `GET /api/properties/my-properties` - Get current user's properties
- `POST /api/properties/:id/images` - Upload images to property
- `DELETE /api/properties/:id/images/:imageId` - Delete property image

### Wishlist
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist/:propertyId` - Add property to wishlist
- `DELETE /api/wishlist/:propertyId` - Remove property from wishlist

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update user details
- `PUT /api/users/me/password` - Update password

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Varad Properties - info@varadproperties.com

Project Link: [https://github.com/INFINITYASH3699/Property-Selling-Site](https://github.com/INFINITYASH3699/Property-Selling-Site)
