# 🚀 QUICK START GUIDE (5 Minutes)

## For The Impatient Developer 😄

### Prerequisites
- ✅ Node.js installed
- ✅ MongoDB running (`mongod` in terminal)
- ✅ `.env` file in backend with `MONGODB_URI` and `JWT_SECRET`

---

## 🔥 Go Live in 5 Steps

### Step 1: Terminal 1 - Start Backend
```bash
cd backend
npm install
npm start
```
**Expected Output:**
```
✓ 🔗 DB connected
✓ 🚀 Server running on port 5000
```

### Step 2: Terminal 2 - Start Frontend
```bash
cd frontend
npm install
npm run dev
```
**Expected Output:**
```
✓ Local: http://localhost:5173
```

### Step 3: Open Browser
```
http://localhost:5173
```

### Step 4: Quick Test Flow
```
1. Register → test@test.com / password
2. Upload Item:
   - Title: Laptop
   - Description: HP Pavilion laptop
   - Category: Electronics
   - City: NYC
   - Duration: 14 days
   - Pick image
3. View Home - See your product
4. Click product - View details
5. Rate it - Add 5-star review
6. Add to Cart - See count update
```

### Step 5: Done! 🎉
Your marketplace is live!

---

## 📋 What Got Updated

**Models:**
- ✅ Product: Added description, owner, city, reviews, duration
- ✅ User: Added profile info + auto-calculated ratings

**Routes:**
- ✅ /upload: Now requires description, city, duration  
- ✅ /products: Returns full owner + reviews data
- ✅ /products/:id: Single product detail endpoint
- ✅ /products/:id/review: NEW review submission endpoint

**Frontend:**
- ✅ UploadItem: Enhanced form with 6 fields
- ✅ ProductCard: Shows owner info + reviews
- ✅ ProductDetail: NEW - Full details + review form
- ✅ ReviewForm: NEW - 5-star picker + comment
- ✅ CartContext: NEW - Cart state management

---

## 🎨 What Users See

### Home Page
```
┌─────────────────────────────────┐
│ Product Card                    │
├─────────────────────────────────┤
│ [Image] Laptop                  │
│ Electronics • NYC               │
│ HP Pavilion laptop...           │
│                                 │
│ 📦 Owner: John Smith            │
│ Bio: Professional lender        │
│ ⭐⭐⭐⭐⭐ (45 reviews)            │
│                                 │
│ ⭐ Product: 4.8 (12 reviews)    │
│ 📅 Max Duration: 14 days        │
│                                 │
│ [Add to Cart Button]            │
└─────────────────────────────────┘
```

### Product Detail Page
```
Left Side:                 Right Side:
[Large Image]             Review Form:
Full Description          ⭐⭐⭐⭐⭐
Owner Box:               Comment...
- Name                   [Submit]
- Bio                    
- Rating                 All Reviews:
- Reviews count          - John: ⭐⭐⭐... "Great!"
[Add to Cart]            - Jane: ⭐⭐⭐⭐⭐ "Perfect!"
```

---

## 🔐 Authentication Flow

### Registration
```
User Input → /api/auth/register → Hash password → Save → Return 200
```

### Login
```
User Input → /api/auth/login → Verify password → Generate JWT → Return token
```

### Protected Routes
```
Request → Check Authorization header → Verify JWT → Extract userId → Proceed
         If no token or invalid → Return 401
```

---

## 💾 Database Structure

### Product Document
```json
{
  "title": "Laptop",
  "description": "HP Pavilion...",
  "category": "Electronics",
  "city": "NYC",
  "owner": "user_id_123",
  "imageUrl": "http://localhost:5000/uploads/...",
  "available": true,
  "maxDuration": 14,
  "reviews": [
    {
      "reviewer": "user_id_456",
      "rating": 5,
      "comment": "Great product!",
      "createdAt": "2026-02-14T..."
    }
  ]
}
```

### User Document
```json
{
  "email": "john@example.com",
  "password": "hashed_password",
  "firstName": "John",
  "profileDescription": "Professional lender",
  "city": "NYC",
  "averageRating": 4.8,    // Auto-calculated
  "totalReviews": 45       // Auto-calculated
}
```

---

## 🌐 API Examples

### Get All Products
```bash
curl http://localhost:5000/api/products?category=Electronics&city=NYC
```

### Get Single Product
```bash
curl http://localhost:5000/api/products/product_id_123
```

### Upload Product (requires token)
```bash
curl -X POST http://localhost:5000/api/products/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=Laptop" \
  -F "description=HP laptop..." \
  -F "category=Electronics" \
  -F "city=NYC" \
  -F "maxDuration=14" \
  -F "image=@image.jpg"
```

### Add Review (requires token)
```bash
curl -X POST http://localhost:5000/api/products/product_id_123/review \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"rating": 5, "comment": "Great!"}'
```

---

## 🐛 If Something Breaks

| Issue | Check |
|-------|-------|
| Can't register | Check MongoDB running |
| Can't upload | Check logged in + all fields filled |
| No image | Check backend /uploads folder + CORS |
| Can't add review | Check logged in + rating selected + comment filled |
| Cart not working | Open DevTools, check localStorage |

---

## 📈 Performance Tips

- Uploads auto-save now with full data
- Reviews instantly appear (no page refresh needed)
- Images lazy-load naturally
- Cart persists using localStorage

---

## 🎓 Learn By Example

**Test Flow:**
```
1. Create user #1 (seller role)
2. Create user #2 (buyer role)
3. User #1: Upload product
4. User #2: View product detail
5. User #2: Add review (as buyer)
6. User #1: Login again, see review + rating updated
7. Both: Add to cart
```

---

## 🚀 Ready to Ship

- ✅ Authentication works
- ✅ Products upload with full details
- ✅ Reviews system works
- ✅ Cart works
- ✅ Images load
- ✅ Owner ratings auto-calculated

**Deploy whenever you want!**

---

## 📱 Key Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+R` | Hard refresh (clear cache) |
| `F12` | Open DevTools |
| `Ctrl+K` | Open search/command |

---

## 🎯 Common Test Scenarios

### Scenario 1: Happy Path
```
Register → Upload → View → Review → Cart ✅
```

### Scenario 2: No Login
```
Try upload → "Please login" ✅
Try review → "Please login" ✅
```

### Scenario 3: Invalid Review
```
Try submit → No rating → "Please select rating" ✅
Try submit → No comment → "Please enter comment" ✅
```

### Scenario 4: Multiple Users
```
User A: Upload
User B: Review
Check User A's rating updated ✅
```

---

## 📞 Emergency Contacts

### If Backend Won't Start
```bash
# Check port in use
lsof -i :5000

# Kill process using port 5000
kill -9 <PID>

# Check MongoDB
mongosh # Should connect without error
```

### If Frontend Won't Start
```bash
# Clear cache
rm -rf node_modules
npm install
npm run dev
```

### If Database Issues
```bash
# Backup
mongodump --db your_db

# Check connection
mongosh "mongodb://localhost:27017/your_db"
```

---

## ⭐ Features in This Update

✅ Product descriptions  
✅ Owner profiles  
✅ 5-star review system  
✅ Auto-calculated ratings  
✅ Rental duration settings  
✅ City-based filtering  
✅ Rich product cards  
✅ Full product detail page  
✅ Image management  
✅ Enhanced cart  

---

## 🎊 You Made It!

Your rental marketplace is ready to use!

**Next Steps:**
1. Invite users to test
2. Gather feedback
3. Add more features
4. Deploy to production

---

## 📚 Full Docs

For detailed info, see:
- `SCHEMA_UPDATE_GUIDE.md` - Complete guide
- `TESTING_CHECKLIST.md` - Full test scenarios  
- `ARCHITECTURE_OVERVIEW.md` - System design
- `IMPORTANT_REMINDERS.md` - Critical info

---

**Good luck! 🚀**

Happy coding! 💻
