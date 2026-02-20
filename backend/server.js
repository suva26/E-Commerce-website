const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

// ── Middleware ──
app.use(cors());
app.use(express.json());

// ══════════════════════════════════════════
//  IN-MEMORY DATA (no database needed)
// ══════════════════════════════════════════

let products = [
  { id: 1,  name: "Black Steel Watch",   price: 489, category: "Accessories", rating: 4.9, reviews: 284, badge: "Bestseller", desc: "Strong steel body, clean round dial, leather strap, water resistant.", emoji: "⌚" },
  { id: 2,  name: "Warm Wool Coat",      price: 899, category: "Clothing",    rating: 4.8, reviews: 156, badge: "New",        desc: "Soft wool fabric, long fit, big buttons, warm for cold days.", emoji: "🧥" },
  { id: 3,  name: "Brown Leather Bag",   price: 649, category: "Bags",        rating: 5.0, reviews: 98,  badge: "Limited",    desc: "Real leather, gold zip, inside pocket, comes with cloth cover.", emoji: "👜" },
  { id: 4,  name: "Soft Silk Top",       price: 229, category: "Clothing",    rating: 4.7, reviews: 312, badge: null,         desc: "Light and smooth silk fabric, loose fit, small round buttons.", emoji: "👗" },
  { id: 5,  name: "Dark Sunglasses",     price: 349, category: "Accessories", rating: 4.9, reviews: 441, badge: "Popular",    desc: "Light metal frame, dark lens, blocks UV rays, fits all faces.", emoji: "🕶️" },
  { id: 6,  name: "Stone Room Diffuser", price: 189, category: "Home",        rating: 4.6, reviews: 203, badge: null,         desc: "White stone base, good smell, 6 sticks inside, lasts long.", emoji: "🏺" },
  { id: 7,  name: "Black Cup Set",       price: 119, category: "Home",        rating: 4.8, reviews: 178, badge: "New",        desc: "Set of 4 cups, black clay, hand made, safe to wash in machine.", emoji: "☕" },
  { id: 8,  name: "Gold Band Ring",      price: 799, category: "Accessories", rating: 5.0, reviews: 67,  badge: "Limited",    desc: "Gold color ring, strong metal, fits finger size 5 to 9.", emoji: "💍" },
  { id: 9,  name: "Plain White Shirt",   price: 159, category: "Clothing",    rating: 4.7, reviews: 220, badge: null,         desc: "Cotton shirt, clean white color, good for daily use, easy iron.", emoji: "👔" },
  { id: 10, name: "Canvas Tote Bag",     price: 89,  category: "Bags",        rating: 4.6, reviews: 304, badge: "New",        desc: "Strong cloth bag, big size, zip on top, two side pockets.", emoji: "🎒" },
  { id: 11, name: "Silver Necklace",     price: 299, category: "Accessories", rating: 4.8, reviews: 189, badge: null,         desc: "Silver chain, thin and clean, good for everyday wear.", emoji: "📿" },
  { id: 12, name: "Wooden Clock",        price: 249, category: "Home",        rating: 4.9, reviews: 143, badge: "Popular",    desc: "Light wood body, black hands, round shape, battery power.", emoji: "🕰️" },
  { id: 13, name: "Dark Denim Jacket",   price: 399, category: "Clothing",    rating: 4.8, reviews: 267, badge: null,         desc: "Dark blue denim, strong zip, two front pockets, regular fit.", emoji: "🧣" },
  { id: 14, name: "Small Crossbody Bag", price: 449, category: "Bags",        rating: 4.9, reviews: 132, badge: "Limited",    desc: "Small leather bag, long strap, one main zip, one front zip.", emoji: "👝" },
  { id: 15, name: "Cotton Scarf",        price: 79,  category: "Clothing",    rating: 4.5, reviews: 391, badge: null,         desc: "Soft cotton scarf, long size, can be tied many ways.", emoji: "🧤" },
  { id: 16, name: "Brass Candle Holder", price: 139, category: "Home",        rating: 4.7, reviews: 211, badge: "New",        desc: "Solid brass, round base, holds normal size candles, heavy feel.", emoji: "🕯️" },
];

// In-memory stores
let carts   = {};   // { userId: [ { productId, qty } ] }
let users   = [];   // [ { id, name, email, password } ]
let orders  = [];   // [ { id, userId, items, total, date, status } ]

// ══════════════════════════════════════════
//  PRODUCTS API
// ══════════════════════════════════════════

// GET all products
app.get("/api/products", (req, res) => {
  const { category, search } = req.query;
  let result = [...products];

  if (category && category !== "All") {
    result = result.filter(p => p.category === category);
  }
  if (search) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json({ success: true, count: result.length, products: result });
});

// GET single product by ID
app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: "Product not found" });
  res.json({ success: true, product });
});

// ══════════════════════════════════════════
//  CART API
// ══════════════════════════════════════════

// GET cart for a user
app.get("/api/cart/:userId", (req, res) => {
  const { userId } = req.params;
  const cartItems = carts[userId] || [];

  // Attach product details to each cart item
  const detailed = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  });

  const total = detailed.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  res.json({ success: true, items: detailed, total });
});

// POST add item to cart
app.post("/api/cart", (req, res) => {
  const { userId, productId, qty = 1 } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ success: false, message: "userId and productId are required" });
  }

  const product = products.find(p => p.id === parseInt(productId));
  if (!product) return res.status(404).json({ success: false, message: "Product not found" });

  if (!carts[userId]) carts[userId] = [];

  const existing = carts[userId].find(i => i.productId === parseInt(productId));
  if (existing) {
    existing.qty += qty;
  } else {
    carts[userId].push({ productId: parseInt(productId), qty });
  }

  res.json({ success: true, message: `${product.name} added to cart`, cart: carts[userId] });
});

// DELETE remove item from cart
app.delete("/api/cart/:userId/:productId", (req, res) => {
  const { userId, productId } = req.params;
  if (!carts[userId]) return res.status(404).json({ success: false, message: "Cart not found" });

  carts[userId] = carts[userId].filter(i => i.productId !== parseInt(productId));
  res.json({ success: true, message: "Item removed from cart" });
});

// DELETE clear full cart
app.delete("/api/cart/:userId", (req, res) => {
  const { userId } = req.params;
  carts[userId] = [];
  res.json({ success: true, message: "Cart cleared" });
});

// ══════════════════════════════════════════
//  USER LOGIN / REGISTER API
// ══════════════════════════════════════════

// POST register new user
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Name, email and password are required" });
  }

  const exists = users.find(u => u.email === email);
  if (exists) return res.status(400).json({ success: false, message: "Email already registered" });

  const newUser = { id: uuidv4(), name, email, password };
  users.push(newUser);

  res.json({ success: true, message: "Account created", user: { id: newUser.id, name, email } });
});

// POST login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ success: false, message: "Wrong email or password" });

  res.json({ success: true, message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });
});

// ══════════════════════════════════════════
//  ORDERS API
// ══════════════════════════════════════════

// GET all orders for a user
app.get("/api/orders/:userId", (req, res) => {
  const userOrders = orders.filter(o => o.userId === req.params.userId);
  res.json({ success: true, count: userOrders.length, orders: userOrders });
});

// POST place a new order
app.post("/api/orders", (req, res) => {
  const { userId, items } = req.body;

  if (!userId || !items || items.length === 0) {
    return res.status(400).json({ success: false, message: "userId and items are required" });
  }

  // Calculate total
  let total = 0;
  const detailedItems = items.map(item => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return null;
    total += product.price * item.qty;
    return { productId: item.productId, name: product.name, price: product.price, qty: item.qty };
  }).filter(Boolean);

  const newOrder = {
    id: uuidv4(),
    userId,
    items: detailedItems,
    total,
    date: new Date().toISOString(),
    status: "Confirmed",
  };

  orders.push(newOrder);

  // Clear cart after order
  carts[userId] = [];

  res.json({ success: true, message: "Order placed!", order: newOrder });
});

// ══════════════════════════════════════════
//  ROOT
// ══════════════════════════════════════════
app.get("/", (req, res) => {
  res.json({
    message: "Hebbar's Collection API is running!",
    routes: {
      products : "GET  /api/products",
      product  : "GET  /api/products/:id",
      getCart  : "GET  /api/cart/:userId",
      addCart  : "POST /api/cart",
      delCart  : "DELETE /api/cart/:userId/:productId",
      register : "POST /api/register",
      login    : "POST /api/login",
      orders   : "GET  /api/orders/:userId",
      placeOrder: "POST /api/orders",
    }
  });
});

// ── Start server ──
app.listen(PORT, () => {
  console.log(`\n✦ Hebbar's Collection API running at http://localhost:${PORT}\n`);
});
