# Grind Gears Backend

A robust e-commerce backend API for managing gears and equipment.
Built with Node.js, Express, and MongoDB for scalable product management.

## Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/manvendras1ngh/grind-gears-backend.git
   ```

2. Navigate to project directory

   ```bash
   cd ecommerce-backend
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Start the server
   ```bash
   npm run dev
   ```

## Environment Setup

Create a `.env` file in the root directory with:

```env
PORT=3000
CORS_ORIGIN=your_frontend_url
MONGODB_URI=your_mongodb_connection_string
```

## Project Architecture

```
├── controllers/     # Business logic handlers
├── models/          # MongoDB schemas
├── routes/          # API route definitions
├── utils/           # Helper functions
├── db/              # Database connection
└── index.js         # Server entry point
```

## API Endpoints

### Gears

- `GET /api/v1/gears` - Get all gears
- `GET /api/v1/gears/:id` - Get gear by ID
- `POST /api/v1/gears` - Seed gear data

### Categories

- `GET /api/v1/categories` - Get all categories
- `GET /api/v1/categories/:id` - Get category by ID
- `GET /api/v1/categories/slug/:slug` - Get products by category slug

### Cart

- `GET /api/v1/cart` - Get cart items
- `POST /api/v1/cart/add` - Add item to cart
- `POST /api/v1/cart/update` - Update cart item quantity
- `DELETE /api/v1/cart/remove` - Remove item from cart
- `DELETE /api/v1/cart/clear` - Clear cart

### Wishlist

- `GET /api/v1/wishlist` - Get wishlist items
- `POST /api/v1/wishlist/add` - Add item to wishlist
- `DELETE /api/v1/wishlist/remove` - Remove item from wishlist

### Address

- `GET /api/v1/address` - Get all addresses
- `POST /api/v1/address` - Add new address
- `POST /api/v1/address/update` - Update address
- `DELETE /api/v1/address` - Remove address

### Orders

- `GET /api/v1/orders` - Get all orders
- `POST /api/v1/orders` - Place new order

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **CORS**: Cross-origin resource sharing enabled
- **Environment**: dotenv for configuration

## Server Features

- RESTful API design
- MongoDB integration with Mongoose
- Error handling middleware
- CORS configuration
- JSON request parsing
- Modular route organization
- Environment-based configuration

## Connect

- **Website**: [manavsingh.in](https://manavsingh.in)
- **LinkedIn**: [manvendras1ngh](https://www.linkedin.com/in/manvendras1ngh/)
- **Email**: [007singhmanvendra@gmail.com](mailto:007singhmanvendra@gmail.com)
