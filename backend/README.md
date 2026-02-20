# Hebbar's Collection — Node.js Backend

Simple Express.js API — no database needed (uses memory storage).

---

## How to Run Backend

```bash
cd backend
npm install
npm start
```

Runs at → http://localhost:5000

---

## All API Routes

### Products
| Method | Route | What it does |
|--------|-------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products?category=Bags | Filter by category |
| GET | /api/products?search=watch | Search products |
| GET | /api/products/:id | Get one product |

### Cart
| Method | Route | What it does |
|--------|-------|-------------|
| GET | /api/cart/:userId | Get user's cart |
| POST | /api/cart | Add item to cart |
| DELETE | /api/cart/:userId/:productId | Remove item |
| DELETE | /api/cart/:userId | Clear full cart |

### Login / Register
| Method | Route | What it does |
|--------|-------|-------------|
| POST | /api/register | Create account |
| POST | /api/login | Login |

### Orders
| Method | Route | What it does |
|--------|-------|-------------|
| GET | /api/orders/:userId | Get user orders |
| POST | /api/orders | Place new order |

---

## Example API Calls

### Add to cart
```json
POST /api/cart
{
  "userId": "user123",
  "productId": 1,
  "qty": 2
}
```

### Login
```json
POST /api/login
{
  "email": "test@email.com",
  "password": "mypassword"
}
```

### Place order
```json
POST /api/orders
{
  "userId": "user123",
  "items": [
    { "productId": 1, "qty": 1 },
    { "productId": 3, "qty": 2 }
  ]
}
```
