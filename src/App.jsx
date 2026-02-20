import { useState, useEffect } from "react";

const products = [
  { id: 1,  name: "Black Steel Watch",    price: 489,  category: "Accessories", rating: 4.9, reviews: 284, badge: "Bestseller", desc: "Strong steel body, clean round dial, leather strap, water resistant.", colors: ["#1a1a1a", "#c9a84c", "#4a4a6a"], emoji: "⌚" },
  { id: 2,  name: "Warm Wool Coat",       price: 899,  category: "Clothing",    rating: 4.8, reviews: 156, badge: "New",        desc: "Soft wool fabric, long fit, big buttons, warm for cold days.", colors: ["#2c2c2c", "#8b6e6e", "#e8e0d5"], emoji: "🧥" },
  { id: 3,  name: "Brown Leather Bag",    price: 649,  category: "Bags",        rating: 5.0, reviews: 98,  badge: "Limited",    desc: "Real leather, gold zip, inside pocket, comes with cloth cover.", colors: ["#1a1a1a", "#6b4226", "#c9a84c"], emoji: "👜" },
  { id: 4,  name: "Soft Silk Top",        price: 229,  category: "Clothing",    rating: 4.7, reviews: 312, badge: null,         desc: "Light and smooth silk fabric, loose fit, small round buttons.", colors: ["#f5e6d3", "#c8b8d8", "#a8c8b8"], emoji: "👗" },
  { id: 5,  name: "Dark Sunglasses",      price: 349,  category: "Accessories", rating: 4.9, reviews: 441, badge: "Popular",    desc: "Light metal frame, dark lens, blocks UV rays, fits all faces.", colors: ["#1a1a1a", "#c9a84c", "#4a4a4a"], emoji: "🕶️" },
  { id: 6,  name: "Stone Room Diffuser",  price: 189,  category: "Home",        rating: 4.6, reviews: 203, badge: null,         desc: "White stone base, good smell, 6 sticks inside, lasts long.", colors: ["#e8e0d5", "#c9a84c", "#8b8b8b"], emoji: "🏺" },
  { id: 7,  name: "Black Cup Set",        price: 119,  category: "Home",        rating: 4.8, reviews: 178, badge: "New",        desc: "Set of 4 cups, black clay, hand made, safe to wash in machine.", colors: ["#1a1a1a", "#8b8b8b", "#e8e0d5"], emoji: "☕" },
  { id: 8,  name: "Gold Band Ring",       price: 799,  category: "Accessories", rating: 5.0, reviews: 67,  badge: "Limited",    desc: "Gold color ring, strong metal, fits finger size 5 to 9.", colors: ["#c9a84c", "#1a1a1a", "#8b8b8b"], emoji: "💍" },
  { id: 9,  name: "Plain White Shirt",    price: 159,  category: "Clothing",    rating: 4.7, reviews: 220, badge: null,         desc: "Cotton shirt, clean white color, good for daily use, easy iron.", colors: ["#ffffff", "#e8e0d5", "#d0c8b0"], emoji: "👔" },
  { id: 10, name: "Canvas Tote Bag",      price: 89,   category: "Bags",        rating: 4.6, reviews: 304, badge: "New",        desc: "Strong cloth bag, big size, zip on top, two side pockets.", colors: ["#e8e0d5", "#1a1a1a", "#6b4226"], emoji: "🎒" },
  { id: 11, name: "Silver Necklace",      price: 299,  category: "Accessories", rating: 4.8, reviews: 189, badge: null,         desc: "Silver chain, thin and clean, good for everyday wear.", colors: ["#c0c0c0", "#c9a84c", "#1a1a1a"], emoji: "📿" },
  { id: 12, name: "Wooden Clock",         price: 249,  category: "Home",        rating: 4.9, reviews: 143, badge: "Popular",    desc: "Light wood body, black hands, round shape, battery power.", colors: ["#8b6e4a", "#1a1a1a", "#e8e0d5"], emoji: "🕰️" },
  { id: 13, name: "Dark Denim Jacket",    price: 399,  category: "Clothing",    rating: 4.8, reviews: 267, badge: null,         desc: "Dark blue denim, strong zip, two front pockets, regular fit.", colors: ["#2a3a5a", "#1a1a1a", "#4a5a7a"], emoji: "🧣" },
  { id: 14, name: "Small Crossbody Bag",  price: 449,  category: "Bags",        rating: 4.9, reviews: 132, badge: "Limited",    desc: "Small leather bag, long strap, one main zip, one front zip.", colors: ["#1a1a1a", "#8b6e6e", "#c9a84c"], emoji: "👝" },
  { id: 15, name: "Cotton Scarf",         price: 79,   category: "Clothing",    rating: 4.5, reviews: 391, badge: null,         desc: "Soft cotton scarf, long size, can be tied many ways.", colors: ["#e8e0d5", "#8b6e6e", "#2c2c2c"], emoji: "🧤" },
  { id: 16, name: "Brass Candle Holder",  price: 139,  category: "Home",        rating: 4.7, reviews: 211, badge: "New",        desc: "Solid brass, round base, holds normal size candles, heavy feel.", colors: ["#c9a84c", "#8b8b8b", "#1a1a1a"], emoji: "🕯️" },
];

const categories = ["All", "Clothing", "Accessories", "Bags", "Home"];

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState({});

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showNotification(`${product.name} added to cart`);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filtered = products.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="font-serif bg-dark text-cream min-h-screen">

      {/* Notification */}
      {notification && (
        <div className="notification">✦ {notification}</div>
      )}

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-30 border-b border-white/5 bg-dark/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-10 h-[70px] flex items-center justify-between">

          {/* Left links */}
          <div className="flex gap-10">
            <span className="nav-link">Collections</span>
            <span className="nav-link">About</span>
            <span className="nav-link">Contact</span>
          </div>

          {/* Brand */}
          <div className="text-center">
            <div className="text-xl font-light tracking-[0.4em] text-cream">HEBBAR'S</div>
            <div className="font-sans text-gold text-[8px] tracking-[0.5em] -mt-0.5">COLLECTION</div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="bg-transparent border-none text-cream/70 cursor-pointer text-lg transition-colors duration-300 hover:text-gold"
            >
              ⌕
            </button>
            <span
              className="font-sans text-xs tracking-widest text-cream/70 cursor-pointer hover:text-gold transition-colors duration-300"
              onClick={() => showNotification(`${wishlist.length} items in wishlist`)}
            >
              ♡ {wishlist.length}
            </span>
            <button className="btn-primary" onClick={() => setCartOpen(true)}>
              Bag {cartCount > 0 && `(${cartCount})`}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-dark-300 px-10 py-4 bg-dark">
            <input
              autoFocus
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent border-none border-b border-cream/30 text-cream font-sans text-xs tracking-widest outline-none pb-2 placeholder-cream/40 focus:border-b focus:border-gold"
            />
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        className="h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d0d0d 0%, #1a1209 50%, #0d0d0d 100%)" }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)" }}
        />
        {/* Vertical lines */}
        <div className="absolute top-1/4 left-[10%] w-px h-3/5"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)" }} />
        <div className="absolute top-1/4 right-[10%] w-px h-3/5"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)" }} />

        {/* Hero text */}
        <div
          className={`text-center relative z-10 transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-[clamp(52px,9vw,110px)] font-light leading-none tracking-wide text-cream italic">
            Shop<br />
            <span className="not-italic text-gold">Good Things</span>
          </h1>
          <div className="flex gap-4 justify-center mt-12">
            <button
              className="btn-primary"
              onClick={() => document.getElementById("shop").scrollIntoView({ behavior: "smooth" })}
            >
              See Products
            </button>
            <button className="btn-outline">About Us</button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="font-sans text-[9px] tracking-[0.3em]">SCROLL</span>
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, #c9a84c, transparent)" }} />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-gold py-3 overflow-hidden">
        <div className="flex">
          <div className="marquee-track font-sans text-[9px] tracking-[0.3em] text-dark font-semibold">
            {[
              "FREE SHIPPING", "GIFT WRAPPING", "30-DAY RETURNS", "REAL PRODUCTS",
              "FAST DELIVERY", "SAFE PAYMENT", "FREE SHIPPING", "GIFT WRAPPING",
              "30-DAY RETURNS", "REAL PRODUCTS", "FAST DELIVERY", "SAFE PAYMENT",
            ].map((t, i) => (
              <span key={i} className="mr-16">✦ {t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── SHOP SECTION ── */}
      <section id="shop" className="max-w-7xl mx-auto px-10 py-24">

        {/* Section header */}
        <div className="flex justify-between items-end mb-16 flex-wrap gap-6">
          <div>
            <div className="font-sans text-gold text-[9px] tracking-[0.4em] uppercase mb-3">OUR PRODUCTS</div>
            <h2 className="gold-line text-4xl font-light tracking-wide">All Items</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                className={`category-pill ${activeCategory === c ? "active" : ""}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px">
          {filtered.map(product => (
            <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>

              {/* Image */}
              <div className="img-area">
                <span className="text-5xl">{product.emoji}</span>

                {/* Badge */}
                {product.badge && (
                  <div
                    className={`badge absolute top-4 left-4 ${product.badge === "Limited" ? "bg-gold text-dark" : "border border-gold text-gold"}`}
                  >
                    {product.badge}
                  </div>
                )}

                {/* Wishlist */}
                <button
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center border border-white/10 bg-dark/80 cursor-pointer text-sm transition-all duration-300 hover:border-gold hover:text-gold"
                  style={{ color: wishlist.includes(product.id) ? "#c9a84c" : "rgba(232,224,213,0.5)" }}
                  onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }}
                >
                  {wishlist.includes(product.id) ? "♥" : "♡"}
                </button>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="font-sans text-[9px] tracking-[0.3em] text-cream/40 uppercase mb-2">{product.category}</div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-normal tracking-wide leading-tight">{product.name}</h3>
                  <span className="text-gold text-lg font-light ml-4 whitespace-nowrap">${product.price}</span>
                </div>
                <p className="font-sans text-xs leading-relaxed text-cream/50 mb-4">{product.desc}</p>

                {/* Colors & Rating */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1.5">
                    {product.colors.map((c, ci) => (
                      <div
                        key={ci}
                        className={`color-swatch ${(selectedColor[product.id] || 0) === ci ? "active" : ""}`}
                        style={{ backgroundColor: c }}
                        onClick={e => { e.stopPropagation(); setSelectedColor(prev => ({ ...prev, [product.id]: ci })); }}
                      />
                    ))}
                  </div>
                  <div className="font-sans text-[10px] text-cream/40">
                    <span className="text-gold">★</span> {product.rating} ({product.reviews})
                  </div>
                </div>

                <button
                  className="btn-primary w-full"
                  onClick={e => { e.stopPropagation(); addToCart(product); }}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="border-t border-b border-dark-300 bg-dark-100">
        <div className="max-w-7xl mx-auto px-10 py-20 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-dark-300">
          {[
            { icon: "✦", title: "Good Quality",   desc: "Every item is checked by hand before we send it. We only sell things we trust." },
            { icon: "◈", title: "Real Materials",  desc: "We use good cloth, leather, and metal. Nothing cheap, nothing fake." },
            { icon: "◇", title: "Long Lasting",    desc: "Our items are made to last many years. If something breaks, we will fix it." },
          ].map((f, i) => (
            <div key={i} className="text-center px-10 py-12">
              <div className="text-gold text-2xl mb-5">{f.icon}</div>
              <h3 className="text-xl font-normal mb-3">{f.title}</h3>
              <p className="font-sans text-xs leading-relaxed text-cream/50">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="max-w-xl mx-auto px-10 py-28 text-center">
        <div className="font-sans text-gold text-[9px] tracking-[0.5em] uppercase mb-4">STAY IN TOUCH</div>
        <h2 className="text-4xl font-light italic mb-4">Get New Updates</h2>
        <p className="font-sans text-xs leading-relaxed text-cream/50 mb-10">
          We will send you news about new items, sales, and special offers. No spam.
        </p>
        <div className="flex border-b border-gold/40">
          <input
            placeholder="Your email address"
            className="flex-1 bg-transparent border-none text-cream font-sans text-xs tracking-widest outline-none py-2 placeholder-cream/40"
          />
          <button className="btn-primary whitespace-nowrap">Subscribe</button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-dark-300">
        <div className="max-w-7xl mx-auto px-10 pt-16 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            <div>
              <div className="text-2xl font-light tracking-[0.4em] mb-2">HEBBAR'S</div>
              <div className="font-sans text-gold text-[8px] tracking-[0.5em] mb-5">COLLECTION</div>
              <p className="font-sans text-xs leading-relaxed text-cream/40 max-w-[240px]">
                Good clothes, bags, and home items. Made well. Sold fair. We care about what you buy.
              </p>
            </div>
            {[
              { title: "Shop",    links: ["New Arrivals", "Clothing", "Accessories", "Bags", "Home"] },
              { title: "Help",    links: ["Shipping Info", "Returns", "Size Guide", "Contact Us", "FAQ"] },
              { title: "Company", links: ["About Us", "Our Team", "Blog", "Careers", "Stores"] },
            ].map((col, i) => (
              <div key={i}>
                <div className="font-sans text-xs tracking-[0.3em] text-cream/50 uppercase mb-5">{col.title}</div>
                {col.links.map((l, li) => (
                  <div key={li} className="font-sans text-xs text-cream/60 mb-3 cursor-pointer tracking-wide hover:text-gold transition-colors duration-200">{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div className="border-t border-dark-300 pt-8 flex justify-between items-center flex-wrap gap-4">
            <span className="font-sans text-[10px] tracking-wide text-cream/30">© 2025 Hebbar's Collection. All rights reserved.</span>
            <div className="flex gap-6">
              {["Instagram", "Pinterest", "Newsletter"].map(s => (
                <span key={s} className="font-sans text-[10px] tracking-widest text-cream/40 cursor-pointer hover:text-gold transition-colors duration-200">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── CART PANEL ── */}
      {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)} />}
      <div className={`cart-panel ${cartOpen ? "open" : ""}`}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-normal">Your Bag</h3>
              <div className="font-sans text-[10px] tracking-widest text-cream/40 mt-1">{cartCount} {cartCount === 1 ? "ITEM" : "ITEMS"}</div>
            </div>
            <button onClick={() => setCartOpen(false)} className="bg-transparent border-none text-cream/50 text-xl cursor-pointer hover:text-gold transition-colors duration-200">✕</button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-16 text-cream/30">
              <div className="text-4xl mb-4">◇</div>
              <p className="font-sans text-xs tracking-[0.2em]">YOUR BAG IS EMPTY</p>
            </div>
          ) : (
            <>
              <div>
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 py-5 border-b border-dark-300">
                    <div className="w-20 h-20 bg-dark-200 flex items-center justify-center text-3xl flex-shrink-0">{item.emoji}</div>
                    <div className="flex-1">
                      <div className="text-base font-normal mb-1">{item.name}</div>
                      <div className="font-sans text-[10px] tracking-wide text-cream/40 mb-2">Qty: {item.qty}</div>
                      <div className="text-gold text-sm">${(item.price * item.qty).toLocaleString()}</div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="bg-transparent border-none text-cream/30 cursor-pointer self-start text-xs hover:text-gold transition-colors duration-200">✕</button>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-dark-300">
                <div className="flex justify-between mb-2">
                  <span className="font-sans text-xs tracking-wide text-cream/50">SUBTOTAL</span>
                  <span className="text-gold text-lg">${cartTotal.toLocaleString()}</span>
                </div>
                <p className="font-sans text-[10px] text-cream/30 mb-6 tracking-wide">Free shipping · Complimentary gift wrap</p>
                <button className="btn-primary w-full py-4">Proceed to Checkout</button>
                <button className="btn-outline w-full mt-2 py-3" onClick={() => setCartOpen(false)}>Continue Shopping</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── PRODUCT MODAL ── */}
      {selectedProduct && (
        <>
          <div className="overlay" onClick={() => setSelectedProduct(null)} />
          <div className="modal-overlay">
            <div className="modal-box">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 z-10 bg-transparent border-none text-cream/50 text-lg cursor-pointer hover:text-gold transition-colors duration-200"
              >✕</button>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="img-area" style={{ height: 460, fontSize: "5rem" }}>
                  {selectedProduct.emoji}
                </div>
                <div className="p-10">
                  {selectedProduct.badge && (
                    <div className="badge inline-block border border-gold text-gold mb-4">{selectedProduct.badge}</div>
                  )}
                  <div className="font-sans text-[9px] tracking-[0.3em] text-cream/40 uppercase mb-3">{selectedProduct.category}</div>
                  <h2 className="text-2xl font-normal tracking-wide mb-2">{selectedProduct.name}</h2>
                  <div className="text-gold text-2xl font-light mb-6">${selectedProduct.price.toLocaleString()}</div>
                  <p className="font-sans text-xs leading-relaxed text-cream/60 mb-8">{selectedProduct.desc}</p>

                  {/* Color picker */}
                  <div className="mb-8">
                    <div className="font-sans text-[9px] tracking-[0.3em] text-cream/40 uppercase mb-3">SELECT COLOUR</div>
                    <div className="flex gap-2.5">
                      {selectedProduct.colors.map((c, ci) => (
                        <div
                          key={ci}
                          className={`color-swatch w-5 h-5 ${(selectedColor[selectedProduct.id] || 0) === ci ? "active" : ""}`}
                          style={{ backgroundColor: c }}
                          onClick={() => setSelectedColor(prev => ({ ...prev, [selectedProduct.id]: ci }))}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-8">
                    <span className="text-gold text-sm">{"★".repeat(Math.floor(selectedProduct.rating))}</span>
                    <span className="font-sans text-xs text-cream/50">{selectedProduct.rating} · {selectedProduct.reviews} reviews</span>
                  </div>

                  <button
                    className="btn-primary w-full py-4"
                    onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                  >
                    Add to Bag — ${selectedProduct.price.toLocaleString()}
                  </button>
                  <button
                    className="btn-outline w-full mt-2 py-3"
                    onClick={() => {
                      toggleWishlist(selectedProduct.id);
                      showNotification(wishlist.includes(selectedProduct.id) ? "Removed from wishlist" : "Added to wishlist");
                    }}
                  >
                    {wishlist.includes(selectedProduct.id) ? "♥ Saved to Wishlist" : "♡ Add to Wishlist"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
